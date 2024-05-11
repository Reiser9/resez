'use client';

import React from 'react';

import useRequest from '@/shared/hooks/useRequest';
import useAlert from '@/shared/hooks/useAlert';

import type { PagginationSubjects, SubjectDTO } from '@/entities/subject/model';
import type { RoleDTO, Roles } from '@/entities/role';

const useArchive = () => {
    const { request, catchRequestError, errorController } = useRequest();
    const { alertNotify } = useAlert();

    const getArhiveSubjects = async ({ pageParam }: { pageParam: number }) => {
        const limit = 6;
        const response = await request<PagginationSubjects>({
            url: `/admin/archive/subject?offset=${pageParam * limit}&limit=${limit}`,
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
            url: `/admin/subject/${subjectId}/restore`,
            isAuth: true,
            method: 'PATCH',
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
        alertNotify("Успешно", "Предмет восстановлен", "success");
    };

    const removeArhiveSubject = async (subjectId: number, successCallback = () => {}) => {
        const response = await request<{ subject: SubjectDTO }>({
            url: `/admin/subject/${subjectId}`,
            isAuth: true,
            method: 'DELETE',
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
        alertNotify("Успешно", "Предмет удален", "success");
        console.log(response);
    }

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
    }

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
        alertNotify("Успешно", "Роль восстановлена", "success");
        console.log(response);
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
        alertNotify("Успешно", "Роль удалена", "success");
        console.log(response);
    }

    const restoreAllArchiveRoles = async () => {};

    return {
        getArhiveSubjects,
        restoreArchiveSubject,
        removeArhiveSubject,
        getArhiveRoles,
        restoreArchiveRole,
        removeArhiveRole
    };
};

export default useArchive;
