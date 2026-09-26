
'use client';

import Image from "next/image";
import { ExternalLink, Newspaper, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import type { TrendingNewsArticle } from "@/lib/trending-news";

export default function TrendingNews() {
  const [articles, setArticles] = useState<TrendingNewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadNews() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/trending-news", { signal: controller.signal });
        const result = await response.json() as {
          articles?: TrendingNewsArticle[];
          error?: string;
        };
        if (!response.ok) throw new Error(result.error || "Unable to load crypto news.");
        setArticles(result.articles ?? []);
      } catch (loadError) {
        if (controller.signal.aborted) return;
        setError(loadError instanceof Error ? loadError.message : "Unable to load crypto news.");
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    void loadNews();
    return () => controller.abort();
  }, [refreshKey]);

  return (
    <section className="font-mono flex h-[min(46rem,calc(100vh-7rem))] min-h-80 w-full max-w-3xl flex-col overflow-hidden border border-white/10 bg-[#101210] text-white">
      <header className="flex items-center justify-between border-b border-white/10 px-4 py-4">
        <div>
          <p className="mb-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-accent-yellow">
            <span className="size-1.5 rounded-full bg-accent-yellow" />
            Crypto wire
          </p>
          <h2 className="font-mono text-lg font-semibold">Trending News</h2>
        </div>
        <button
          aria-label="Refresh news"
          className="flex size-9 items-center justify-center border border-white/15 text-primary-gray transition-colors hover:border-accent-yellow hover:text-accent-yellow disabled:opacity-50"
          disabled={isLoading}
          onClick={() => setRefreshKey((key) => key + 1)}
          title="Refresh news"
          type="button"
        >
          <RefreshCw className={`cursor-pointer size-4 ${isLoading ? "animate-spin" : ""}`} />
        </button>
      </header>

      {error ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-5 text-center">
          <Newspaper className="size-7 text-primary-gray" />
          <p className="max-w-xs text-sm text-primary-gray">{error}</p>
          <button
            className="font-mono text-xs text-accent-yellow underline underline-offset-4"
            onClick={() => setRefreshKey((key) => key + 1)}
            type="button"
          >
            Try again
          </button>
        </div>
      ) : (
        <div className="min-h-0 flex-1 overflow-y-auto scrollbar-thumb-primary-gray">
          {isLoading && articles.length === 0 ? (
            <div className="divide-y divide-white/10" aria-label="Loading crypto news">
              {Array.from({ length: 6 }, (_, index) => (
                <div className="flex animate-pulse gap-3 p-3" key={index}>
                  <div className="h-16 w-20 shrink-0 bg-white/10" />
                  <div className="flex flex-1 flex-col gap-2 py-1">
                    <div className="h-3 w-2/5 bg-white/10" />
                    <div className="h-3 w-full bg-white/10" />
                    <div className="h-3 w-4/5 bg-white/10" />
                  </div>
                </div>
              ))}
            </div>
          ) : articles.length ? (
            <div className="divide-y divide-white/10">
              {articles.map((article) => (
                <a
                  className="group flex gap-3 p-3 transition-colors hover:bg-white/4"
                  href={article.url}
                  key={article.id}
                  rel="noreferrer"
                  target="_blank"
                >
                  <div className="relative flex h-16 w-20 shrink-0 items-center justify-center overflow-hidden bg-[#252923]">
                    {article.imageUrl ? (
                      <Image
                        alt=""
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        fill
                        sizes="80px"
                        src={article.imageUrl}
                        unoptimized
                      />
                    ) : (
                      <Newspaper className="size-6 text-accent-yellow/70" />
                    )}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
                    <div>
                      <div className="mb-1 flex items-center gap-2 font-mono text-[9px] uppercase tracking-wide text-primary-gray">
                        <span className="truncate">{article.source}</span>
                        {article.publishedAt && (
                          <time className="shrink-0" dateTime={article.publishedAt}>
                            {new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(new Date(article.publishedAt))}
                          </time>
                        )}
                      </div>
                      <h3 className="line-clamp-2 text-[13px] font-semibold leading-snug group-hover:text-accent-yellow">
                        {article.title}
                      </h3>
                    </div>
                    <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-primary-gray">
                      {article.description}
                    </p>
                  </div>
                  <ExternalLink className="mt-1 size-3 shrink-0 text-primary-gray/60 transition-colors group-hover:text-accent-yellow" />
                </a>
              ))}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center px-5 text-center text-sm text-primary-gray">
              No crypto headlines are available right now.
            </div>
          )}
        </div>
      )}
      <footer className="border-t border-white/10 px-4 py-2 font-mono text-[9px] uppercase tracking-wide text-primary-gray">
        {articles.length ? `${articles.length} latest stories · RSS sources` : "Independent RSS sources"}
      </footer>
    </section>
  );
}