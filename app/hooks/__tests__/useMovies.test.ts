import { renderHook, act, waitFor } from '@testing-library/react';
import { Movie, MovieDetails } from '@/app/types';
import { apiRequest } from '../../utils/api';
import { useMovies } from '../useMovies';

jest.mock('../../utils/api', () => ({
    apiRequest: jest.fn(),
    handleApiError: jest.fn(() => null),
}));

describe('useMovies Hook', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should search and set movies correctly', async () => {
        const mockMovies: Movie[] = [
            { imdbID: '1', Title: 'Inception', Year: '2010', Poster: 'N/A' },
            { imdbID: '2', Title: 'Interstellar', Year: '2014', Poster: 'N/A' },
        ];
        (apiRequest as jest.Mock).mockResolvedValueOnce({ data: mockMovies });

        const { result } = renderHook(() => useMovies());

        act(() => {
            result.current.searchMovies('Inception');
        });

        await waitFor(() => {
            expect(result.current.movies).toEqual(mockMovies);
            expect(result.current.loading).toBe(false);
            expect(result.current.error).toBe(null);
        });
    });

    it('should fetch and set movie details correctly', async () => {
        const mockMovieDetails: MovieDetails = {
            imdbID: '1',
            Title: 'Inception',
            Year: '2010',
            Poster: 'N/A',
            Rated: 'PG-13',
            Released: '2010-07-16',
            Runtime: '148 min',
            Genre: 'Action, Adventure, Sci-Fi',
            Director: 'Christopher Nolan',
            Writer: 'Christopher Nolan',
            Actors: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page',
            Plot: 'A thief who steals corporate secrets through the use of dream-sharing technology...',
            Awards: 'Oscar-winning',
            Ratings: [{ Source: 'Internet Movie Database', Value: '8.8/10' }],
            BoxOffice: '$829.9 million',
        };
        (apiRequest as jest.Mock).mockResolvedValueOnce({ data: mockMovieDetails });

        const { result } = renderHook(() => useMovies());

        act(() => {
            result.current.fetchMovieDetails('1');
        });

        await waitFor(() => {
            expect(result.current.movie).toEqual(mockMovieDetails);
            expect(result.current.loading).toBe(false);
            expect(result.current.error).toBe(null);
        });
    });
});
