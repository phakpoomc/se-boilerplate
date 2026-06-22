import assert from "node:assert/strict";
import { readFile, unlink } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { prisma } from "@starter/db";
import request from "supertest";
import { createApp } from "./app";
import { uploadDirectory } from "./common/config/env";

const png = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Wl2nWQAAAAASUVORK5CYII=",
  "base64"
);

test("showcase CRUD, attachment replacement, and item deletion cleanup", async () => {
  const app = await createApp();

  const created = await request(app)
    .post("/api/showcase-items")
    .send({ title: "API test item", description: "Created by the test." })
    .expect(201);

  const id = created.body.data.id as string;

  try {
    await request(app)
      .patch(`/api/showcase-items/${id}`)
      .send({ completed: true })
      .expect(200)
      .expect((response) => assert.equal(response.body.data.completed, true));

    const firstUpload = await request(app)
      .post(`/api/showcase-items/${id}/attachment`)
      .attach("attachment", png, { filename: "pixel.png", contentType: "image/png" })
      .expect(200);

    const firstStoredName = path.basename(firstUpload.body.data.attachment.url);
    assert.equal((await readFile(path.join(uploadDirectory, firstStoredName))).length, png.length);

    const replacementUpload = await request(app)
      .post(`/api/showcase-items/${id}/attachment`)
      .attach("attachment", png, { filename: "replacement.png", contentType: "image/png" })
      .expect(200);

    const replacementStoredName = path.basename(replacementUpload.body.data.attachment.url);
    assert.notEqual(replacementStoredName, firstStoredName);
    await assert.rejects(readFile(path.join(uploadDirectory, firstStoredName)));
    assert.equal((await readFile(path.join(uploadDirectory, replacementStoredName))).length, png.length);

    await request(app).delete(`/api/showcase-items/${id}`).expect(200);
    await assert.rejects(readFile(path.join(uploadDirectory, replacementStoredName)));
    assert.equal(await prisma.showcaseItem.findUnique({ where: { id } }), null);
  } finally {
    await prisma.showcaseItem.deleteMany({ where: { id } });
  }
});

test("removes an attachment without deleting its item", async () => {
  const app = await createApp();
  const created = await request(app).post("/api/showcase-items").send({ title: "Remove attachment" }).expect(201);
  const id = created.body.data.id as string;

  try {
    const uploaded = await request(app)
      .post(`/api/showcase-items/${id}/attachment`)
      .attach("attachment", png, { filename: "pixel.png", contentType: "image/png" })
      .expect(200);
    const storedName = path.basename(uploaded.body.data.attachment.url);

    await request(app)
      .delete(`/api/showcase-items/${id}/attachment`)
      .expect(200)
      .expect((response) => assert.equal(response.body.data.attachment, null));

    await assert.rejects(readFile(path.join(uploadDirectory, storedName)));
    assert.ok(await prisma.showcaseItem.findUnique({ where: { id } }));
  } finally {
    await prisma.showcaseItem.deleteMany({ where: { id } });
  }
});

test("preserves Thai characters in attachment display names", async () => {
  const app = await createApp();
  const created = await request(app).post("/api/showcase-items").send({ title: "Thai filename" }).expect(201);
  const id = created.body.data.id as string;
  const filename = "เอกสารภาษาไทย.png";
  let storedName: string | undefined;

  try {
    const uploaded = await request(app)
      .post(`/api/showcase-items/${id}/attachment`)
      .attach("attachment", png, { filename, contentType: "image/png" })
      .expect(200);

    storedName = path.basename(uploaded.body.data.attachment.url);
    assert.equal(uploaded.body.data.attachment.originalName, filename);

    const persisted = await prisma.showcaseItem.findUniqueOrThrow({ where: { id } });
    assert.equal(persisted.attachmentOriginalName, filename);
  } finally {
    await prisma.showcaseItem.deleteMany({ where: { id } });
    if (storedName) {
      await unlink(path.join(uploadDirectory, storedName)).catch(() => undefined);
    }
  }
});

test("rejects spoofed and oversized attachments and handles missing records", async () => {
  const app = await createApp();
  const created = await request(app).post("/api/showcase-items").send({ title: "Upload validation" }).expect(201);
  const id = created.body.data.id as string;

  try {
    await request(app)
      .post(`/api/showcase-items/${id}/attachment`)
      .attach("attachment", Buffer.from("not an image"), { filename: "fake.png", contentType: "image/png" })
      .expect(415);

    await request(app)
      .post(`/api/showcase-items/${id}/attachment`)
      .attach("attachment", Buffer.alloc(5 * 1024 * 1024 + 1), { filename: "large.pdf", contentType: "application/pdf" })
      .expect(413);

    await request(app)
      .patch("/api/showcase-items/00000000-0000-4000-8000-000000000000")
      .send({ title: "Missing" })
      .expect(404);
  } finally {
    await prisma.showcaseItem.deleteMany({ where: { id } });
  }
});
