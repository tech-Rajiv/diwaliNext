import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { SignJWT } from "jose";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    const token = data.session.access_token;
    const res = NextResponse.json({
      user: {
        id: data.user.id,
        email: data.user.email,
      },
      msg: "Login successful",
      token,
    });
    res.cookies.set("token", token, {
      httpOnly: true, // cannot be accessed via JS
      secure: process.env.NODE_ENV === "production", // only over HTTPS in prod
      sameSite: "strict",
      path: "/", // available everywhere
      maxAge: 60 * 60, // 1 hour
    });
    return res;
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
