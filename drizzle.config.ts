import { defineConfig } from "drizzle-kit";
import { env } from "@/env";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: process.env.NODE_ENV == "production" ? "turso" : "sqlite",
  dbCredentials:
    process.env.NODE_ENV == "production"
      ? {
          url: env.TURSO_CONNECTION_URL!,
          authToken: env.TURSO_AUTH_TOKEN!,
        }
      : {
          url: env.DB_FILE_NAME!,
        },
});
