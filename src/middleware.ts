import { auth } from "./utils/auth/auth";

export default auth;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
