import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authenticate } from "../services/auth.service";

const authRoutes = ["/login", "/forgot-password", "/reset-password"];

export const authConfig = {
  pages: {
    signIn: "/login",
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
    jwt({ token, user }) {
      if (user) {
        // Extract token from restaurantData
        token.accessToken = user.token;
        token.id = user.id!;

        // Store restaurant data without sensitive information
        const {
          password,
          token: _,
          ...safeRestaurantData
        } = user.restaurantData;
        token.restaurant = safeRestaurantData;
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
