import { NextResponse } from "next/server";
import fallbackData from "@/data/contributions-fallback.json";

export const revalidate = 3600; // revalidate every hour for daily freshness

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") || "darknecrocities";

  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`,
      {
        next: { revalidate: 3600 },
        headers: {
          Accept: "application/json",
          "User-Agent": "Arron-Portfolio-Contributions/2.0",
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Upstream returned status ${res.status}`);
    }

    const data = await res.json();

    // Verify expected structure
    if (!data || !data.total || !Array.isArray(data.contributions)) {
      throw new Error("Invalid response format from upstream");
    }

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.warn("Failed to fetch fresh GitHub contributions, using cached fallback:", error);
    return NextResponse.json(fallbackData, {
      headers: {
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=86400",
      },
    });
  }
}
