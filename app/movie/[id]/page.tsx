"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons'
import type { MovieDetails } from '@/app/types';
import { MovieDetailsDisplay } from '@/app/components/movieDetailsView';
import { Loader } from '@/app/components/Loader';
import { AlertMessage } from '@/app/components/AlertMessage';
import { useMovies } from '@/app/hooks/useMovies';

interface MovieDetailsProps {
    params: {
        id: string;
    };
}

export default function MovieDetails({ params }: MovieDetailsProps) {
    const { movie, loading, error, fetchMovieDetails } = useMovies();
    const { id } = params;
    const router = useRouter();

    useEffect(() => {
        fetchMovieDetails(id);
    }, [id]);

    if (loading) return <Loader />;

    if (error) return <AlertMessage message={error} type="error" />;

    return movie && (
        <>
            <Button variant="link" mb="4" onClick={() => router.back()} colorScheme="teal">
                <ArrowBackIcon mr="2" />Back to Search
            </Button>
            <MovieDetailsDisplay movie={movie} />
        </>
    )
}