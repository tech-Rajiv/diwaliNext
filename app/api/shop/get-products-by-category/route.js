import { supabase } from "@/lib/supabaseClient";

const { NextResponse } = require("next/server");

export const POST = async (request) => {
  const body = await request.json();
  const { categoryId } = body;
  console.log(categoryId, "cat id");
  const { data, error } = await supabase
    .from("products")
    .select(
      ` id,title,
            description,   
            sell_price,
            purchased_year,
            purchased_single_packets,
            purchased_from,
            available_stock,
            image_url`
    )
    .eq("category_id", categoryId);
  console.log("dataaa ,dda", data);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ data });
};
