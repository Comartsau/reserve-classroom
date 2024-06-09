import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname; // กำหนดค่า pathname จาก request.nextUrl

  // ตรวจสอบว่า path คือ '/user' และไม่มี LIFF token จะ redirect ไปหน้า home
  if (pathname === "/user") {
    const liffToken = request.cookies.get('liff_token');
    if (!liffToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // อนุญาตการเข้าถึงถ้า path อยู่ใน allowedPaths
  if (pathname === "/admin") {
    const permition = "admin"; // กำหนดค่า permition ตามความต้องการ
    const allowedPaths = {
      admin: ["/admin"],
    };

    if (!allowedPaths[permition]?.includes(pathname)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // อนุญาตการเข้าถึงเส้นทางอื่นๆ
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/user"],
};
