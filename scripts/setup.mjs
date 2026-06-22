import { access, copyFile, mkdir, open } from "node:fs/promises";
import { constants } from "node:fs";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const envExample = path.join(root, "apps/api/.env.example");
const envFile = path.join(root, "apps/api/.env");
const webEnvExample = path.join(root, "apps/web/.env.example");
const webEnvFile = path.join(root, "apps/web/.env");
const uploads = path.join(root, "apps/api/public/uploads");
const databaseFile = path.join(root, "packages/db/prisma/dev.db");

async function exists(filePath) {
  try {
    await access(filePath, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function run(command, args) {
  await new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: root,
      stdio: "inherit",
      shell: process.platform === "win32"
    });
    child.on("error", reject);
    child.on("exit", (code) => code === 0 ? resolve() : reject(new Error(`${command} exited with code ${code}`)));
  });
}

if (!(await exists(envFile))) {
  await copyFile(envExample, envFile);
  console.log("Created apps/api/.env");
}

if (!(await exists(webEnvFile))) {
  await copyFile(webEnvExample, webEnvFile);
  console.log("Created apps/web/.env");
}

await mkdir(uploads, { recursive: true });
await (await open(databaseFile, "a")).close();
await run("pnpm", ["db:generate"]);
await run("pnpm", ["db:deploy"]);
await run("pnpm", ["db:seed"]);

console.log("Setup complete. Run: pnpm dev");
