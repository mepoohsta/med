import PostgresAdapter from "@auth/pg-adapter";
import NextAuth from "next-auth";
import { pool } from "./backend/services/db/db";
import authConfig from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PostgresAdapter(pool),
  debug: true,
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      // @ts-expect-error TODO: Need to fix
      session.user.id = token.id;
      return session;
    },
  },
});
