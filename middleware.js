import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl.clone();
  const permition = "admin"; // เปลี่ยนค่า permition ตามความต้องการ

  const allowedPaths = {
    admin: ["/admin", ],
    user: ["/user", ],
  };

  if (!allowedPaths[permition]?.includes(url.pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin" , '/user'],
};
