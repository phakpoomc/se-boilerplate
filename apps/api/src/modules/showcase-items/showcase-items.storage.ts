import { randomUUID } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileTypeFromBuffer } from "file-type";
import { uploadDirectory } from "../../common/config/env";
import { ApiError } from "../../common/http/api-error";
import type { StoredAttachment } from "./showcase-items.repository";

const allowedTypes = new Map([
  ["image/png", "png"],
  ["image/jpeg", "jpg"],
  ["image/webp", "webp"],
  ["application/pdf", "pdf"]
]);

function decodeMultipartFilename(filename: string) {
  if ([...filename].some((character) => character.codePointAt(0)! > 255)) {
    return filename;
  }

  try {
    const bytes = Buffer.from(filename, "latin1");
    const decoded = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    return Buffer.from(decoded, "utf8").equals(bytes) ? decoded : filename;
  } catch {
    return filename;
  }
}

function displayFilename(filename: string) {
  const decoded = decodeMultipartFilename(filename).normalize("NFC");
  const basename = path.posix.basename(decoded.replaceAll("\\", "/"));
  const safeName = basename.replace(/[\u0000-\u001f\u007f]/g, "").trim();
  return [...(safeName || "attachment")].slice(0, 255).join("");
}

export async function saveAttachment(file: Express.Multer.File): Promise<StoredAttachment> {
  const detected = await fileTypeFromBuffer(file.buffer);
  const extension = detected ? allowedTypes.get(detected.mime) : undefined;

  if (!detected || !extension) {
    throw new ApiError(415, "Only PNG, JPEG, WebP, and PDF attachments are allowed.");
  }

  const storedName = `${randomUUID()}.${extension}`;
  await mkdir(uploadDirectory, { recursive: true });
  await writeFile(path.join(uploadDirectory, storedName), file.buffer, { flag: "wx" });

  return {
    storedName,
    originalName: displayFilename(file.originalname),
    mimeType: detected.mime,
    sizeBytes: file.size
  };
}

export async function removeAttachment(storedName: string | null) {
  if (!storedName || path.basename(storedName) !== storedName) {
    return;
  }

  try {
    await unlink(path.join(uploadDirectory, storedName));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      throw error;
    }
  }
}
