import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl.clone();
  const permition = "admin"; // เปลี่ยนค่า permition ตามความต้องการ
  const path = url.pathname; // กำหนดค่า pathname จาก request.nextUrl

  const allowedPaths = {
    admin: ["/admin", ],
    user: ["/user", ],
  };

  // If the path is '/user' and there is no LIFF token, redirect to home
  if (path === "/user") {
    const liffToken = request.cookies.get('liff_token');
    if (!liffToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (!allowedPaths[permition]?.includes(url.pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin" , '/user'],
};
