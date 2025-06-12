import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DB_FILE_NAME: z.string(),
    SEED_DATASET_URL: z.string().url(),
  },
  // Client-side env vars must be prefixed with `NEXT_PUBLIC_`
  client: {},

  // This is the runtime environment configuration
  runtimeEnv: {
    DB_FILE_NAME: process.env.DB_FILE_NAME,
    SEED_DATASET_URL: process.env.SEED_DATASET_URL,
  },
});
