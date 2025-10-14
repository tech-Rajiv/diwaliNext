import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(request) {
  let query = supabase.from("products").select(` id,title,
        description,   
        sell_price,
        purchased_year,
        purchased_single_packets,
        purchased_from,
        purchased_box,
        packet_per_box,
        available_stock,
        category_id,
        image_url`);
  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data });
}
