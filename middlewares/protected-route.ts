import { NextRequest, NextResponse } from "next/server";
import { getMeApi } from "../service";

export async function protectedRouteMiddleware(req: NextRequest) {
  const getMeResponse = await getMeApi(req.headers.get("Cookie") as string);
  if (!getMeResponse.ok) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    url.search = "";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
