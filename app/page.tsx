"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Center, Heading } from "@chakra-ui/react";
import { useMovies } from "./hooks/useMovies";
import { SearchBar } from "./components/searchBar";
import { MovieResults } from "./components/movieResults";
import { Loader } from "./components/Loader";
import { AlertMessage } from "./components/AlertMessage";


function HomePage() {
    const { movies, error, loading, loadingMore, searchMovies, loadMoreMovies } = useMovies();
    const [searchComplete, setSearchComplete] = useState<boolean>(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentQuery = searchParams.get("q") || "";

    useEffect(() => {
        if (currentQuery) {
            setSearchComplete(false);
            searchMovies(currentQuery).finally(() => setSearchComplete(true));
        }
    }, [currentQuery])

    const handleSearch = useCallback((query: string) => {
        router.push(`/?q=${encodeURIComponent(query)}`)
    }, [router])

    const renderLoading = () => loading && <Loader />;
    
    const renderError = () => error && <AlertMessage message={error} type="error" />;

    const renderNoMoviesFound = () => {
        if (!loading && searchComplete && !error && movies.length === 0) {
            return <AlertMessage message="No movies found." type="warning" />;
        }
        return null;
    };

    const renderMovies = () => {
        if (!loading && !error && movies.length > 0) {
            return (
                <>
                    <MovieResults movies={movies} />
                    <Center>
                        <Button mt="5" onClick={loadMoreMovies} isLoading={loadingMore} disabled={loading}>
                            Load More
                        </Button>
                    </Center>
                </>
            );
        }
        return null;
    };

    return (
        <>
            <Heading mb="5">Movie Database</Heading>
            <SearchBar onSearch={handleSearch} loading={loading} />
            {renderLoading()}
            {renderError()}
            {renderNoMoviesFound()}
            {renderMovies()}
        </>
    );
}

export default function Home() {
    return (
        <Suspense fallback={<Loader />}>
            <HomePage />
        </Suspense>
    );
}
