import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST() {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      payment_method_types: ["card"], // keep 'card' just to be explicit

      // 🧠 key setting for India — allow promotion of alternative methods
      payment_method_options: {
        card: { setup_future_usage: "off_session" },
      },
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: { name: "Test product" },
            unit_amount: 50000, // 500 INR
          },
          quantity: 1,
        },
      ],
      success_url: "http://localhost:3000/orders/order-successfull",
      cancel_url: "http://localhost:3000/cart-items",
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
