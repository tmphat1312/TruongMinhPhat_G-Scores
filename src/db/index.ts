import { env } from "@/env";
import { drizzle } from "drizzle-orm/libsql";

export const db =
  process.env.NODE_ENV === "production"
    ? drizzle({
        connection: {
          url: env.TURSO_CONNECTION_URL!,
          authToken: env.TURSO_AUTH_TOKEN!,
        },
      })
    : drizzle({ connection: { url: env.DB_FILE_NAME! } });
