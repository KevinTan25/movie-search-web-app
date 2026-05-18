"use client"
 
import { useState } from "react";
import { useRouter } from "next/navigation";
import { movies } from "@/lib/helpfunc";
import type { Movie } from "@/tmdb";
 
export default function Home() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);
    const router = useRouter();
 
    const handleSearch = async () => {
        if (!query.trim()) return;
        setLoading(true);
        setSearched(true);
        try {
            const data = await movies(query.trim());
            setResults(data.results || []);
        } catch {
            setResults([]);
        } finally {
            setLoading(false);
        }
    };
 
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleSearch();
    };
 
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16"
            style={{ background: "#cff4f4" }}>
 
            {/* Title */}
            <h1 className="text-5xl font-bold mb-3 tracking-tight" style={{ fontFamily: "monospace", color: "#1a3a5c" }}>
                CineSearch
            </h1>
            <p className="mb-10 text-sm" style={{ fontFamily: "monospace", color: "#3a6a8c" }}>
                Search for movies instantly. Powered by TMDB.
            </p>
 
            {/* Card */}
            <div className="w-full max-w-2xl rounded-2xl p-8 shadow-lg" style={{ background: "#4a9eed" }}>
                <h2 className="text-2xl font-bold mb-1 text-white" style={{ fontFamily: "monospace" }}>
                    Search a Movie
                </h2>
                <p className="text-sm mb-6" style={{ color: "#dbeeff", fontFamily: "monospace" }}>
                    Enter a title to find ratings, overviews, and release dates
                </p>
 
                {/* Input */}
                <label className="block text-white font-bold mb-2 text-sm" style={{ fontFamily: "monospace" }}>
                    MOVIE TITLE
                </label>
                <div className="flex gap-3 mb-2">
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="e.g. Inception, Dune, Parasite…"
                        className="flex-1 rounded-xl px-4 py-3 text-sm outline-none border-2 border-transparent focus:border-blue-300"
                        style={{
                            background: "#f0f9ff",
                            color: "#1a3a5c",
                            fontFamily: "monospace",
                        }}
                    />
                    <button
                        onClick={handleSearch}
                        disabled={!query.trim() || loading}
                        className="px-6 py-3 rounded-xl font-bold text-sm text-white transition-all disabled:opacity-50"
                        style={{ background: "#1a5fb4", fontFamily: "monospace" }}
                        onMouseEnter={e => (e.currentTarget.style.background = "#154fa0")}
                        onMouseLeave={e => (e.currentTarget.style.background = "#1a5fb4")}
                    >
                        {loading ? "..." : "Search"}
                    </button>
                </div>
 
                {/* Quick suggestions */}
                <div className="flex flex-wrap gap-2 mt-4">
                    {["Inception", "Interstellar", "Parasite", "Dune", "The Batman"].map((title) => (
                        <button
                            key={title}
                            onClick={() => { setQuery(title); }}
                            className="px-3 py-1 rounded-lg text-xs border border-white/30 text-white/80 hover:bg-white/20 transition-all"
                            style={{ fontFamily: "monospace" }}
                        >
                            {title}
                        </button>
                    ))}
                </div>
 
                {/* Results dropdown */}
                {searched && (
                    <div className="mt-6 rounded-xl overflow-hidden border border-white/20" style={{ background: "#f0f9ff" }}>
                        {loading ? (
                            <div className="p-6 text-center text-sm" style={{ color: "#3a6a8c", fontFamily: "monospace" }}>
                                Searching…
                            </div>
                        ) : results.length === 0 ? (
                            <div className="p-6 text-center text-sm" style={{ color: "#3a6a8c", fontFamily: "monospace" }}>
                                No results found for &quot;{query}&quot;
                            </div>
                        ) : (
                            <div className="divide-y divide-blue-100 max-h-96 overflow-y-auto">
                                {results.map((movie) => (
                                    <button
                                        key={movie.id}
                                        onClick={() => router.push(`/${encodeURIComponent(movie.title)}`)}
                                        className="w-full text-left px-5 py-4 hover:bg-blue-50 transition-colors flex items-start justify-between gap-4 group"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-sm truncate group-hover:text-blue-700 transition-colors"
                                                style={{ color: "#1a3a5c", fontFamily: "monospace" }}>
                                                {movie.title}
                                            </p>
                                            <p className="text-xs mt-0.5 truncate"
                                                style={{ color: "#5a8aac", fontFamily: "monospace" }}>
                                                {movie.release_date ? movie.release_date.slice(0, 4) : "Unknown year"}
                                                {movie.overview ? ` · ${movie.overview.slice(0, 60)}…` : ""}
                                            </p>
                                        </div>
                                        <div className="flex-shrink-0 flex items-center gap-1 mt-0.5">
                                            <svg width="11" height="11" viewBox="0 0 24 24" fill="#f59e0b">
                                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                            </svg>
                                            <span className="text-xs font-semibold" style={{ color: "#1a3a5c", fontFamily: "monospace" }}>
                                                {movie.vote_average.toFixed(1)}
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}