import { defineConfig } from "drizzle-kit";
import { env, isProduction } from "@/env";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: isProduction ? "turso" : "sqlite",
  dbCredentials: isProduction
    ? {
        url: env.TURSO_CONNECTION_URL!,
        authToken: env.TURSO_AUTH_TOKEN!,
      }
    : {
        url: env.DB_FILE_NAME!,
      },
});
