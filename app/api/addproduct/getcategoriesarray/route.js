import { supabase } from "@/lib/supabaseClient";

const { NextResponse } = require("next/server");

export async function GET() {
  const { data, error } = await supabase.from("category").select("id,name");
  console.log("data", data);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ data });
}
