import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const envPath = resolve(root, "apps/api/.env");

function parseEnv(contents) {
  const values = {};
  for (const line of contents.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const separator = trimmed.indexOf("=");
    if (separator === -1) continue;
    const key = trimmed.slice(0, separator).trim();
    let value = trimmed.slice(separator + 1).trim();
    if ((value.startsWith("\"") && value.endsWith("\"")) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    values[key] = value;
  }
  return values;
}

const [command, ...args] = process.argv.slice(2);
if (!command) {
  throw new Error("Expected a command to run.");
}

let fileEnv = {};
try {
  fileEnv = parseEnv(readFileSync(envPath, "utf8"));
} catch (error) {
  if (error?.code !== "ENOENT") throw error;
}

function localTempEnv() {
  if (process.platform !== "linux") return {};
  const updates = {};
  for (const key of ["TMPDIR", "TMP", "TEMP"]) {
    if (process.env[key]?.startsWith("/mnt/")) updates[key] = "/tmp";
  }
  if (!process.env.TMPDIR) updates.TMPDIR = "/tmp";
  return updates;
}

const child = spawn(command, args, {
  env: { ...fileEnv, ...process.env, ...localTempEnv() },
  stdio: "inherit",
  shell: process.platform === "win32"
});

child.on("exit", (code) => process.exit(code ?? 1));
