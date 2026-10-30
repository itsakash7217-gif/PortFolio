import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { projects } from "@/lib/portfolio-data";

/** GET → { likes: Record<projectId, count> } (seeds baseline counts on first call) */
export async function GET() {
  try {
    const rows = await db.projectLike.findMany();

    // Seed baseline like counts for known projects the first time.
    if (rows.length === 0) {
      await db.projectLike.createMany({
        data: projects.map((p) => ({
          projectId: p.id,
          count: p.initialLikes,
        })),
      });
      const seeded = await db.projectLike.findMany();
      return NextResponse.json({
        likes: Object.fromEntries(seeded.map((r) => [r.projectId, r.count])),
      });
    }

    return NextResponse.json({
      likes: Object.fromEntries(rows.map((r) => [r.projectId, r.count])),
    });
  } catch (err) {
    console.error("[likes] failed to read likes", err);
    return NextResponse.json({ likes: {} }, { status: 500 });
  }
}

/** POST { projectId } → increments and returns the new count */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const projectId =
      typeof body?.projectId === "string" ? body.projectId : null;

    const known = projects.some((p) => p.id === projectId);
    if (!projectId || !known) {
      return NextResponse.json(
        { ok: false, error: "Unknown project" },
        { status: 400 }
      );
    }

    const updated = await db.projectLike.upsert({
      where: { projectId },
      update: { count: { increment: 1 } },
      create: { projectId, count: 1 },
    });

    return NextResponse.json({ ok: true, count: updated.count });
  } catch (err) {
    console.error("[likes] failed to update like", err);
    return NextResponse.json(
      { ok: false, error: "Could not register like" },
      { status: 500 }
    );
  }
}
