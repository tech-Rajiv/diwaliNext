import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(request) {
  return NextResponse.json("okk");
}
