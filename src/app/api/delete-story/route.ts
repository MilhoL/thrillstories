import { NextRequest, NextResponse } from "next/server";
import { deleteStory } from "@/lib/db";

export async function DELETE(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader?.replace("Bearer ", "") !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();
  if (!id) {
    return NextResponse.json({ error: "Missing story id" }, { status: 400 });
  }

  try {
    await deleteStory(id);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
