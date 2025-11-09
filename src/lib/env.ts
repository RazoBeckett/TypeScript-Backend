/**
 * Environment variable validation and configuration utility.
 *
 * This module loads environment variables from .env files using dotenv,
 * expands variable references with dotenv-expand, and validates them
 * against a Zod schema to ensure type safety and required values.
 *
 * @module env.util
 *
 * @example
 * ```typescript
 * import env from "@/utils/env.util";
 *
 * console.log(env.PORT); // Type-safe access to validated PORT
 * console.log(env.NODE_ENV); // "development" | "production"
 * ```
 *
 * @throws {Error} When environment validation fails with detailed error messages
 */
import { config } from "dotenv";
import { expand } from "dotenv-expand";

import { ZodError, z } from "zod";

const EnvSchema = z.object({
  // Configurable defaults
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z
    .enum(["development", /* "staging", */ "production"])
    .default("development"),

  DATABASE_URL: z.string().trim(),
});

export type Env = z.infer<typeof EnvSchema>;

expand(config({ quiet: true }));

const env = (() => {
  try {
    return Object.freeze(EnvSchema.parse(process.env));
  } catch (error) {
    if (error instanceof ZodError) {
      let message = "\nEnvironment validation error(s):\n";
      for (const issue of error.issues) {
        message += `- ${issue.path.join(".")}: ${issue.message}\n`;
      }
      const e = new Error(
        `${message} \nCheck your .env file, then rerun the program (e.g., 'pnpm dev').`,
      );
      e.stack = "";
      throw e;
    }
    throw error;
  }
})();

export default env;
