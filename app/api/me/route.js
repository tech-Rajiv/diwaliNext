import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function GET(request) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { message: "No token in cokkies" },
      { status: 401 }
    );
  }

  try {
    const secret = new TextEncoder().encode(process.env.SUPABASE_JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return NextResponse.json({ user: payload, token });
  } catch (err) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
