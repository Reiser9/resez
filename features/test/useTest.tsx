'use client';

import useAlert from '@/shared/hooks/useAlert';
import useRequest from '@/shared/hooks/useRequest';
import { PagginationTests, Test, TestById, TestResult } from '@/entities/test';
import { SubjectTaskById } from '@/entities/task';
import { buildQueryString } from '@/shared/utils/buildQueryString';

const useTest = () => {
    const { request, catchRequestError, errorController } = useRequest();
    const { alertNotify } = useAlert();

    const getPagginationTests = async (page: number, limit = 9) => {
        const queryString = buildQueryString({
            offset: page * limit,
            limit,
        });

        const response = await request<PagginationTests>({
            url: `/education-ms/admin/test?${queryString}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const getPagginationOfficialTests = async (page: number, subjectSlug: string, limit = 9) => {
        const queryString = buildQueryString({
            offset: page * limit,
            limit,
            subject_slug: subjectSlug,
        });

        const response = await request<PagginationTests>({
            url: `/education-ms/test/official?${queryString}`,
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

    const deleteTest = async (id: number | string, successCallback = () => {}) => {
        const response = await request<{ test: Test }>({
            url: `/education-ms/admin/test/${id}`,
            isAuth: true,
            method: 'DELETE',
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
        alertNotify('Успешно', 'Тест удален', 'success');

        if ('data' in response) {
            return response.data;
        }
    };

    const getDetailedTasksByTestId = async (id: number | string) => {
        const response = await request<{ tasks: SubjectTaskById[] }>({
            url: `/education-ms/test/${id}/task/detailed`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data.tasks;
        }
    };

    const checkResultTestById = async (
        id: number | string,
        simpleTasks: { id: number | string; answer: string }[],
        detailedTasks: { id: number | string; primaryScore: string | number }[],
        secondsSpent: number,
        successCallback = () => {},
    ) => {
        const response = await request<TestResult>({
            url: `/education-ms/test/${id}/submit`,
            isAuth: true,
            method: 'POST',
            data: {
                simpleTasks,
                detailedTasks,
                secondsSpent
            },
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();

        if ('data' in response) {
            return response.data;
        }
    };

    return {
        getPagginationTests,
        getPagginationOfficialTests,
        createTest,
        getTestById,
        deleteTest,
        getDetailedTasksByTestId,
        checkResultTestById,
    };
};

export default useTest;
