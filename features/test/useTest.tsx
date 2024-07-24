'use client';

import React from 'react';

import useAlert from '@/shared/hooks/useAlert';
import useRequest from '@/shared/hooks/useRequest';
import { PagginationTests, TestById } from '@/entities/test';

const useTest = () => {
    const { request, catchRequestError, errorController } = useRequest();
    const { alertNotify } = useAlert();

    const getPagginationTests = async ({ pageParam, limit = 9 }: { pageParam: number; limit?: number }) => {
        const response = await request<PagginationTests>({
            url: `/education-ms/admin/test?offset=${pageParam * limit}&limit=${limit}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const createTest = async (
        subjectId: number | string,
        isPrivate: boolean,
        isOfficial: boolean,
        successCallback = () => {},
    ) => {
        const response = await request<{ test: any }>({
            url: '/education-ms/admin/test/exam',
            isAuth: true,
            method: 'POST',
            data: {
                subjectId,
                isPrivate,
                isOfficial,
            },
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
        alertNotify('Успешно', 'Тест создан', 'success');

        if ('data' in response) {
            return response.data;
        }
    };

    const getTestById = async (id: number | string) => {
        const response = await request<TestById>({
            url: `/education-ms/test/${id}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    return {
        getPagginationTests,
        createTest,
        getTestById,
    };
};

export default useTest;
