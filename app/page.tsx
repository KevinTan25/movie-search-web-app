"use client"

import { useState } from "react";
import Link from "next/link";

export default function Home() {
    const [query, setQuery] = useState("");
    return (
        <div className="flex flex-col items-center p-6 gap-5">
            <h1 className="text-4xl font-bold dark:text-white">Search Movies</h1>
            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Movie Search"
                className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full max-w-lg appearance-none leading-normal"
            />

            <Link href={`/${query}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Search</Link>
        </div>
    );
}
