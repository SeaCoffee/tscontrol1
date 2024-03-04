import React, { useEffect, useState } from 'react';

import {userService} from "../../services/axiosService";


interface User {
    id: number;
    name: string;
    username: string;
    avatar?: {
        gravatar?: {
            hash: string;
        };
    };
}

export const UserInfo: React.FC = () => {
    const [userInfo, setUserInfo] = useState<User | null>(null);

    useEffect(() => {
        userService.getUserInfo().then(response => {
            const data = response.data as User;
            setUserInfo(data);
        }).catch(error => {
            console.error('Error loading user info:', error);
        });
    }, []);

    if (!userInfo) {
        return <div>Loading...</div>;
    }


    const avatarUrl = userInfo.avatar?.gravatar?.hash
        ? `https://www.gravatar.com/avatar/${userInfo.avatar.gravatar.hash}?s=30`
        : 'path_to_default_avatar_image';

    return (
        <div>
            <img src={avatarUrl} alt="User avatar" />
            <span>{userInfo.username}</span>
        </div>
    );
};

