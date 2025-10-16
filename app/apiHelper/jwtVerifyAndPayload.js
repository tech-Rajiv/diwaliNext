import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.SUPABASE_JWT_SECRET);

export async function jwtVErifyAndSendPayload(request) {
  const token = request.cookies.get("token")?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret);
    console.log("in helepr");
    console.log(payload);
    return payload;
  } catch {
    return null;
  }
}
