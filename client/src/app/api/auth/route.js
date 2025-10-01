// client/src/app/api/auth/route.js
import { NextResponse } from "next/server";

const BACKEND = process.env.API_URL ?? "http://localhost:5000/api";

export async function POST(req) {
  try {
    const body = await req.json();

    const backendRes = await fetch(`${BACKEND}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });

    const data = await backendRes.json();

    // Try to forward set-cookie if backend provided one
    const setCookie = backendRes.headers.get("set-cookie");
    const headers = {};
    if (setCookie) {
      headers["Set-Cookie"] = setCookie;
    }

    return NextResponse.json(data, { status: backendRes.status, headers });
  } catch (err) {
    console.error("Proxy /api/auth/register error:", err);
    return NextResponse.json({ error: "Proxy error" }, { status: 500 });
  }
}
