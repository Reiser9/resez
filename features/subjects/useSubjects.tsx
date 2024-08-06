'use client';

import useRequest from '@/shared/hooks/useRequest';
import { Subject, SubjectDTO, Task } from '@/entities/subject';
import useAlert from '@/shared/hooks/useAlert';
import type {
    MarkConversionItem,
    PagginationSubjects,
    ScoreConversion,
    ScoreConversionItem,
    SubjectSubThemeDTO,
    SubjectTask,
    SubjectTaskCreate,
    SubjectTaskDTO,
} from '@/entities/subject/model';
import { buildQueryString } from '@/shared/utils/buildQueryString';

const useSubjects = () => {
    const { request, catchRequestError, errorController } = useRequest();
    const { alertNotify } = useAlert();

    const getPagginationSubjects = async (page: number, limit = 9) => {
        const queryString = buildQueryString({
            offset: page * limit,
            limit,
        });

        const response = await request<PagginationSubjects>({
            url: `/education-ms/admin/subject?${queryString}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const getSubjectThemes = async (subjectId: number | string) => {
        const response = await request<{ subjectTasks: SubjectTaskDTO[] }>({
            url: `/education-ms/admin/subject/${subjectId}/subject-task`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data.subjectTasks;
        }
    };

    const getSubjectSubThemes = async (themeId: number | string) => {
        const response = await request<{ subThemes: SubjectSubThemeDTO[] }>({
            url: `/education-ms/admin/subject-task/${themeId}/sub-theme`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data.subThemes;
        }
    };

    const getSubjects = async () => {
        const response = await request<{ subjects: { id: number; subject: string; slug: string }[] }>({
            url: '/education-ms/subject',
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const createSubject = async (
        subject: string,
        slug: string,
        isPublished: boolean,
        order: string | number,
        subjectTasks: Task[],
        isMark: boolean,
        durationMinutes: string,
        successCallback = () => {},
    ) => {
        const response = await request<{ subject: SubjectDTO }>({
            url: '/education-ms/admin/subject',
            isAuth: true,
            method: 'POST',
            data: {
                subject,
                slug,
                durationMinutes,
                isPublished,
                order,
                isMark,
                subjectTasks,
            },
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();

        if ('data' in response) {
            return response.data.subject.id;
        }
    };

    const createTableForSubject = async (
        id: number | string,
        scoreConversion: ScoreConversionItem[] | MarkConversionItem[],
        successCallback = () => {},
    ) => {
        const response = await request({
            url: `/education-ms/admin/subject/${id}/score-conversion`,
            isAuth: true,
            method: 'POST',
            data: {
                scoreConversion,
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

    const editSubject = async (
        subjectId: string,
        subject: string,
        slug: string,
        isPublished: boolean,
        order: string | number,
        subjectTasks: Task[],
        isMark: boolean,
        durationMinutes: string,
        successCallback = () => {},
    ) => {
        const response = await request<{ subject: SubjectDTO }>({
            url: `/education-ms/admin/subject/${subjectId}`,
            isAuth: true,
            method: 'PATCH',
            data: {
                subject,
                slug,
                durationMinutes,
                isPublished,
                order,
                isMark,
                subjectTasks,
            },
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();

        if ('data' in response) {
            return response.data.subject.id;
        }
    };

    const deleteSubject = async (subjectId: number, successCallback = () => {}) => {
        const response = await request<{ subject: Subject }>({
            url: `/education-ms/admin/subject/${subjectId}/archive`,
            isAuth: true,
            method: 'DELETE',
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        alertNotify('Успешно', 'Предмет удален', 'success');
        successCallback();

        if ('data' in response) {
            return response.data;
        }
    };

    const getSubjectById = async (id: string) => {
        const response = await request<{ subject: Subject }>({
            url: `/education-ms/admin/subject/${id}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const getPointsSubjectById = async (id: string) => {
        const response = await request<{
            isMark: boolean;
            scoreConversion: ScoreConversion[];
            subjectTasks: SubjectTask[];
        }>({
            url: `/education-ms/admin/subject/${id}/score-conversion`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const getPointsSubjectBySlug = async (slug: string) => {
        const response = await request<{
            isMark: boolean;
            scoreConversion: ScoreConversion[];
            subjectTasks: SubjectTask[];
            durationMinutes: number;
        }>({
            url: `/education-ms/subject/${slug}/score-info`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const publishSubject = async (id: number, successCallback = () => {}) => {
        const response = await request<SubjectDTO>({
            url: `/education-ms/admin/subject/${id}/toggle-publish`,
            isAuth: true,
            method: 'PATCH',
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();

        if ('data' in response) {
            return response.data;
        }
    };

    const getTasksBySubjectId = async (id: number | string) => {
        const response = await request<{ subjectTasks: SubjectTaskCreate[] }>({
            url: `/education-ms/admin/subject/${id}/task-info`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data.subjectTasks;
        }
    };

    const getTasksCatalogBySubject = async (slug: string) => {
        const response = await request<{ subjectTasks: SubjectTaskCreate[] }>({
            url: `/education-ms/subject/${slug}/task-info`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data.subjectTasks;
        }
    };

    return {
        getPagginationSubjects,
        getSubjects,
        getSubjectThemes,
        getSubjectSubThemes,
        createTableForSubject,
        createSubject,
        deleteSubject,
        editSubject,
        getPointsSubjectBySlug,
        getSubjectById,
        getPointsSubjectById,
        publishSubject,
        getTasksBySubjectId,
        getTasksCatalogBySubject,
    };
};

export default useSubjects;
