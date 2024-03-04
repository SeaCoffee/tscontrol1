import {useParams} from "react-router-dom";

import {MovieDetails} from "../components/MovieDetailsComponent/MovieDetailsComponent";


export const MovieDetailsPage: React.FC = () => {
    const { movieId } = useParams<{ movieId?: string }>();
    const genreDictionary = {};

    if (!movieId) {
        return <div>Movie ID is not specified.</div>;
    }
    return <MovieDetails movieId={movieId} genreDictionary={genreDictionary} />;
};
