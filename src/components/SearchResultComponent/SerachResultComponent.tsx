import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";

import {searchService, genresService} from "../../services/axiosService";
import {SearchResultsPage} from "../../pages/SearchResultPage";
import {usePageQuery} from "../../services/pagination";
import {Movie} from "../../services/axiosService";
import {Genre} from "../../services/axiosService";

type GenreDictionary = { [id: number]: string };

export const SearchResultsComponent: React.FC = () => {
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('query');
    const [movies, setMovies] = useState<Movie[]>([]);
    const [genreDictionary, setGenreDictionary] = useState<GenreDictionary>({});
    const [isLoading, setIsLoading] = useState(false);
    const { page, prevPage, nextPage } = usePageQuery();

    useEffect(() => {
        if (searchTerm) {
            setIsLoading(true);
            const pageNumber = Number(page) || 1;
            Promise.all([
                searchService.getAll(searchTerm, pageNumber),
                genresService.getAll()
            ]).then(([searchResults, genreResults]) => {
                setMovies(searchResults.data.results);

                if (genreResults.data && genreResults.data.genres) {
                    const dictionary = genreResults.data.genres.reduce((acc, genre) => {
                        acc[genre.id] = genre.name;
                        return acc;
                    }, {} as GenreDictionary);
                    setGenreDictionary(dictionary);
                }
            }).finally(() => {
                setIsLoading(false);
            });
        }
    }, [searchTerm, page]);


    return (
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
            <SearchResultsPage  searchTerm={searchTerm ?? ''} movies={movies} genreDictionary={genreDictionary}
                                isLoading={isLoading}/>
            <div/>
        </div>
    );
};