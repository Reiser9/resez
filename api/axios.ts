'use client';

import axios, { AxiosInstance, isAxiosError } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/`,
    timeout: 5000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

const publicEndpoints = [
    '/health',
    '/auth/login',
    '/auth/register',
    '/auth/refresh',
    '/auth/send-recovery-password-code',
    '/auth/verify-recovery-password-code',
    '/auth/recovery-password',
];

axiosInstance.interceptors.request.use(
    async (req) => {
        const accessToken = localStorage.getItem('accessToken');

        if (publicEndpoints.includes(req.url || '')) {
            return req;
        }

        if (!accessToken) {
            return req;
        }

        try {
            await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/check`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                withCredentials: true,
            });

            return req;
        } catch (error) {
            if (isAxiosError(error) && error.code === 'ERR_NETWORK') {
                return req;
            }

            try {
                const refresh = await axios.get<{ accessToken: string }>(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/refresh`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true,
                    },
                );

                if (refresh.status === 200) {
                    localStorage.setItem('accessToken', refresh.data.accessToken);
                    req.headers.Authorization = `Bearer ${refresh.data.accessToken}`;

                    return req;
                }
            } catch (error) {
                console.error('2', error);
                // local logout
                const accessToken = localStorage.getItem('accessToken');
                req.headers.Authorization = `Bearer ${accessToken}`;

                return req;
            }
        }

        return req;
    },
    (error) => {
        console.log('Request interceptor error:', error);
        return Promise.reject(error);
    },
);

export default axiosInstance;
