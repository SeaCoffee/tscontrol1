import React from 'react';
import { useNavigate } from 'react-router-dom';

import {Genre} from "../../services/axiosService";



interface GenreSelectorProps {
    genres: Genre[];
    onGenreSelect: (genreId: number) => void;
}

export const GenreSelector: React.FC<GenreSelectorProps> = ({ genres, onGenreSelect }) => {
    const navigate = useNavigate();


    return (
        <div>
            <ul className="genre-list">
                {genres.map(genre => {
                    console.log(`Rendering genre: ${genre.name}`);
                    return (
                        <li key={genre.id} style={{ cursor: 'pointer' }} onClick={() => { navigate(`/genres/${genre.id}`); }}>
                            {genre.name}
                        </li>

                    );
                })}
            </ul>
        </div>
    );
};



