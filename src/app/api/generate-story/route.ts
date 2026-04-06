import { NextRequest, NextResponse } from "next/server";
import { generateStory } from "@/lib/generate";
import { insertStory } from "@/lib/db";

export const maxDuration = 60; // allow up to 60s for OpenAI calls

export async function GET(req: NextRequest) {
  // Verify cron secret OR admin password
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  const adminPwd = process.env.ADMIN_PASSWORD;

  const token = authHeader?.replace("Bearer ", "");
  if (token !== cronSecret && token !== adminPwd) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const genre =
      (req.nextUrl.searchParams.get("genre") as any) ?? undefined;

    const storyData = await generateStory(genre);
    const saved = await insertStory(storyData);

    return NextResponse.json({
      success: true,
      story: { id: saved.id, title: saved.title, genre: saved.genre },
    });
  } catch (err: any) {
    console.error("Generation failed:", err);
    return NextResponse.json(
      { error: err.message ?? "Generation failed" },
      { status: 500 }
    );
  }
}
