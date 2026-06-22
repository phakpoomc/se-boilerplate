import { createApp } from "./app";
import { env } from "./common/config/env";

async function main() {
  const app = await createApp();

  await new Promise<void>((resolve, reject) => {
    const server = app.listen(env.PORT);
    server.once("listening", () => {
      console.log(`Starter API listening on http://localhost:${env.PORT}`);
      resolve();
    });
    server.once("error", reject);
  });
}

main().catch((error) => {
  if (
    error instanceof Error &&
    "code" in error &&
    error.code === "EADDRINUSE"
  ) {
    console.error(
      `Could not start the Starter API because port ${env.PORT} is already in use. ` +
      "Change PORT in apps/api/.env, then restart pnpm dev."
    );
    process.exit(1);
  }

  console.error("Failed to start API", error);
  process.exit(1);
});
