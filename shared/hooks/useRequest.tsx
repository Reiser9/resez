'use client';

import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import axiosInstance from '@/api/axios';
import { useAppDispatch, useAppSelector } from './useRedux';
import { setServerIsAvailable } from '@/store/slices/app';
import { setUserData } from '@/store/slices/user';
import { socket } from '@/api/socket';
import useAlert from './useAlert';
import { Error } from '@/api/types';

type requestProps = {
    url?: string;
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    isAuth?: boolean;
    data?: object;
    headers?: object;
    callback?: () => void;
};

type RequestResult<T> = AxiosResponse<T> | AxiosError<Error>;

const useRequest = () => {
    const { sessionId, user } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const { alertNotify } = useAlert();

    const clearLocalData = () => {
        if (user && sessionId) {
            socket.emit('leave', user.id, sessionId);
        }

        localStorage.removeItem('accessToken');

        dispatch(setUserData());
    };

    const getHealthServer = async () => {
        try {
            await axiosInstance.get('/health', {
                timeout: 3000,
            });

            dispatch(setServerIsAvailable(true));

            return true;
        } catch (error) {
            dispatch(setServerIsAvailable(false));

            return false;
        }
    };

    const errorController = async (
        response: AxiosResponse | AxiosError<Error>,
        errorMessage = '',
        customLogic?: () => void,
    ) => {
        if ('data' in response) {
            return;
        }

        switch (response.response?.status) {
            // case 500:
            //     return;
            case 403:
                return alertNotify('Ошибка', 'Доступ ограничен', 'error');
            case 429:
                return alertNotify('Чуть помедленнее', 'Слишком много запросов, пожалуйста, подождите', 'warn');
            default:
                if (customLogic) {
                    return customLogic();
                } else {
                    return alertNotify(
                        'Ошибка',
                        errorMessage
                            ? errorMessage
                            : response.response?.data.message || 'Что-то поломалось, скоро починим',
                        'error',
                    );
                }
        }
    };

    // const noAuthController = async (callback = () => {}) => {
    //     const token = await request<{ accessToken: string }>({ url: '/auth/refresh', isAuth: true });

    //     if (!('data' in token)) {
    //         return clearLocalData();
    //     }

    //     localStorage.setItem('accessToken', token.data.accessToken);

    //     callback();
    // };

    const catchRequestError = (response: AxiosResponse | AxiosError<Error>) => {
        if (!('data' in response)) {
            return true;
        }

        return false;
    };

    const request = async <T,>({
        url,
        method = 'GET',
        isAuth = false,
        data = {},
        headers = {},
    }: requestProps): Promise<RequestResult<T>> => {
        const accessToken = isAuth ? localStorage.getItem('accessToken') : null;

        let reqHeaders: AxiosRequestConfig['headers'] = {
            'Content-Type': 'application/json',
            ...(isAuth ? { Authorization: `Bearer ${accessToken}` } : {}),
            ...headers,
        };

        try {
            const response = await axiosInstance.request({
                method,
                url,
                headers: reqHeaders,
                data,
            });

            return response;
        } catch (error: any) {
            await getHealthServer();

            return error;
        }
    };

    return {
        request,
        clearLocalData,
        getHealthServer,
        errorController,
        catchRequestError,
    };
};

export default useRequest;
