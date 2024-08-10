import { IconType } from "react-icons";
import {
  FiHome,
  FiUser,
  FiMessageSquare,
  FiSettings,
  FiShoppingCart,
} from "react-icons/fi";

export interface RouteItem {
  title: string;
  href: string;
  Icon: IconType;
}

export const routes: RouteItem[] = [
  { title: "Home", Icon: FiHome, href: "/" },
  { title: "About", Icon: FiUser, href: "/about" },
  { title: "Contact", Icon: FiMessageSquare, href: "/contact" },
  { title: "Settings", Icon: FiSettings, href: "/settings" },
  { title: "Shop", Icon: FiShoppingCart, href: "/shop" },
];
