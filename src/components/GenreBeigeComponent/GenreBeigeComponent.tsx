import React from 'react';
import { Badge } from 'reactstrap';


interface GenreBadgeProps {
    genreId: number;
    genreDictionary?: { [key: number]: string };
    genreName?: string;
}

export const GenreBadge: React.FC<GenreBadgeProps> = ({ genreId, genreDictionary, genreName }) => {
    const name = genreName || genreDictionary?.[genreId] || 'Unknown';

    return (
        <Badge color="secondary" style={{ margin: '0.5rem' }}>
            {name}
        </Badge>
    );
};


