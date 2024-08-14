import { ApiResponse, MovieDetails } from '@/app/types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const apiKey = process.env.OMDB_API_KEY;

    if (!apiKey) {
        const response: ApiResponse<MovieDetails[]> = { data: [], error: "API key not configured" };
        return NextResponse.json(response, { status: 500 });
    }

    try {
        const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`);
        const data = await res.json();

        if (data.Response === "True") {
            const movieDetails: MovieDetails = {
                imdbID: data.imdbID,
                Title: data.Title,
                Year: data.Year,
                Poster: data.Poster,
                Rated: data.imdbID,
                Released: data.Released,
                Runtime: data.Runtime,
                Genre: data.Genre,
                Director: data.Director,
                Writer: data.Writer,
                Actors: data.Actors,
                Plot: data.Plot,
                Awards: data.Awards,
                Ratings: data.Ratings,
                BoxOffice: data.BoxOffice,
            }
            return NextResponse.json({ data: movieDetails });
        } else {
            return NextResponse.json({ error: data.Error || "Unknown error" });
        }
    } catch (err) {
        return NextResponse.json({ error: "Failed to fetch movie details" });
    }
}
