import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { secret, tags, all } = body;

    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    // all=true → bust the global "cms" tag which covers every CMS fetch
    if (all === true) {
      revalidateTag("cms", { expire: 0 });
      return NextResponse.json({ success: true, revalidated: ["cms"] });
    }

    if (!Array.isArray(tags) || tags.length === 0) {
      return NextResponse.json(
        { success: false, message: "Provide tags array or all: true" },
        { status: 400 },
      );
    }

    for (const tag of tags) {
      revalidateTag(tag, { expire: 0 });
    }

    return NextResponse.json({ success: true, revalidated: tags });
  } catch (error) {
    console.error("[Revalidate] Error:", error);
    return NextResponse.json(
      { success: false, message: "Revalidation failed" },
      { status: 500 },
    );
  }
}
