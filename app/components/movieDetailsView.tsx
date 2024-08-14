"use client";

import { Box, Heading, Image, Text, Stack, Badge, StatNumber, StatLabel, Stat, StatGroup } from "@chakra-ui/react";
import type { MovieDetails, Rating } from '@/app/types';

interface MovieDetailsDisplayProps {
    movie: MovieDetails;
}

export const MovieDetailsDisplay = ({ movie }: MovieDetailsDisplayProps) => {
    return (

        <Stack direction={{ base: "column", md: "row" }} spacing={6}>
            <Image
                src={movie.Poster}
                alt={movie.Title}
                borderRadius="lg"
                objectFit="cover"
                height={{ base: "100%", sm: "100%" }}
                width={{ base: "100%", sm: "300px" }}
            />
            <Box>
                <Heading mb="2">{movie.Title}</Heading>
                <Stack direction="row">
                    <Badge colorScheme="teal" mb={4}>{movie.Year}</Badge>
                    <Badge colorScheme="green" mb={4}>{movie.Runtime}</Badge>
                </Stack>
                <Text mb={4}><strong>Genre:</strong> {movie.Genre}</Text>
                <Text mb={4}><strong>Director:</strong> {movie.Director}</Text>
                <Text mb={4}><strong>Writer:</strong> {movie.Writer}</Text>
                <Text mb={4}><strong>Plot:</strong> {movie.Plot}</Text>
                <Text mb={4}><strong>Actors:</strong> {movie.Actors}</Text>
                <Text mb={4}><strong>Awards:</strong> {movie.Awards}</Text>
                <Text><strong>Box office:</strong> {movie.BoxOffice}</Text>

                <StatGroup mt="5">
                    {movie.Ratings.map((rating: Rating) => (
                        <Stat key={rating.Source}>
                            <StatLabel>{rating.Source}</StatLabel>
                            <StatNumber>{rating.Value}</StatNumber>
                        </Stat>
                    ))}
                </StatGroup>
            </Box>
        </Stack>
    );
};
