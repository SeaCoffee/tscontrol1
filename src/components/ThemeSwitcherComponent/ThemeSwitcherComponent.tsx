import React from 'react';

import {useTheme, ThemeContext} from "../context/ThemeContext";
import {useContext} from "react";

export const ThemeSwitcher: React.FC = () => {
    console.log('Rendering theme switcher');

    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button onClick={toggleTheme}>
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
    </button>
);
};

