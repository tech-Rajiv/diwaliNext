import { supabase } from "@/lib/supabaseClient";

const { NextResponse } = require("next/server");

export const POST = async (request) => {
  const body = await request.json();

  const { id } = body;

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("by_admin", id);

  if (error) {
    return NextResponse.json({ msg: "error" }, { status: 402 });
  }
  return NextResponse.json({ data });
};
