import React from 'react';
import {useEffect, useState} from "react";


import {UserInfo} from "../UserInfoComponent/UserInfoComponent";
import {ThemeSwitcher} from "../ThemeSwitcherComponent/ThemeSwitcherComponent";
import {GenreSelector} from "../GenresSelectorComponent/GenresSelectorComponent";
import {SearchBar} from "../SearchBarComponent/SearchBarComponent";
import {genresService} from "../../services/axiosService";
import {useTheme} from "../context/ThemeContext";
import {Genre} from "../../services/axiosService";

interface HeaderProps {
    onSearch: (searchQuery: string) => void;
    onGenreSelect: (genreId: number) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch, onGenreSelect }) => {

    const [genres, setGenres] = useState<Genre[]>([]);
    const { theme } = useTheme();

    const headerStyle = {
        backgroundColor: theme === 'light' ? 'white' : 'black',
        color: theme === 'light' ? 'black' : 'white',
    };

    useEffect(() => {
        genresService.getAll().then(({ data }) => {
            setGenres(data.genres);
        }).catch(error => {
            console.error('Error loading genres:', error);
        });
    }, []);


    return (
        <header className="header" style={headerStyle}>
        <h1>MovieDB</h1>
        <SearchBar onSearch={onSearch} />
    <GenreSelector genres={genres} onGenreSelect={onGenreSelect} />
    <div>
    <UserInfo />
    <ThemeSwitcher />
    </div>
    </header>
);
};
