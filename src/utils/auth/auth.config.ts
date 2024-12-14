import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { authenticate, authenticateWithGoogle } from "@/services/auth.service";

const authRoutes = ["/login", "/forgot-password", "/reset-password"];

export const authConfig = {
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAuthRoute = authRoutes.some((route) =>
        nextUrl.pathname.startsWith(route)
      );

      if (isAuthRoute) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/", nextUrl));
        }
        return true;
      }

      if (!isLoggedIn) {
        return Response.redirect(new URL("/login", nextUrl));
      }

      return true;
    },
    async jwt({ token, user, account, profile }) {
      if (account?.provider === "google") {
        try {
          if (!profile?.email || !profile?.sub) {
            throw new Error("Required Google profile data is missing");
          }

          const response = await authenticateWithGoogle(
            profile.email,
            profile.sub
          );

          if (!response?.restaurantData) {
            throw new Error("Invalid response from server");
          }

          const { restaurantData } = response;
          token.accessToken = restaurantData.token;
          token.id = restaurantData.id;
          const { token: _, ...safeRestaurantData } = restaurantData;
          token.restaurant = safeRestaurantData;
          return token;
        } catch (error: any) {
          console.error("Error in Google authentication:", error);
          throw error;
        }
      } else if (user) {
        token.accessToken = user.token;
        token.id = user.id!;
        const {
          password,
          token: _,
          ...safeRestaurantData
        } = user.restaurantData;
        token.restaurant = safeRestaurantData;
        return token;
      }
      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.accessToken = token.accessToken as string;
        session.user.restaurant = token.restaurant;
        session.user.email = token.restaurant.email;
        session.user.name = token.restaurant.name;
      }
      return session;
    },
  },
  providers: [
    Google,
    Credentials({
      async authorize(credentials) {
        try {
          const response = await authenticate(
            credentials.email as string,
            credentials.password as string
          );

          if (!response?.restaurantData) {
            return null;
          }

          return {
            id: response.restaurantData.id,
            token: response.restaurantData.token,
            restaurantData: response.restaurantData,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
