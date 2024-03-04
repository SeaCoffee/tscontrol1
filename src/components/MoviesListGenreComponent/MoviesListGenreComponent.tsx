import React, { useEffect, useState } from 'react';

import {MoviesListCard} from "../MovieListCardComponent/MovieListCardComponent";
import {genresService} from "../../services/axiosService";
import {GenreSelector} from "../GenresSelectorComponent/GenresSelectorComponent";
import {usePageQuery} from "../../services/pagination";
import {moviesService} from "../../services/axiosService";
import {Movie, Genre} from "../../services/axiosService";



export const MovieGenreList: React.FC = () => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<string>('');
    const [movies, setMovies] = useState<Movie[]>([]);
    const [genreDictionary, setGenreDictionary] = useState<{ [key: string]: string }>({});
    const { page, prevPage, nextPage } = usePageQuery();
    const handleGenreSelect = (genreId: number) => {
        setSelectedGenre(genreId.toString());
    };

    useEffect(() => {
        genresService.getAll().then(({ data }) => {
            setGenres(data.genres);
            const dictionary: { [key: string]: string } = {};
            data.genres.forEach((genre: Genre) => {
                dictionary[genre.id.toString()] = genre.name;
            });
            setGenreDictionary(dictionary);
        }).catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const pageNumber = page ? parseInt(page, 10) : 1;
                const response = !selectedGenre
                    ? await moviesService.getAll(pageNumber)
                    : await genresService.getMoviesByGenre(parseInt(selectedGenre, 10), pageNumber);
                setMovies(response.data.results);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchMovies();
    }, [selectedGenre, page]);

    return (
        <div>
            <GenreSelector genres={genres} onGenreSelect={handleGenreSelect} />
            <div className="movies-container">
                {movies.map((movie) => (
                    <MoviesListCard key={movie.id} movie={movie} genreDictionary={genreDictionary} />
                ))}
            </div>
            <div>
                <button onClick={prevPage}>Previous</button>
                <span>Page {page}</span>
                <button onClick={nextPage}>Next</button>
            </div>
        </div>
    );
};
