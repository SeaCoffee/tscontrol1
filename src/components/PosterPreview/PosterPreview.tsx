import React from 'react';

export interface PosterPreviewProps {
    imageUrl: string;
}

export const PosterPreview: React.FC<PosterPreviewProps> = ({ imageUrl }) => {
    const posterUrl = `https://image.tmdb.org/t/p/w500${imageUrl}`;

    return (
        <img src={posterUrl} alt="Movie Poster" style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
    );
};


