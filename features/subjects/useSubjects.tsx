'use client';

import React from 'react';

import useRequest from '@/shared/hooks/useRequest';
import { Subject, SubjectDTO, Task } from '@/entities/subject';
import useAlert from '@/shared/hooks/useAlert';
import { PagginationSubjects } from '@/entities/subject/model';

const useSubjects = () => {
    const { request, catchRequestError, errorController } = useRequest();
    const { alertNotify } = useAlert();

    const getPagginationSubjects = async ({ pageParam }: { pageParam: number }) => {
        const limit = 6;
        const response = await request<PagginationSubjects>({
            url: `/admin/subject?offset=${pageParam * limit}&limit=${limit}`,
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
        subjectTasks: Task[],
        isMark: boolean,
        durationMinutes: string,
        successCallback = () => {},
    ) => {
        const response = await request<{ subject: SubjectDTO }>({
            url: '/admin/subject',
            isAuth: true,
            method: 'POST',
            data: {
                subject,
                slug,
                durationMinutes,
                isPublished,
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

    const editSubject = async (
        subjectId: number,
        subject: string,
        slug: string,
        isPublished: boolean,
        subjectTasks: Task[],
        isMark: boolean,
        durationMinutes: string,
        successCallback = () => {},
    ) => {
        const response = await request<{ subject: SubjectDTO }>({
            url: `/admin/subject/${subjectId}`,
            isAuth: true,
            method: 'PATCH',
            data: {
                subject,
                slug,
                durationMinutes,
                isPublished,
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
            url: `/admin/subject/${subjectId}/archive`,
            isAuth: true,
            method: 'DELETE'
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        alertNotify("Успешно", "Предмет удален", "success");
        successCallback();

        if ('data' in response) {
            return response.data;
        }
    };

    const getSubjectBySlug = async (slug: string) => {
        const response = await request<{ subject: Subject }>({
            url: `/admin/subject/${slug}`,
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
        getPagginationSubjects,
        createSubject,
        deleteSubject,
        editSubject,
        getSubjectBySlug,
    };
};

export default useSubjects;
