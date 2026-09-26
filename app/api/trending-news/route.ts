import { getTrendingNews } from "@/lib/trending-news";

export const revalidate = 900;

export async function GET() {
  try {
    return Response.json({ articles: await getTrendingNews() });
  } catch {
    return Response.json(
      { error: "Crypto news is temporarily unavailable. Please try again shortly." },
      { status: 502 },
    );
  }
}