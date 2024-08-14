export interface Movie {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
}

export interface Rating {
    Source: string;
    Value: string;
}

export interface MovieDetails extends Movie {
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Awards: string;
    Ratings: Rating[];
    BoxOffice: string;
}

export interface ApiResponse<T> {
    data?: T;
    error?: string;
}
