import React from 'react';

import {MoviesListCard} from "../MovieListCardComponent/MovieListCardComponent";
import {Movie} from "../../services/axiosService";

export interface GenreListComponentProps {
    genreId?: number;
    movies: Movie[];
    genreDictionary: { [key: number]: string };
}


export interface GenreDictionary {
    [key: string]: string;
}



export const GenreListComponent: React.FC<GenreListComponentProps> = ({ movies, genreDictionary }) => {
    console.log('Rendering GenreListComponent with movies:', movies);
    console.log('Movies to render:', movies);

    return (
        <div>
            {movies.map(movie => {
                console.log('Rendering movie:', movie.title);
                return <MoviesListCard key={movie.id} movie={movie} genreDictionary={genreDictionary} />;
            })}
        </div>
    );
};
