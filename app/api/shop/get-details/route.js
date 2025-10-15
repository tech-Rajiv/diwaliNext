import { supabase } from "@/lib/supabaseClient";

const { NextResponse } = require("next/server");

export async function POST(request) {
  const body = await request.json();
  const { userId } = body;
  if (!userId) {
    return NextResponse.json({ error: "not logget in" }, { status: 401 });
  }
  const { data: shopDetails, error: shopErr } = await supabase
    .from("profile")
    .select("working_shop_name,working_shop_id")
    .eq("user_id", userId)
    .single();

  const shopId = shopDetails?.working_shop_id;

  if (shopErr) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  const { data: categoryData, error: categoryErr } = await supabase
    .from("categories")
    .select("id,name,image_url")
    .eq("shop_id", shopId);

  if (categoryErr) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const { data: productData, error: prodErr } = await supabase
    .from("products")
    .select(
      ` id,title,
        description,   
        sell_price,
        purchased_year,
        purchased_single_packets,
        purchased_from,
        available_stock,
        category_id,
        image_url`
    )
    .eq("shop_id", shopId);

  if (prodErr) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ shopDetails, productData, categoryData });
}
