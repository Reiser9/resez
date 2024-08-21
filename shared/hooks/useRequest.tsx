'use client';

import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import type { Error } from '@/api/types';
import axiosInstance from '@/api/axios';
import { useAppDispatch, useAppSelector } from './useRedux';
import { setServerIsAvailable } from '@/store/slices/app';
import { setUserData } from '@/store/slices/user';
import { socket } from '@/api/socket';
import useAlert from './useAlert';

type requestProps = {
    url?: string;
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    isAuth?: boolean;
    data?: object;
    headers?: object;
    baseURL?: string;
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
            case 500:
                throw new Error('Сервер не работает');
            case 403:
                alertNotify('Ошибка', 'Доступ ограничен', 'error');
                throw new Error('Доступ ограничен');
            case 429:
                alertNotify('Чуть помедленнее', 'Слишком много запросов, пожалуйста, подождите', 'warn');
                throw new Error('Слишком много запросов, пожалуйста, подождите');
            case 413:
                alertNotify(
                    `Ошибка', 'Размер файла не должен превышать ${process.env.NEXT_PUBLIC_MAX_SIZE} MB`,
                    'error',
                );
                throw new Error(`Размер файла не должен превышать ${process.env.NEXT_PUBLIC_MAX_SIZE} MB`);
            default:
                if (customLogic) {
                    customLogic();
                } else {
                    alertNotify(
                        'Ошибка',
                        errorMessage
                            ? errorMessage
                            : response.response?.data.message || 'Что-то поломалось, скоро починим',
                        'error',
                    );
                }
                throw new Error();
        }
    };

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
        baseURL = '',
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
                ...(baseURL && { baseURL }),
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
