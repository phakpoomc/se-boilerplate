import "dotenv/config";
import path from "node:path";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(4100),
  CLIENT_URL: z.url().default("http://localhost:5173"),
  DATABASE_URL: z.string().default("file:./dev.db"),
  MAX_UPLOAD_BYTES: z.coerce.number().int().positive().default(5 * 1024 * 1024)
});

export const env = envSchema.parse(process.env);

export const publicDirectory = path.resolve(__dirname, "../../../public");
export const uploadDirectory = path.join(publicDirectory, "uploads");
