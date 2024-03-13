import { z } from "zod";

const envSchema = z.object({
  REACT_APP_ACTUAL_USER_KEY: z.string(),
  REACT_APP_JESUS_API_URL: z.string().url(),
  REACT_APP_USER_GLOBAL_KEY: z.string(),
  REACT_APP_LOADER_ACTIVES: z.string(),
});

const appEnv = envSchema.parse(process.env);

export { appEnv };
