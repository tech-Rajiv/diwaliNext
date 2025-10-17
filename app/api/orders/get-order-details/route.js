import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export const POST = async (request) => {
  try {
    const body = await request.json();
    const { id } = body;

    const [metaDetails, productsDetails] = await Promise.all([
      supabase.from("orders").select("*").eq("id", id).single(),
      supabase.from("orders_lists").select("*").eq("order_id", id),
    ]);

    const { data: meta, error: errorMeta } = metaDetails;
    const { data: products, error: errorProducts } = productsDetails;

    if (errorMeta || errorProducts) {
      console.error("Error fetching order details:");
      return NextResponse.json(
        { message: "Failed to fetch order details" },
        { status: 500 }
      );
    }
    return NextResponse.json({ meta, products });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
