import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader?.replace("Bearer ", "") !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Revalidate key pages
    revalidatePath("/");
    revalidatePath("/genre/[genre]", "page");
    revalidatePath("/story/[id]", "page");

    return NextResponse.json({ success: true, message: "Pages revalidated" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
