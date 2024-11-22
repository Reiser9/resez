'use client';

import type { SubjectTaskById } from '@/entities/task';
import type {
    PagginationTests,
    PagginationTestsHistory,
    Test,
    TestById,
    TestResult,
    TestHistoryById,
} from '@/entities/test';
import useAlert from '@/shared/hooks/useAlert';
import useRequest from '@/shared/hooks/useRequest';
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
            url: `/${process.env.NEXT_PUBLIC_EDUCATIONMS_NAME}/admin/test?${queryString}`,
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
            url: `/${process.env.NEXT_PUBLIC_EDUCATIONMS_NAME}/test/official?${queryString}`,
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
            url: `/${process.env.NEXT_PUBLIC_EDUCATIONMS_NAME}/admin/test/exam`,
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
            url: `/${process.env.NEXT_PUBLIC_EDUCATIONMS_NAME}/test/${id}`,
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
            url: `/${process.env.NEXT_PUBLIC_EDUCATIONMS_NAME}/admin/test/${id}`,
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
            url: `/${process.env.NEXT_PUBLIC_EDUCATIONMS_NAME}/test/${id}/task/detailed`,
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
            url: `/${process.env.NEXT_PUBLIC_EDUCATIONMS_NAME}/test/${id}/submit`,
            isAuth: true,
            method: 'POST',
            data: {
                simpleTasks,
                detailedTasks,
                secondsSpent,
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

    const getPagginationTestsHistory = async (page: number, limit = 9) => {
        const queryString = buildQueryString({
            offset: page * limit,
            limit,
        });

        const response = await request<PagginationTestsHistory>({
            url: `/${process.env.NEXT_PUBLIC_EDUCATIONMS_NAME}/test-history?${queryString}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const getTestHistoryById = async (id: number | string) => {
        const response = await request<{ history: TestHistoryById }>({
            url: `/${process.env.NEXT_PUBLIC_EDUCATIONMS_NAME}/test-history/${id}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data.history;
        }
    };

    const swapTask = async (
        testId: number | string,
        oldTaskId: number,
        newTaskId: number,
        successCallback = () => {},
    ) => {
        const response = await request({
            url: `/${process.env.NEXT_PUBLIC_EDUCATIONMS_NAME}/admin/test/${testId}`,
            isAuth: true,
            method: 'PATCH',
            data: {
                oldTaskId,
                newTaskId,
            },
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
    };

    return {
        getPagginationTests,
        getPagginationOfficialTests,
        createTest,
        getTestById,
        deleteTest,
        getDetailedTasksByTestId,
        checkResultTestById,
        getPagginationTestsHistory,
        getTestHistoryById,
        swapTask,
    };
};

export default useTest;
