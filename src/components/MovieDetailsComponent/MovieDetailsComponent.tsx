import React, { useEffect, useState } from 'react';

import {PosterPreview} from "../PosterPreview/PosterPreview";
import {StarsRating} from "../StarsRatingComponent/StarsRatingComponent";
import {GenreBadge} from "../GenreBeigeComponent/GenreBeigeComponent";
import { genresService, moviesService } from "../../services/axiosService";
import {Movie} from "../../services/axiosService";



interface MovieDetailsProps {
    genreDictionary: { [key: number]: string };
    movieId: string;
}

export const MovieDetails: React.FC<MovieDetailsProps> = ({ genreDictionary, movieId }) => {
    const [movie, setMovie] = useState<Movie | null>(null);

    useEffect(() => {
        console.log('Fetching movie details for ID:', movieId);
        moviesService.byId(Number(movieId))
            .then(({data}) => {
                console.log('Movie data:', data);
                setMovie(data);
            })
            .catch(error => {
                console.error("Error", error);
            });
    }, [movieId]);

    if (!movie) {
        return <div>Loading...</div>;
    }


    return (
        <div>
            <h2>{movie.title}</h2>
            <PosterPreview imageUrl={movie.poster_path} />
            <StarsRating rating={movie.vote_average} />
            <div>
                {movie.genre_ids && movie.genre_ids.map(genreId => (
                    <GenreBadge key={genreId} genreId={genreId} genreDictionary={genreDictionary} />
                ))}
            </div>
            <p>{movie.overview}</p>
            <div>
                <p>Year: {movie.release_date}</p>
                <p>Runtime: {movie.runtime} минут</p>
                <p>Budget: ${movie.budget}</p>
                <p>Revenue: ${movie.revenue}</p>
            </div>
        </div>
    );
};