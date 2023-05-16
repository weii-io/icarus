import { NextRequest, NextResponse } from "next/server";
import { IcarusApiUserService } from "../service/icarus-api/user";

export async function publicRouteMiddleware(req: NextRequest) {
  const cookie = req.headers.get("Cookie") as string;
  const response = await new IcarusApiUserService().getCurrentUser(cookie);
  if (response.ok) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
