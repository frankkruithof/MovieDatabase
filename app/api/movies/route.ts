import { NextRequest, NextResponse } from "next/server";
import { Movie, ApiResponse } from "@/app/types";

// TODO create util function for api call to use in both this route and the detail route
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');
    const page = searchParams.get('page') || 1;
    const apiKey = process.env.OMDB_API_KEY;

    if (!apiKey) {
        const response: ApiResponse<Movie[]> = { data: [], error: "API key not configured" };
        return NextResponse.json(response, { status: 500 });
    }

    if (!query) {
        const response: ApiResponse<Movie[]> = { data: [], error: "No search paramater found" };
        return NextResponse.json(response);
    }

    try {
        const res = await fetch(`https://www.omdbapi.com/?s=${query}&page=${page}&apikey=${apiKey}&type=movie`)

        if (!res.ok) {
            throw new Error(`Api responded with status ${res.status}`);
        }

        const data = await res.json();

        if (data.Response === "True") {
            const movies: Movie[] = data.Search.map((movie: Movie) => ({
                imdbID: movie.imdbID,
                Title: movie.Title,
                Year: movie.Year,
                Poster: movie.Poster,
            }))
            const response: ApiResponse<Movie[]> = { data: movies }
            return NextResponse.json(response);
        } else {
            const response: ApiResponse<Movie[]> = { data: [], error: (data.Error) || "Unknown error" };
            return NextResponse.json(response);
        }
    } catch (err) {
        const response: ApiResponse<Movie[]> = { data: [], error: (err as Error).message || "Failed to fetch movies" };
        return NextResponse.json(response);
    }
}
