import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.SECRET_KEY_JWT);
const protectedRoutes = ["/addproducts"];

export async function middleware(request) {
  const token = request.cookies.get("token")?.value;
  let verified = null;

  if (token) {
    try {
      const { payload } = await jwtVerify(token, secret);
      verified = payload;
    } catch (err) {
      console.log("JWT verification failed:", err.message);
    }
  }

  const { pathname } = request.nextUrl;

  if (
    protectedRoutes.some((route) => pathname.startsWith(route)) &&
    !verified
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
