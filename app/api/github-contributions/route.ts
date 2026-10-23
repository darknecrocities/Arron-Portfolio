import { NextResponse } from "next/server";
import fallbackData from "@/data/contributions-fallback.json";

export const dynamic = "force-dynamic";
export const revalidate = 900; // 15-minute freshness

async function fetchFromProxy(username: string) {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`,
    {
      signal: AbortSignal.timeout(4500),
      headers: {
        Accept: "application/json",
        "User-Agent": "Arron-Portfolio-Contributions/2.0",
      },
    }
  );

  if (!res.ok) throw new Error(`Proxy status ${res.status}`);
  const data = await res.json();
  if (!data?.total?.lastYear || !Array.isArray(data.contributions)) {
    throw new Error("Invalid structure from proxy");
  }
  return data;
}

async function scrapeGitHubDirect(username: string) {
  const res = await fetch(`https://github.com/users/${encodeURIComponent(username)}/contributions`, {
    signal: AbortSignal.timeout(6000),
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      Accept: "text/html,application/xhtml+xml",
    },
  });

  if (!res.ok) throw new Error(`GitHub HTML status ${res.status}`);
  const html = await res.text();

  const totalMatch = html.match(
    /<h2[^>]+id="js-contribution-activity-description"[^>]*>\s*([0-9,]+)\s+contributions/i
  );
  const total = totalMatch ? parseInt(totalMatch[1].replace(/,/g, ""), 10) : 0;

  const tdRegex = /<td[^>]+class="[^"]*ContributionCalendar-day[^"]*"[^>]*>/g;
  let tdMatch;
  const days: { date: string; level: number; count: number }[] = [];
  while ((tdMatch = tdRegex.exec(html)) !== null) {
    const tdTag = tdMatch[0];
    const dateMatch = tdTag.match(/data-date="([^"]+)"/);
    const levelMatch = tdTag.match(/data-level="([0-4])"/);
    const idMatch = tdTag.match(/id="([^"]+)"/);
    if (dateMatch && levelMatch && idMatch) {
      const date = dateMatch[1];
      const level = parseInt(levelMatch[1], 10);
      const id = idMatch[1];

      const tipRegex = new RegExp(`<tool-tip[^>]+for="${id}"[^>]*>([0-9]+|No) contribution`, "i");
      const tipMatch = html.match(tipRegex);
      const count = tipMatch ? (tipMatch[1] === "No" ? 0 : parseInt(tipMatch[1], 10)) : 0;
      days.push({ date, level, count });
    }
  }

  if (total === 0 && days.length === 0) {
    throw new Error("Unable to parse HTML contributions");
  }

  return {
    total: { lastYear: total || days.reduce((sum, d) => sum + d.count, 0) },
    contributions: days,
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") || "darknecrocities";

  // Tier 1: Fast structured proxy
  try {
    const data = await fetchFromProxy(username);
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=900, stale-while-revalidate=1800",
      },
    });
  } catch (proxyError) {
    console.warn("Primary proxy failed, falling back to direct GitHub scrape:", proxyError);
  }

  // Tier 2: Direct GitHub public scraping (fail-safe for Vercel datacenter rate limits)
  try {
    const data = await scrapeGitHubDirect(username);
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=900, stale-while-revalidate=1800",
      },
    });
  } catch (scrapeError) {
    console.warn("Direct scrape failed, using verified fallback JSON:", scrapeError);
  }

  // Tier 3: Fresh offline fallback snapshot
  return NextResponse.json(fallbackData, {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
