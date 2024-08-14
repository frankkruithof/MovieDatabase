"use client";

import { Grid } from "@chakra-ui/react";
import { Movie } from "@/app/types";
import { MovieCard } from "./movieCard";

interface MovieResultsProps {
    movies: Movie[];
}

export const MovieResults = ({ movies }: MovieResultsProps) => {
    return (
        <Grid templateColumns={{ base: "1fr", md: "repeat(5, 1fr)" }} gap={6}>
            {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
            ))}
        </Grid>
    );
};
