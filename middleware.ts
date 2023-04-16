import { NextRequest, NextResponse } from "next/server";
import { protectedRouteMiddleware, publicRouteMiddleware } from "./middlewares";

export function middleware(req: NextRequest) {
  const publicRoutes = ["/", "/register"];
  const protectedRoutes = ["/dashboard", "/dashboard/*"];

  if (publicRoutes.includes(req.nextUrl.pathname)) {
    return publicRouteMiddleware(req);
  }
  if (protectedRoutes.includes(req.nextUrl.pathname)) {
    return protectedRouteMiddleware(req);
  }
}
