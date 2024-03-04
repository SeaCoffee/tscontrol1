import { createBrowserRouter, RouteObject } from 'react-router-dom';
import React from "react";

import MoviesListPage from "./pages/MoviesListPage";
import MoviesListGenrePage from "./pages/MoviesListGenrePage";
import {MainLayoutWithSearch} from "./components/hoc/hoc";
import {SearchResultsComponent} from "./components/SearchResultComponent/SerachResultComponent";
import {MovieDetailsPage} from "./pages/MovieDetailsPage";


export const router = createBrowserRouter([
    {
        path: '',
        element: <MainLayoutWithSearch />,
        children: [
            { index: true, element: <MoviesListPage /> },
            { path: 'search', element: <SearchResultsComponent /> },
            { path: 'movies', element: <MoviesListPage /> },
            { path: 'movie-details/:movieId', element: <MovieDetailsPage />, end: true },
            { path: 'genres', element: <MoviesListPage /> },
            { path: 'genres/:genreId', element: <MoviesListGenrePage /> },
        ] as RouteObject[]
    }
]);
export default router;
