import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

interface RestaurantData {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  email: string;
  phone: string;
  rating: number | null;
  password?: string; // Optional as it will be removed before storing
  token?: string; // Optional as it will be removed before storing
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      accessToken: string;
      restaurant: Omit<RestaurantData, 'password' | 'token'>;
    } & DefaultSession["user"];
  }

  interface User {
    token: string;
    id: string;
    restaurantData: RestaurantData;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    accessToken: string;
    restaurant: Omit<RestaurantData, 'password' | 'token'>;
  }
}
