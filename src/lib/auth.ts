import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/client.js";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 mintues
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
});
