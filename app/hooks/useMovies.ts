
import { useState } from "react";
import { Movie, MovieDetails } from "@/app/types";
import { apiRequest, handleApiError } from "../utils/api";

interface MovieApiResult {
    movies: Movie[];
    movie: MovieDetails | null;
    error: string | null;
    loading: boolean;
    loadingMore: boolean;
    searchMovies: (query: string) => Promise<void>;
    loadMoreMovies: () => Promise<void>
    fetchMovieDetails: (id: string) => Promise<void>;
}

export const useMovies = (): MovieApiResult => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [query, setQuery] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false)
    const [loadingMore, setLoadingMore] = useState<boolean>(false);

    const fetchData = async <T>(url: string, onSuccess: (data: T) => void, isLoadMore: boolean = false) => {
        isLoadMore ? setLoadingMore(true) : setLoading(true);
        setError(null);

        try {
            const data = await apiRequest<T>(url);
            const apiError = handleApiError(data, isLoadMore);
            if (apiError) {
                setError(apiError);
                return;
            }

            onSuccess(data.data as T);

        } catch (err) {
            setError((err as Error).message);
        } finally {
            isLoadMore ? setLoadingMore(false) : setLoading(false);
        }
    }

    const searchMovies = async (query: string) => {
        setQuery(query);
        setCurrentPage(1);
        const url = `/api/movies?query=${encodeURIComponent(query)}`;
        await fetchData<Movie[]>(url, (data) => setMovies(data));
    }

    const loadMoreMovies = async () => {
        const nextPage = currentPage + 1;
        const url = `/api/movies?query=${encodeURIComponent(query)}&page=${nextPage}`
        await fetchData<Movie[]>(url, (moreMovies) => {
            if (moreMovies.length > 0) {
                setMovies((prevMovies) => [...prevMovies, ...moreMovies]);
                setCurrentPage(nextPage);
            }
        }, true) // Pass true to indicate loading more movies
    }

    const fetchMovieDetails = async (id: string) => {
        const url = `/api/movies/${id}`;
        await fetchData<MovieDetails>(url, (data) => setMovie(data));
    }

    return { movies, movie, error, loading, loadingMore, searchMovies, fetchMovieDetails, loadMoreMovies }
}
