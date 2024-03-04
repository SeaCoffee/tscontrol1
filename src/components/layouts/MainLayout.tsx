import React from 'react';
import { Outlet } from 'react-router-dom';
import {useNavigate} from "react-router-dom";

import {Header} from "../HeaderComponent/HeaderComponent";
import {useTheme} from "../context/ThemeContext";

interface MainLayoutProps {
    onSearch: (searchTerm: string) => void;
    onGenreSelect: (genreId: number) => void;
    searchTerm: string;
    movies: any[];
    genres: { [key: string]: string };
    children?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, onSearch, onGenreSelect, searchTerm, movies, genres }) => {
    const navigate = useNavigate();
    const { theme } = useTheme();

    const layoutStyle = {
        backgroundColor: theme === 'light' ? 'white' : 'black',
        color: theme === 'light' ? 'black' : 'white',
    };


    return (
        <div>
            <Header onSearch={onSearch} onGenreSelect={onGenreSelect} />
            <Outlet />
        </div>
    );
};
