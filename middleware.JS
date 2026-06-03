import { NextResponse } from "next/server";

export function middleware(req) {
  const pathname = req.nextUrl.pathname;

  const res = NextResponse.next();
  res.headers.set("x-pathname", pathname);

  return res;
}
