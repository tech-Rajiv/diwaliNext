import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(request) {
  console.log(request);
  return NextResponse.json("okk");
}
