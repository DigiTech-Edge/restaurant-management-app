import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export const { auth, signIn, signOut, unstable_update, handlers } =
  NextAuth(authConfig);
