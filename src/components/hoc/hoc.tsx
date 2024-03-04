import React, { useState, useEffect, ComponentType } from 'react';
import { useNavigate } from 'react-router-dom';

import {MainLayout} from "../layouts/MainLayout";
import {moviesService, searchService, genresService} from "../../services/axiosService";

interface WithSearchProps {
    onSearch: (query: string) => void;
    onGenreSelect: (genreId: number) => void;
    searchTerm: string;
    movies: any[];
    genres: { [key: string]: string };
}


export function WithSearch<T extends WithSearchProps>(Component: ComponentType<T>) {
    console.log('Rendering WithSearch HOC');
    return function WrappedComponent(props: Omit<T, keyof WithSearchProps>) {
        const navigate = useNavigate(); // Добавьте эту строку
        const [searchTerm, setSearchTerm] = useState<string>('');
        const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
        const [movies, setMovies] = useState<any[]>([]);
        const [genres, setGenres] = useState<{ [key: string]: string }>({});

        useEffect(() => {
            genresService.getAll().then(({ data }) => {
                const genresDict = data.genres.reduce((acc: { [key: string]: string }, genre) => {
                    acc[genre.id.toString()] = genre.name;
                    return acc;
                }, {});
                setGenres(genresDict);
            }).catch(error => {
                console.error('Error loading genres:', error);
            });
        }, []);

        const handleGenreSelect = (genreId: number) => {
            console.log('Selected genre:', genreId);
            setSelectedGenre(genreId);
        };

        const handleSearch = async (query: string) => {
            console.log('Search query:', query);
            setSearchTerm(query);
            if (query.length > 0) {
                try {
                    const response = await searchService.getAll(query);
                    console.log('Search results:', response.data.results);
                    setMovies(response.data.results);
                } catch (error) {
                    console.error('Search error:', error);
                }
            } else {
                try {
                    const response = await moviesService.getAll();
                    console.log('Movies results:', response.data.results);
                    setMovies(response.data.results);
                } catch (error) {
                    console.error('Movies error:', error);
                }
            }
        };

        useEffect(() => {
            const fetchMovies = async () => {
                let response;
                if (searchTerm) {
                    response = await searchService.getAll(searchTerm);
                } else if (selectedGenre !== null) {
                    response = await genresService.getMoviesByGenre(selectedGenre);
                } else {
                    response = await moviesService.getAll();
                }

                if (response && response.data && response.data.results) {
                    setMovies(response.data.results);
                }
            };

            fetchMovies().catch(console.error);
        }, [searchTerm, selectedGenre]);


        return (
                <Component
                    {...props as T}
                    onSearch={handleSearch}
                    onGenreSelect={handleGenreSelect}
                    searchTerm={searchTerm}
                    movies={movies}
                    genres={genres}
                />
        );
    }
}


export const MainLayoutWithSearch = WithSearch(MainLayout);
