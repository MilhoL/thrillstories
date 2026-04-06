import { NextRequest, NextResponse } from "next/server";
import { getAllStories } from "@/lib/db";

export async function GET(req: NextRequest) {
  const limit = Number(req.nextUrl.searchParams.get("limit") ?? 50);
  const offset = Number(req.nextUrl.searchParams.get("offset") ?? 0);

  try {
    const stories = await getAllStories(limit, offset);
    return NextResponse.json({ stories });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
