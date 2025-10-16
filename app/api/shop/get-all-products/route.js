import { jwtVErifyAndSendPayload } from "@/app/apiHelper/jwtVerifyAndPayload";
import { supabase } from "@/lib/supabaseClient";

const { NextResponse } = require("next/server");

export async function GET(request) {
  const payload = await jwtVErifyAndSendPayload(request);
  const userId = payload?.sub;

  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: shopDetails, error: shopErr } = await supabase
    .from("profile")
    .select("working_shop_name,working_shop_id")
    .eq("user_id", userId)
    .single();

  const shopId = shopDetails?.working_shop_id;
  console.log("hereeeeeee,!");
  if (shopErr) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const { data: productData, error: prodErr } = await supabase
    .from("products")
    .select(`*`)
    .eq("shop_id", shopId);

  if (prodErr) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ data: productData });
}
