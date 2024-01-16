'use client';

import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import axiosInstance from '@/api/axios';
import { useAppDispatch, useAppSelector } from './useRedux';
import { setServerIsAvailable } from '@/store/slices/app';
import { setIsAuth, setUserData } from '@/store/slices/user';
import { socket } from '@/api/socket';

type requestProps = {
    url?: string;
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    isAuth?: boolean;
    data?: object;
    headers?: object;
};

type RequestResult<T> = AxiosResponse<T>;

const useRequest = () => {
    const {sessionId, user} = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();

    const clearLocalData = () => {
        if(user && sessionId){
            socket.emit("leave", user.id, sessionId);
        }

        localStorage.removeItem("accessToken");

        dispatch(setUserData());
    }

    const getHealthServer = async () => {
        try {
            dispatch(setServerIsAvailable(true));

            await axiosInstance.get('/health', {
                timeout: 3000,
            });

            return true;
        } catch (error) {
            dispatch(setServerIsAvailable(false));

            return false;
        }
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
        } catch (error) {
            await getHealthServer();

            throw Error('Request error');
        }
    };

    return {
        request,
        clearLocalData,
        getHealthServer
    };
};

export default useRequest;
