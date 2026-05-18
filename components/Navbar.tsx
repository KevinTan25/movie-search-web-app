"use client"
 
import Link from "next/link";
import { usePathname } from "next/navigation";
 
export default function Navbar() {
    const pathname = usePathname();
    const isHome = pathname === "/";
 
    return (
        <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b border-cyan-200"
            style={{ background: "#cff4f4" }}>
            <Link href="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity duration-200">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a5fb4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="3" />
                    <line x1="12" y1="2" x2="12" y2="5" />
                    <line x1="12" y1="19" x2="12" y2="22" />
                    <line x1="2" y1="12" x2="5" y2="12" />
                    <line x1="19" y1="12" x2="22" y2="12" />
                </svg>
                <span className="text-lg font-bold tracking-widest" style={{ fontFamily: "monospace", color: "#1a3a5c" }}>
                    CINESEARCH
                </span>
            </Link>
 
            {!isHome && (
                <Link
                    href="/"
                    className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border border-blue-300 text-blue-700 hover:bg-blue-100 transition-all duration-150"
                    style={{ fontFamily: "monospace" }}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 5l-7 7 7 7" />
                    </svg>
                    New Search
                </Link>
            )}
        </nav>
    );
}
