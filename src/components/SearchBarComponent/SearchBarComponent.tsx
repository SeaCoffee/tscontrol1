import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
    onSearch: (searchTerm: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        console.log('Search term:', event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Submitting search:', searchTerm);
        onSearch(searchTerm);
        navigate(`/search?query=${searchTerm}`);
        setSearchTerm('');
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <input
                className="search-input"
                type="text"
                placeholder="Search for movies..."
                value={searchTerm}
                onChange={handleChange}
            />
            <button className="search-button" type="submit">Search</button>
        </form>
    );
};

