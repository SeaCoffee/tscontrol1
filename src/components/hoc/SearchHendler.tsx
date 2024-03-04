import { useNavigate } from 'react-router-dom';
import React, { ReactElement } from 'react';


interface SearchHandlerProps {
    children: (props: { onSearch: (searchTerm: string) => void }) => ReactElement | null;
}

export const SearchHandler: React.FC<SearchHandlerProps> = ({ children }) => {
    const navigate = useNavigate();

    const handleSearch = (searchTerm: string) => {
        navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    };


    const childElement = children({ onSearch: handleSearch });
    return childElement || null;
};