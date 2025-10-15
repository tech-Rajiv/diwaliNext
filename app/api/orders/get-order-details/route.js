import { supabase } from "@/lib/supabaseClient";

const { NextResponse } = require("next/server");

export const POST = async (request) => {
  const body = await request.json();

  const { id } = body;
  console.log("id: ", id);

  const { data, error } = await supabase
    .from("orders_lists")
    .select("*")
    .eq("order_id", id);
  console.log("data: of order details", data);

  if (error) {
    return NextResponse.json({ msg: "error" }, { status: 402 });
  }
  return NextResponse.json({ data });
};
