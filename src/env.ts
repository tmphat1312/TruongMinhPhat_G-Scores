import "dotenv/config";
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const isProduction = process.env.NODE_ENV === "production";

export const env = createEnv({
  server: {
    TURSO_CONNECTION_URL: z.string().optional(),
    TURSO_AUTH_TOKEN: z.string().optional(),
    DB_FILE_NAME: z.string().optional(),
    SEED_DATASET_URL: z.string().url().optional(),
  },
  client: {},
  runtimeEnv: {
    TURSO_CONNECTION_URL: process.env.TURSO_CONNECTION_URL,
    TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,
    DB_FILE_NAME: process.env.DB_FILE_NAME,
    SEED_DATASET_URL: process.env.SEED_DATASET_URL,
  },
  emptyStringAsUndefined: true,
  createFinalSchema: (shape) => {
    return z.object(shape).transform((env, ctx) => {
      if (isProduction && !env.TURSO_CONNECTION_URL && !env.TURSO_AUTH_TOKEN) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "TURSO_CONNECTION_URL & TURSO_AUTH_TOKEN is required in production",
        });
        return z.NEVER;
      }
      return env;
    });
  },
});
