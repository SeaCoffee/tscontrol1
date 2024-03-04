import React from 'react';
import { useNavigate } from 'react-router-dom';

import {PosterPreview} from "../PosterPreview/PosterPreview";
import {StarsRating} from "../StarsRatingComponent/StarsRatingComponent";
import {GenreBadge} from "../GenreBeigeComponent/GenreBeigeComponent";
import {GenreDictionary} from "../GenreListComponent/GenreListComponent";
import {Movie} from "../../services/axiosService";

interface MoviesListCardProps {
    movie: Movie;
    genreDictionary: GenreDictionary;
    movieClick?: (movieId: number) => void;
}

export const MoviesListCard: React.FC<MoviesListCardProps> = ({ movie, genreDictionary,  movieClick }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/movie-details/${movie.id}`, { replace: true });
    };

    return (
        <div onClick={handleClick} style={{ width: '24%', margin: '0.5%', cursor: 'pointer', boxSizing: 'border-box' }}>
            <PosterPreview imageUrl={movie.poster_path} />
            <div>
                <h3>{movie.title}</h3>
                <StarsRating rating={movie.vote_average} />
                <div>
                    {movie.genre_ids ? movie.genre_ids.map((genreId: number) => (
                        <GenreBadge key={genreId} genreId={genreId} genreDictionary={genreDictionary} />
                    )) : <p>Not found</p>}
                </div>
                <p>{movie.overview}</p>
            </div>
        </div>
    );
};

