import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedRoutes = ["/dashboard", "/admin", "/settings"];
const publicRoutes = ["/login", "/signup", "/"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const token = await getToken({ req });
  console.log("token: ", token);
  const isAuthRoute = /^\/api\/auth\//.test(path);
  console.log("path: ", path);
  if (path.startsWith("/api") && !isAuthRoute) {
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  if (protectedRoutes.some((route) => path.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (publicRoutes.includes(path) && token) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/((?!_next/static|_next/image|favicon.ico).*)"],
};
