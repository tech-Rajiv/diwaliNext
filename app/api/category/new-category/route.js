import { supabase } from "@/lib/supabaseClient";

const { NextResponse } = require("next/server");

export async function POST(request) {
  const body = await request.json();
  console.log("body : ", body);
  const { name, image_url } = body;
  console.log("name, image_url: ", name, image_url);
  try {
    const { data, error } = await supabase
      .from("category")
      .insert([
        {
          name,
          image_url,
        },
      ])
      .select();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ msg: "ok", data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
