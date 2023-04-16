import { NextRequest, NextResponse } from "next/server";
import { getMeApi } from "../server";

export async function publicRouteMiddleware(req: NextRequest) {
  const getMeResponse = await getMeApi(req.headers.get("Cookie") as string);

  if (getMeResponse.ok) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
