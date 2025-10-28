// app/api/categories/route.js
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://cestoid-uncoarsely-kayla.ngrok-free.dev/api/logo/logo");
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ data: null, error: "Failed to fetch" });
  }
}
