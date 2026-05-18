import React from "react";
import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
    title: "CineSearch",
    description: "Search millions of movies instantly",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="min-h-full" style={{ background: "#cff4f4" }}>
            <body className="min-h-screen flex flex-col" style={{ background: "#cff4f4" }}>
                <Navbar />
                <main className="flex-1">
                    {children}
                </main>
                <footer className="py-6 text-center text-xs border-t border-cyan-200" style={{ color: "#5a8aac", fontFamily: "monospace" }}>
                    CINESEARCH · Powered by TMDB
                </footer>
            </body>
        </html>
    );
}