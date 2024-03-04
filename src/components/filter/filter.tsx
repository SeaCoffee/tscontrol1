import {useState, useEffect} from "react";

import {GenreSelector} from "../GenresSelectorComponent/GenresSelectorComponent";
import {SearchBar} from "../SearchBarComponent/SearchBarComponent";
import {MoviesListComponent} from "../MoviesListComponent/MoviesListComponent";
import {genresService} from "../../services/axiosService";
import { useNavigate } from 'react-router-dom';

interface Genre {
    id: number;
    name: string;
}


const MoviesFilter: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [genres, setGenres] = useState<Genre[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        genresService.getAll().then(({ data }) => {
            setGenres(data.genres);
        }).catch(error => {
            console.error('Error loading genres:', error);
        });
    }, []);

    const handleGenreSelect = (genreId: number) => {
        console.log('navigate from filter')
        navigate(`/genres/${genreId}`);
    };

    return (
        <div>
            <SearchBar onSearch={setSearchTerm} />
            <GenreSelector genres={genres} onGenreSelect={handleGenreSelect} />
            <MoviesListComponent searchTerm={searchTerm} />
        </div>
    );
};


export default MoviesFilter;

