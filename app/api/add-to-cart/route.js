import { supabase } from "@/lib/supabaseClient";
import { jwtVerify } from "jose";

const { NextResponse } = require("next/server");

export async function POST(request) {
  const body = await request.json();
  const { products, total_price, total_products_quantity } = body;
  console.log(products, "products");
  const token = request.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ msg: "invalid token" }, { status: 401 });
  }

  try {
    const secret = new TextEncoder().encode(process.env.SUPABASE_JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const userId = payload?.sub;
    const email = payload?.email;
    if (!userId || !email) {
      throw new Error("SOMETHING WENT WRONG IN YOUR TOKEN");
    }

    // Call your RPC
    const { error } = await supabase.rpc("create_order_with_items", {
      p_by_admin: email,
      p_customer_name: "rajiv",
      p_items: products,
    });
    if (error) {
      console.error("Supabase RPC error:", error);
      throw new Error(error.message || "Failed to create order");
    }

    return NextResponse.json(
      { message: "Order created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in route:", error.message);

    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
