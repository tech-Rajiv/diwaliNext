import { supabase } from "@/lib/supabaseClient";

const { NextResponse } = require("next/server");

export async function GET() {
  const { data, error } = await supabase.from("categories").select("id,name");
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ data });
}
