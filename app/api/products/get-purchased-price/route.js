import { supabase } from "@/lib/supabaseClient";

const { NextResponse } = require("next/server");

export const POST = async (request) => {
  const body = await request.json();
  const { code, product_id } = body;
  const key = process.env.CODE_KEY;
  console.log(key, code);
  if (key != code) {
    return NextResponse.json(
      { success: false, message: "Invalid code" },
      { status: 403 }
    );
  }
  try {
    let query = supabase
      .from("products")
      .select("buy_price")
      .eq("id", product_id)
      .single();
    const { data, error } = await query;
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
