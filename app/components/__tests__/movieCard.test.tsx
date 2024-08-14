import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { MovieCard } from '../movieCard';
import { Movie } from '@/app/types';

const mockMovie: Movie = {
    imdbID: 'tt0120737',
    Title: 'The Lord of the Rings: The Fellowship of the Ring',
    Year: '2001',
    Poster: 'https://example.com/poster1.jpg',
};

describe('MovieCard Component', () => {
    it('displays the movie title correctly', () => {
        render(
            <ChakraProvider>
                <MovieCard movie={mockMovie} />
            </ChakraProvider>
        );

        expect(screen.getByText(mockMovie.Title)).toBeInTheDocument();
    });

    it('renders the correct movie link', () => {
        render(
            <ChakraProvider>
                <MovieCard movie={mockMovie} />
            </ChakraProvider>
        );

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', `/movie/${mockMovie.imdbID}`);
    });

    it('renders the movie poster image', () => {
        render(
            <ChakraProvider>
                <MovieCard movie={mockMovie} />
            </ChakraProvider>
        );

        const image = screen.getByAltText(mockMovie.Title);
        expect(image).toHaveAttribute('src', mockMovie.Poster);
    });
});
