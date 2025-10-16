import { jwtVErifyAndSendPayload } from "@/app/apiHelper/jwtVerifyAndPayload";
import { supabase } from "@/lib/supabaseClient";

const { NextResponse } = require("next/server");

export async function GET(request) {
  const payload = await jwtVErifyAndSendPayload(request);
  const userId = payload?.sub;

  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const returnPayload = {
    shopDetails: {
      shop_id: "",
      shop_name: "",
      shop_owner: "",
      shop_members: {
        members_count: "",
        members: [
          {
            name: "Rajiv mishra",
            is_admin: true,
            is_owner: true,
            invested_amount: 30000,
          },
          {
            name: "Adarsh patel",
            is_admin: false,
            is_owner: false,
            invested_amount: 30000,
          },
          {
            name: "Vishal singh",
            is_admin: false,
            is_owner: false,
            invested_amount: 30000,
          },
          {
            name: "Sanjay bhai",
            is_admin: false,
            is_owner: false,
            invested_amount: 20000,
          },
        ],
      },
      shop_created_at: "",
      total_investment: "",
    },
    productDetails: {
      products: [],
      categories: [],
      total_products: "",
      total_categories: "",
    },
  };
  const { data: shopData, error: shopError } = await supabase
    .from("profile")
    .select(`working_shop_id , shop :working_shop_id (*)`)
    .eq(`user_id`, userId)
    .single();
  console.log(shopData, "data");
  if (shopError) {
    return NextResponse.json({ error: shopError?.message });
  }
  returnPayload.shopDetails.shop_id = shopData?.working_shop_id;
  returnPayload.shopDetails.shop_name = shopData?.shop?.shop_name;
  returnPayload.shopDetails.shop_created_at = shopData?.shop?.created_at;
  returnPayload.shopDetails.shop_members.members_count =
    shopData?.shop?.members;
  returnPayload.shopDetails.total_investment = shopData?.shop?.total_investment;

  const { data: productsData, error: productsError } = await supabase
    .from("products")
    .select("*")
    .eq("shop_id", returnPayload.shopDetails.shop_id);
  const { data: categoriesData, error: categoriesError } = await supabase
    .from("categories")
    .select("*")
    .eq("shop_id", returnPayload.shopDetails.shop_id);

  if (categoriesError) {
    return NextResponse.json({ error: categoriesError?.message });
  }
  if (productsError) {
    return NextResponse.json({ error: productsError?.message });
  }
  returnPayload.productDetails.products = productsData;
  returnPayload.productDetails.total_products = productsData.length;

  returnPayload.productDetails.categories = categoriesData;
  returnPayload.productDetails.total_categories = categoriesData.length;

  return NextResponse.json({ data: returnPayload });
}
