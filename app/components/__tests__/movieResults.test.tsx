import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { Movie } from '@/app/types';
import { MovieResults } from '../movieResults';


const movies: Movie[] = [
    {
        imdbID: 'tt0120737',
        Title: 'The Lord of the Rings: The Fellowship of the Ring',
        Year: '2001',
        Poster: 'https://example.com/poster1.jpg',
    },
    {
        imdbID: 'tt0167261',
        Title: 'The Lord of the Rings: The Two Towers',
        Year: '2002',
        Poster: 'https://example.com/poster2.jpg',
    },
    {
        imdbID: 'tt0167260',
        Title: 'The Lord of the Rings: The Return of the King',
        Year: '2003',
        Poster: 'https://example.com/poster3.jpg',
    },
];

describe('MovieResults Component', () => {
    it('renders the correct number of movies', () => {
        render(
            <ChakraProvider>
                <MovieResults movies={movies} />
            </ChakraProvider>
        );
        const headings = screen.getAllByRole('heading', { level: 2 });
        expect(headings.length).toBe(movies.length);
    });

    it('displays the movie titles correctly', () => {
        render(
            <ChakraProvider>
                <MovieResults movies={movies} />
            </ChakraProvider>
        );

        movies.forEach((movie) => {
            expect(screen.getByText(movie.Title)).toBeInTheDocument();
        });
    });

    it('renders the correct movie links', () => {
        render(
            <ChakraProvider>
                <MovieResults movies={movies} />
            </ChakraProvider>
        );

        const links = screen.getAllByRole('link');
        links.forEach((link, index) => {
            expect(link).toHaveAttribute('href', `/movie/${movies[index].imdbID}`);
        });
    });

});
