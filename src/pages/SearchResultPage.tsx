import {MoviesListCard} from "../components/MovieListCardComponent/MovieListCardComponent";
import {usePageQuery} from "../services/pagination";


import {Movie} from "../services/axiosService";

interface SearchResultsPageProps {
    searchTerm: string;
    movies: Movie[];
    genreDictionary: { [key: number]: string };
    isLoading: boolean;
}

export const SearchResultsPage: React.FC<SearchResultsPageProps> = ({ searchTerm, movies, genreDictionary, isLoading }) => {
    const { page, prevPage, nextPage } = usePageQuery();

    return (
        <div>
            <h2>Search Results for "{searchTerm}"</h2>
            {isLoading ? (
                <div className="loader">Loading...</div>
            ) : (
                <>
                    <div className="movies-container">
                        {movies.map((movie: Movie) => (
                            <MoviesListCard key={movie.id} movie={movie} genreDictionary={genreDictionary} />
                        ))}
                    </div>
                    <div className="pagination-controls">
                        <button onClick={prevPage}>Previous</button>
                        <span>Page {page}</span>
                        <button onClick={nextPage}>Next</button>
                    </div>
                </>
            )}
        </div>
    );
};
