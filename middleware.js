import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const protectedRoutes = ["/admin", "/products"];
const guestRoutes = ["/login"];

const secret = new TextEncoder().encode(process.env.SUPABASE_JWT_SECRET);

export async function middleware(request) {
  const token = request.cookies.get("token")?.value;
  console.log("token: ", token);

  const pathname = request.nextUrl.pathname;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected) {
    console.log("isprotected");
    try {
      const { payload } = await jwtVerify(token, secret);
      console.log("payload: ", payload);

      return NextResponse.next();
    } catch (err) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  const isForGuest = guestRoutes.some((route) => pathname.startsWith(route));
  if (isForGuest) {
    console.log("isforguest");
    if (!token) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}
