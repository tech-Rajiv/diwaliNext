import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function PUT(request) {
  const formData = await request.json();
  try {
    const {
      id,
      title,
      description,
      buy_price,
      sell_price,
      purchased_single_packets,
      purchased_box,
      packet_per_box,
      available_stock,
      image_url,
    } = formData;
    console.log(formData, "formmm");
    const { data, error } = await supabase
      .from("products")
      .update([
        {
          title,
          description,
          buy_price,
          sell_price,
          purchased_single_packets,
          purchased_box,
          packet_per_box,
          available_stock,
          image_url,
        },
      ])
      .eq("id", id);
    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("Inserted product:", data);
    return NextResponse.json({ msg: "Product updated successfully", data });
  } catch (error) {
    console.error("API error:");
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
