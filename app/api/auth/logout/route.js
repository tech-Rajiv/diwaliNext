import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req) {
  const token = req.cookies.get("token")?.value;
  if (token) {
    await supabase.auth.signOut();
  }
  const res = NextResponse.json({ msg: "Logout successful" });
  res.cookies.set("token", "", { maxAge: 0, path: "/" });

  return res;
}
