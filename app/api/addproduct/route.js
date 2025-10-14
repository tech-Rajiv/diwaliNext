import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(request) {
  const formData = await request.json();
  try {
    const {
      title,
      description,
      buy_price,
      sell_price,
      purchased_year,
      purchased_single_packets,
      purchased_from,
      purchased_box,
      packet_per_box,
      available_stock,
      category_id,
      image_url,
    } = formData;
    const { data, error } = await supabase.from("products").insert([
      {
        title,
        description,
        buy_price,
        sell_price,
        purchased_year,
        purchased_single_packets,
        purchased_from,
        purchased_box,
        packet_per_box,
        available_stock,
        category_id,
        image_url,
      },
    ]);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ msg: "Product added successfully", data });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
