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

export async function DELETE(request) {
  try {
    const body = await request.json();
    const { product_id } = body;

    if (!product_id) {
      return NextResponse.json(
        { error: "product_id is required" },
        { status: 400 }
      );
    }

    console.log("Deleting product with ID:", product_id);

    const { data, error } = await supabase
      .from("products")
      .delete()
      .eq("id", product_id) // match the column name in your table
      .select(); // optional: return deleted record(s)

    if (error) {
      console.error("Supabase delete error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { message: "No product found with that ID" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Product deleted successfully",
      deleted: data[0],
    });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
