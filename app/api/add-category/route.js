import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(request) {
  const formData = await request.json();
  try {
    const { name, image_url } = formData;
    const { data, error } = await supabase.from("categories").insert([
      {
        name,
        image_url,
        shop_id: 1,
      },
    ]);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ msg: "category added successfully", data });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
