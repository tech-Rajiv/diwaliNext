import { NextResponse } from "next/server";

export async function POST(req) {
  const res = NextResponse.json({ msg: "logout sucessfull" });
  res.cookies.set("token", "", { maxAge: 0, path: "/" });
  return res;
}
