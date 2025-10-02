import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function POST(req) {
  const token = req.cookies.get("token")?.value;
  console.log("tokkkk", token);
  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
  try {
    const secret = new TextEncoder().encode(process.env.SECRET_KEY_JWT);
    const { payload } = await jwtVerify(token, secret);
    return NextResponse.json({ user: payload, token });
  } catch {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
