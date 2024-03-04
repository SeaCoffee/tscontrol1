import React, { useState, useEffect } from 'react';

import {genresService} from "../../services/axiosService";
import {GenreListComponent} from "../GenreListComponent/GenreListComponent";
import {usePageQuery} from "../../services/pagination";
import {Movie, Genre} from "../../services/axiosService";


interface MovieGenreProps {
    genreId: number;
}

export const MovieGenre: React.FC<MovieGenreProps> = ({ genreId }) => {

    const {page, prevPage, nextPage} = usePageQuery();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [genreDictionary, setGenreDictionary] = useState<{ [key: number]: string }>({});

    useEffect(() => {
        genresService.getAll().then(({data}) => {
            const dictionary: { [key: number]: string } = {};
            data.genres.forEach((genre: Genre) => {
                dictionary[genre.id] = genre.name;
            });
            setGenreDictionary(dictionary);
            console.log(dictionary, 'from movie genre')
        }).catch(error => {
            console.error('Error', error);
        });
    }, []);

    useEffect(() => {
        const pageNumber = page ? parseInt(page, 10) : 1;
        if (genreId) {
            genresService.getMoviesByGenre(genreId, pageNumber).then(({data}) => {
                setMovies(data.results);
                console.log('Movies from API:', data.results);
            }).catch(error => {
                console.error('Error', error);
            });
        }
    }, [genreId, page]);


    const paginationControls = (
        <div>
            <button onClick={prevPage}>Previous</button>
            <span>Page {page}</span>
            <button onClick={nextPage}>Next</button>
        </div>
    );

    console.log('Movies to render in GenreListComponent:', movies);
    return (
        <div>
            <GenreListComponent genreId={genreId} movies={movies} genreDictionary={genreDictionary}/>
            {paginationControls}
        </div>
    );
}

