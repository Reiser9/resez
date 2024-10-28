'use client';

import axios from 'axios';

export const refreshToken = async () => {
    const refresh = await axios.get<{ accessToken: string }>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/refresh`, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    });

    if (refresh.status === 200) {
        localStorage.setItem('accessToken', refresh.data.accessToken);
    }
};
