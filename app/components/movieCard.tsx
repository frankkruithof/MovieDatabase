import Link from "next/link";
import { Card, Image, Badge, Box, Heading } from "@chakra-ui/react";
import { Movie } from "@/app/types";

interface MovieCardProps {
    movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
    return (
        <Link href={`/movie/${movie.imdbID}`} passHref>
            <Card as="a" shadow="md" p="2" height="100%" _hover={{shadow:"lg"}} transition="all .3s ease-in-out">
                <Box aspectRatio={2 / 3} overflow="hidden" position="relative">
                    <Image
                        src={movie.Poster}
                        alt={movie.Title}
                        borderRadius="lg"
                        mb="2"
                        objectFit="cover"
                        height="100%"
                        width="100%"
                    />
                    <Badge
                        position="absolute"
                        top="2"
                        right="2"
                        colorScheme="green"
                        borderRadius="full"
                        px="2"
                        shadow="md"
                    >
                        {movie.Year}
                    </Badge>
                </Box>
                <Heading title={movie.Title} size="md" mt="2" noOfLines={3} pb="1">
                    {movie.Title}
                </Heading>
            </Card>
        </Link>
    );
};
