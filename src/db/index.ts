import { env } from "@/env";
import { drizzle } from "drizzle-orm/libsql";

export const db = drizzle({ connection: { url: env.DB_FILE_NAME } });
