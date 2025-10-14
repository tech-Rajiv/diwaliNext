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
    const { data, error } = await supabase.rpc("create_order_with_items", {
      p_by_admin: email,
      p_customer_name: "rajiv",
      p_items: products,
    });
    if (error) throw error;
    console.log(data, "datattatatat");
    return NextResponse.json({ msg: "Order created successfully" });
  } catch (error) {
    return NextResponse.json(
      { msg: error?.message || "inavlid token" },
      { status: 401 }
    );
  }
}
