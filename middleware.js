import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname; // กำหนดค่า pathname จาก request.nextUrl

  // ตรวจสอบว่าผู้ใช้เข้าผ่าน LIFF หรือไม่
  const userAgent = request.headers.get("user-agent");
  const isLine = userAgent.includes("Line");

  // ตรวจสอบว่า path คือ '/user' และไม่มี LIFF token จะ redirect ไปหน้า home
  if (pathname.startsWith("/user")) {
    const liffToken = request.cookies.get("liff_token");
    if (!liffToken && !isLine) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // ตรวจสอบการอนุญาตสำหรับหน้า '/admin' และ '/admin/:path*'
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("Token"); // ตรวจสอบ token จาก cookies
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url)); // Redirect ไปที่หน้า login ถ้าไม่มี token
    }

    const permition = "admin"; // กำหนดค่า permition ตามความต้องการ
    const allowedPaths = {
      admin: ["/admin"], // เพิ่มเส้นทางที่อนุญาตตามต้องการ
    };

    const isAllowed = allowedPaths[permition]?.some(allowedPath => pathname.startsWith(allowedPath));

    if (!isAllowed) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // อนุญาตการเข้าถึงเส้นทางอื่นๆ
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/user/reserve"],
};
