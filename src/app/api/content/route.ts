import { NextRequest, NextResponse } from "next/server"
import { defaultContent } from "@/lib/portfolio-data"
import {
  getSiteContent,
  saveSiteContent,
  resetSiteContent,
} from "@/lib/site-content"

const EXPECTED_PASS = process.env.ADMIN_PASSWORD || "akash2027"

function authorized(req: NextRequest) {
  return (req.headers.get("x-admin-pass") ?? "") === EXPECTED_PASS
}

/** GET → live content (or `?defaults=1` for the built-in defaults). */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  if (searchParams.get("verify") === "1") {
    return NextResponse.json({ authorized: authorized(req) })
  }
  if (searchParams.get("defaults") === "1") {
    return NextResponse.json(defaultContent)
  }
  const content = await getSiteContent()
  return NextResponse.json(content)
}

/** PUT → save content from the admin editor (requires x-admin-pass header). */
export async function PUT(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json(
      { ok: false, error: "Wrong admin passcode." },
      { status: 401 }
    )
  }
  try {
    const body = await req.json()
    const saved = await saveSiteContent(body)
    return NextResponse.json({ ok: true, content: saved })
  } catch (err) {
    console.error("[content] save failed", err)
    return NextResponse.json(
      { ok: false, error: "Could not save content." },
      { status: 500 }
    )
  }
}

/** DELETE → reset to defaults (requires x-admin-pass header). */
export async function DELETE(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json(
      { ok: false, error: "Wrong admin passcode." },
      { status: 401 }
    )
  }
  try {
    await resetSiteContent()
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[content] reset failed", err)
    return NextResponse.json(
      { ok: false, error: "Could not reset content." },
      { status: 500 }
    )
  }
}
