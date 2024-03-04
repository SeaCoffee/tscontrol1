import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import {moviesService, genresService } from "../../services/axiosService";
import {MoviesListCard} from "../MovieListCardComponent/MovieListCardComponent";
import {usePageQuery} from "../../services/pagination";
import {GenreDictionary} from "../GenreListComponent/GenreListComponent";
import {Movie, Genre} from "../../services/axiosService";
import {useTheme} from "../context/ThemeContext";


interface MoviesListComponentProps {
    selectedGenre?: number | null;
    searchTerm?: string;
}


export const MoviesListComponent: React.FC<MoviesListComponentProps> = ({ selectedGenre, searchTerm }) => {
    const { page: queryPage, prevPage, nextPage } = usePageQuery();
    const page = queryPage ? parseInt(queryPage, 10) : 1;
    const navigate = useNavigate();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
    const [genres, setGenres] = useState<GenreDictionary>({} as GenreDictionary);
    const { theme } = useTheme();

    const moviesListStyle = {
        backgroundColor: theme === 'light' ? 'white' : 'black',
        color: theme === 'light' ? 'black' : 'white',
    };

    useEffect(() => {
        moviesService.getAll(page).then(({ data }) => {
            setMovies(data.results);
            setFilteredMovies(data.results);
        });

        genresService.getAll().then(({ data }) => {
            if (data && data.genres) {
                const genresDict = data.genres.reduce((acc: GenreDictionary, genre: Genre) => {
                    acc[genre.id] = genre.name;
                    return acc;
                }, {} as GenreDictionary);
                setGenres(genresDict);
            }
        });
    }, [page]);

    useEffect(() => {
        let filtered = movies;

        if (selectedGenre) {
            filtered = filtered.filter(movie => movie.genre_ids.includes(selectedGenre));
        }

        if (searchTerm) {
            filtered = filtered.filter(movie => movie.title.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        setFilteredMovies(filtered);
    }, [selectedGenre, searchTerm, movies]);

    const movieClick = (movieId: number) => {
        navigate(`/movies/${movieId}`);
    };

    return (
        <div style={moviesListStyle}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {filteredMovies.map((movie) => (
                    <MoviesListCard
                        key={movie.id}
                        movie={movie}
                        movieClick={movieClick}
                        genreDictionary={genres}
                    />
                ))}
            </div>
            <div>
                <button onClick={prevPage}>Previous page</button>
                <span>Current page {page}</span>
                <button onClick={nextPage}>Next page</button>
            </div>
        </div>
    );
};

