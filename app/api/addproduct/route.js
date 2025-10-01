import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(request) {
  const formData = await request.json();
  try {
    const { title, description, price, available_stock, category_id } =
      formData;
    const { data, error } = await supabase.from("products").insert([
      {
        title,
        description,
        price,
        available_stock,
        category_id,
      },
    ]);
    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("Inserted product:", data);
    return NextResponse.json({ msg: "Product added successfully", data });
  } catch (error) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
