import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

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
      .eq("id", product_id)
      .select();

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
