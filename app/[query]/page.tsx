// app/[query]/page.tsx
"use client"

import type { Movie } from '@/tmdb';
import { useParams } from "next/navigation";
import { movies } from "@/lib/helpfunc";
import { useState, useEffect } from "react";

function ScoreBadge({ score }: { score: number }) {
    const pct = Math.round(score * 10);
    const color = pct >= 70 ? "var(--success)" : pct >= 50 ? "var(--accent)" : "var(--danger)";
    return (
        <div className="flex items-center gap-1.5">
            <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 flex-shrink-0"
                style={{ borderColor: color, color, background: "rgba(0,0,0,0.3)" }}
            >
                {pct}
            </div>
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>score</span>
        </div>
    );
}

function MovieCard({ movie, index }: { movie: Movie; index: number }) {
    const year = movie.release_date ? movie.release_date.slice(0, 4) : "—";

    return (
        <div
            className="flex flex-col rounded-2xl border overflow-hidden animate-fade-up transition-all duration-200"
            style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
                animationDelay: `${index * 60}ms`,
            }}
            onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-dim)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.4)";
            }}
            onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
        >
            <div className="p-5 flex flex-col gap-3 flex-1">
                {/* Title row */}
                <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                        <h2
                            className="font-semibold leading-tight mb-1 truncate"
                            style={{ color: "var(--text-primary)", fontSize: "1rem" }}
                            title={movie.title}
                        >
                            {movie.title}
                        </h2>
                        <div className="flex items-center gap-2">
                            <span
                                className="text-xs px-2 py-0.5 rounded border"
                                style={{
                                    color: "var(--text-muted)",
                                    borderColor: "var(--border)",
                                    background: "var(--surface-2)",
                                }}
                            >
                                {year}
                            </span>
                        </div>
                    </div>
                    <ScoreBadge score={movie.vote_average} />
                </div>

                {/* Overview */}
                {movie.overview ? (
                    <p
                        className="text-sm leading-relaxed line-clamp-3"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        {movie.overview}
                    </p>
                ) : (
                    <p className="text-sm italic" style={{ color: "var(--text-muted)" }}>
                        No overview available.
                    </p>
                )}
            </div>

            {/* Footer */}
            <div
                className="px-5 py-3 border-t flex items-center justify-between"
                style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}
            >
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {movie.release_date || "Unknown date"}
                </span>
                <div className="flex items-center gap-1" style={{ color: "var(--accent)" }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <span className="text-xs font-medium">{movie.vote_average.toFixed(1)}</span>
                </div>
            </div>
        </div>
    );
}

function SkeletonCard() {
    return (
        <div
            className="rounded-2xl border p-5 flex flex-col gap-4"
            style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
            <div className="skeleton h-5 w-3/4" />
            <div className="skeleton h-3 w-1/4" />
            <div className="flex flex-col gap-2">
                <div className="skeleton h-3 w-full" />
                <div className="skeleton h-3 w-full" />
                <div className="skeleton h-3 w-2/3" />
            </div>
        </div>
    );
}

export default function Movies() {
    const params = useParams();
    const [result, setResults] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const query = decodeURIComponent(params.query as string);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                if (!query || typeof query !== "string") {
                    setError("No query provided.");
                    return;
                }
                const data = await movies(query);
                if (!data.results) {
                    setError("No results found.");
                } else {
                    setResults(data.results);
                }
            } catch {
                setError("Something went wrong. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [query]);

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

            {/* Header */}
            <div className="mb-8 animate-fade-up">
                <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)", fontFamily: "var(--font-display)" }}>
                    Search Results
                </p>
                <h1
                    className="leading-none"
                    style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(2rem, 6vw, 3.5rem)",
                        letterSpacing: "0.04em",
                        color: "var(--text-primary)",
                    }}
                >
                    &ldquo;<span style={{ color: "var(--accent)" }}>{query}</span>&rdquo;
                </h1>
                {!loading && !error && (
                    <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
                        {result.length} {result.length === 1 ? "title" : "titles"} found
                    </p>
                )}
            </div>

            {/* Error */}
            {error && (
                <div
                    className="rounded-2xl border p-6 text-center"
                    style={{ borderColor: "var(--danger)", background: "rgba(232,85,71,0.08)", color: "var(--danger)" }}
                >
                    <p className="font-medium">{error}</p>
                </div>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading
                    ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                    : result.map((movie, i) => (
                        <MovieCard key={movie.id} movie={movie} index={i} />
                    ))
                }
            </div>

            {/* Empty state */}
            {!loading && !error && result.length === 0 && (
                <div className="text-center py-20 animate-fade-up">
                    <div className="text-5xl mb-4">🎬</div>
                    <p className="text-lg font-medium mb-2" style={{ color: "var(--text-primary)" }}>No movies found</p>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                        Try a different title or check your spelling.
                    </p>
                </div>
            )}
        </div>
    );
}

