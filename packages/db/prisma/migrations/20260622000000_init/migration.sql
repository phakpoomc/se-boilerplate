CREATE TABLE "showcase_items" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "completed" BOOLEAN NOT NULL DEFAULT false,
  "attachment_stored_name" TEXT,
  "attachment_original_name" TEXT,
  "attachment_mime_type" TEXT,
  "attachment_size_bytes" INTEGER,
  "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" DATETIME NOT NULL
);
