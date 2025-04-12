// app/[query]/page.tsx
"use client"

import type { Movie } from '@/tmdb';
import { NextResponse } from "next/server";
import {useParams} from "next/navigation";
import { movies } from "@/lib/helpfunc";
import {useState} from "react";
import {useEffect} from "react";
import Link from "next/link";



export default function Movies() {
    const params = useParams();
    const [result, setResults] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const query = params.query;
                if (!query || typeof query !== "string") {
                    return NextResponse.json({error: "No query provided"}, {status:400});
                }

                const data = await movies(query);

                if (!data.results) {
                    return NextResponse.json({error: "No results found"}, {status: 500});
                } else {
                    setResults(data.results);
                }


            } catch (err) {
                return NextResponse.json({error: "Response from server failed with ", err}, {status: 500});
            }
        };

        fetchData();
    }, [params?.query]);



    return (
        <div className="flex flex-col items-center p-4">
            <h1 className="text-2xl font-bold mb-1 mt-3">Movie Results</h1>
            <div className="mt-3 grid grid-cols-2 gap-2 p-3">
                {result.map((movie) => (
                    <div key={movie.id}
                         className="flex flex-col rounded-lg bg-black shadow-sm max-w-96 p-8 my-6 border border-slate-200">
                        <h2 className="mb-2 text-slate-100 text-xl font-semibold">{movie.title}</h2>
                        <p className="mb-2 text-slate-300 leading-normal font-light">{movie.overview}</p>
                        <p className="text-slate-300 leading-normal font-light text-sm">Release Date: {movie.release_date}</p>
                        <p className="text-slate-300 leading-normal font-light text-sm">Score: {movie.vote_average}</p>
                    </div>
                ))}
            </div>
            <Link href={`../`}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Back</Link>
        </div>
    );
}
