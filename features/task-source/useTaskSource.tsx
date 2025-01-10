'use client';

import type { Source } from '@/entities/task-source';
import useAlert from '@/shared/hooks/useAlert';
import useRequest from '@/shared/hooks/useRequest';

const useTaskSource = () => {
    const { request, catchRequestError, errorController } = useRequest();
    const { alertNotify } = useAlert();

    const getSources = async () => {
        const response = await request<{ sources: Source[] }>({
            url: `/${process.env.NEXT_PUBLIC_EDUCATIONMS_NAME}/source`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data.sources;
        }
    };

    const createSource = async (source: string, slug: string, successCallback = () => {}) => {
        const response = await request<{ source: Source }>({
            url: `/${process.env.NEXT_PUBLIC_EDUCATIONMS_NAME}/admin/source`,
            isAuth: true,
            method: 'POST',
            data: {
                source,
                slug,
            },
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
        alertNotify('Успешно', 'Источник задания создан', 'success');

        if ('data' in response) {
            return response.data;
        }
    };

    const updateSource = async (
        sourceId: number | string,
        source: string,
        slug: string,
        successCallback = () => {},
    ) => {
        const response = await request<{ source: Source }>({
            url: `/${process.env.NEXT_PUBLIC_EDUCATIONMS_NAME}/admin/source/${sourceId}`,
            isAuth: true,
            method: 'PATCH',
            data: {
                source,
                slug,
            },
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
        alertNotify('Успешно', 'Источник задания отредактирован', 'success');

        if ('data' in response) {
            return response.data;
        }
    };

    const deleteSource = async (sourceId: number | string, successCallback = () => {}) => {
        const response = await request<{ source: Source }>({
            url: `/${process.env.NEXT_PUBLIC_EDUCATIONMS_NAME}/admin/source/${sourceId}`,
            isAuth: true,
            method: 'DELETE',
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
        alertNotify('Успешно', 'Источник задания удален', 'success');

        if ('data' in response) {
            return response.data;
        }
    };

    return {
        getSources,
        createSource,
        updateSource,
        deleteSource,
    };
};

export default useTaskSource;
