import { XMLParser } from "fast-xml-parser";

export interface TrendingNewsArticle {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  url: string;
  source: string;
  publishedAt: string | null;
}

const feeds = [
  { name: "Cointelegraph", url: "https://cointelegraph.com/rss" },
  { name: "Decrypt", url: "https://decrypt.co/feed" },
  { name: "Bitcoin Magazine", url: "https://bitcoinmagazine.com/.rss/full/" },
];

const parser = new XMLParser({
  attributeNamePrefix: "@_",
  ignoreAttributes: false,
  removeNSPrefix: false,
});

const cryptoTopics = /bitcoin|\bbtc\b|ethereum|\beth\b|crypto|blockchain|defi|web3|token|stablecoin|\bnft\b|solana|\bxrp\b|wallet|exchange|binance|coinbase|cardano|dogecoin|altcoin/i;

type FeedValue = string | number | Record<string, unknown> | unknown[] | null | undefined;
type FeedItem = Record<string, FeedValue>;

function asText(value: FeedValue): string {
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (Array.isArray(value)) return asText(value[0] as FeedValue);
  if (value && typeof value === "object") {
    return asText((value["#text"] ?? value["#cdata"] ?? "") as FeedValue);
  }
  return "";
}

function cleanText(value: FeedValue): string {
  return asText(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function limitWords(text: string, maxWords: number): string {
  const words = text.split(/\s+/).filter(Boolean);
  return words.length > maxWords ? `${words.slice(0, maxWords).join(" ")}…` : text;
}

function validUrl(value: string): string | null {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function imageFrom(item: FeedItem, description: string): string | null {
  const candidates = [item.enclosure, item["media:content"], item["media:thumbnail"]];
  for (const candidate of candidates) {
    const entries = Array.isArray(candidate) ? candidate : [candidate];
    for (const entry of entries) {
      if (entry && typeof entry === "object") {
        const record = entry as Record<string, FeedValue>;
        const image = validUrl(asText(record["@_url"] ?? record["@_href"]));
        if (image) return image;
      }
    }
  }

  const html = `${asText(item["content:encoded"])} ${asText(item.description)} ${description}`;
  const imageMatch = html.match(/<img\b[^>]*\bsrc=["']([^"']+)["']/i);
  return imageMatch ? validUrl(imageMatch[1]) : null;
}

function parseFeed(xml: string, source: string): TrendingNewsArticle[] {
  const parsed = parser.parse(xml) as Record<string, unknown>;
  const channel = parsed.rss as Record<string, unknown> | undefined;
  const channelBody = (channel?.channel ?? parsed.feed) as Record<string, unknown> | undefined;
  const rawItems = channelBody?.item ?? channelBody?.entry;
  const items = (Array.isArray(rawItems) ? rawItems : rawItems ? [rawItems] : []) as FeedItem[];

  return items.flatMap((item) => {
    const title = cleanText(item.title);
    const description = cleanText(item.description ?? item.summary ?? item["content:encoded"]);
    const link = validUrl(asText(item.link) || asText(item.guid));
    if (!title || !link || !cryptoTopics.test(`${title} ${description}`)) return [];

    const published = cleanText(item.pubDate ?? item.published ?? item.updated);
    const parsedDate = published ? new Date(published) : null;
    const publishedAt = parsedDate && !Number.isNaN(parsedDate.getTime()) ? parsedDate.toISOString() : null;

    return [{
      id: link,
      title: limitWords(title, 12),
      description: limitWords(description || title, 15),
      imageUrl: imageFrom(item, description),
      url: link,
      source,
      publishedAt,
    }];
  });
}

export async function getTrendingNews(): Promise<TrendingNewsArticle[]> {
  const results = await Promise.allSettled(
    feeds.map(async (feed) => {
      const response = await fetch(feed.url, {
        headers: { accept: "application/rss+xml, application/xml, text/xml" },
        next: { revalidate: 900 },
        signal: AbortSignal.timeout(10000),
      });
      if (!response.ok) throw new Error(`Could not fetch ${feed.name} RSS feed`);
      return parseFeed(await response.text(), feed.name);
    }),
  );

  const articles = results.flatMap((result) => result.status === "fulfilled" ? result.value : []);
  const uniqueArticles = [...new Map(articles.map((article) => [article.url, article])).values()];
  uniqueArticles.sort((first, second) => {
    return (second.publishedAt ? Date.parse(second.publishedAt) : 0)
      - (first.publishedAt ? Date.parse(first.publishedAt) : 0);
  });

  if (!uniqueArticles.length) throw new Error("No crypto articles were available from the RSS feeds");
  return uniqueArticles.slice(0, 12);
}