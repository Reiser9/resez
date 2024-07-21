'use client';

import React from 'react';

import useRequest from '@/shared/hooks/useRequest';
import useAlert from '@/shared/hooks/useAlert';

import type { PagginationSubjects, SubjectDTO } from '@/entities/subject/model';
import type { RoleDTO, Roles } from '@/entities/role';
import { PagginationTasks } from '@/entities/task';
import { SubjectTask } from '@/entities/task/model';

const useArchive = () => {
    const { request, catchRequestError, errorController } = useRequest();
    const { alertNotify } = useAlert();

    const getArhiveSubjects = async ({ pageParam }: { pageParam: number }) => {
        const limit = 6;
        const response = await request<PagginationSubjects>({
            url: `/education-ms/admin/subject/archived?offset=${pageParam * limit}&limit=${limit}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const restoreArchiveSubject = async (subjectId: number, successCallback = () => {}) => {
        const response = await request<{ subject: SubjectDTO }>({
            url: `/education-ms/admin/subject/${subjectId}/restore`,
            isAuth: true,
            method: 'PATCH',
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
        alertNotify('Успешно', 'Предмет восстановлен', 'success');
    };

    const removeArhiveSubject = async (subjectId: number, successCallback = () => {}) => {
        const response = await request<{ subject: SubjectDTO }>({
            url: `/education-ms/admin/subject/${subjectId}`,
            isAuth: true,
            method: 'DELETE',
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
        alertNotify('Успешно', 'Предмет удален', 'success');
    };

    const restoreAllArchiveSubjects = async () => {};

    const getArhiveRoles = async ({ pageParam }: { pageParam: number }) => {
        const limit = 8;
        const response = await request<Roles>({
            url: `/admin/archive/role?offset=${pageParam * limit}&limit=${limit}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const restoreArchiveRole = async (roleId: number, successCallback = () => {}) => {
        const response = await request<{ role: RoleDTO }>({
            url: `/admin/role/${roleId}/restore`,
            isAuth: true,
            method: 'PATCH',
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
        alertNotify('Успешно', 'Роль восстановлена', 'success');
    };

    const removeArhiveRole = async (roleId: number, successCallback = () => {}) => {
        const response = await request<{ role: RoleDTO }>({
            url: `/admin/subject/${roleId}`,
            isAuth: true,
            method: 'DELETE',
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
        alertNotify('Успешно', 'Роль удалена', 'success');
    };

    const restoreAllArchiveRoles = async () => {};

    const getArhiveTasks = async ({ pageParam }: { pageParam: number }) => {
        const limit = 6;
        const response = await request<PagginationTasks>({
            url: `/education-ms/admin/task/archived?offset=${pageParam * limit}&limit=${limit}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const restoreArchiveTask = async (taskId: number, successCallback = () => {}) => {
        const response = await request<{ task: SubjectTask }>({
            url: `/education-ms/admin/task/${taskId}/restore`,
            isAuth: true,
            method: 'PATCH',
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
        alertNotify('Успешно', 'Задание восстановлено', 'success');
    };

    return {
        getArhiveSubjects,
        restoreArchiveSubject,
        removeArhiveSubject,
        getArhiveRoles,
        restoreArchiveRole,
        removeArhiveRole,
        getArhiveTasks,
        restoreArchiveTask,
    };
};

export default useArchive;
