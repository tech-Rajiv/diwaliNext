import { supabase } from "@/lib/supabaseClient";

const { NextResponse } = require("next/server");

export async function GET() {
  const { data, error } = await supabase
    .from("category")
    .select("id,name,image_url");
  if (error) {
    return NextResponse.json(
      { msg: "error while fetching data" },
      { status: 302 }
    );
  }

  return NextResponse.json({ data });
}
