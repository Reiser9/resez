'use client';

import React from 'react';
import cn from 'classnames';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Tooltip } from 'antd';

import base from '@/shared/styles/base.module.scss';

import { checkPermission } from '@/shared/utils/checkPermissions';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { Cross, Plus } from '@/shared/icons';
import { useSubjects } from '@/features/subjects';
import { SubjectItem } from '@/entities/subject/ui';
import { PrivateWrapper } from '@/shared/wrappers/PrivateWrapper';
import { useUserPermissions } from '@/features/user';

import { Text } from '@/shared/ui/Text';
import { NotContent } from '@/shared/ui/NotContent';
import { IconButton, ReloadButton } from '@/shared/ui/Button';
import { SubjectItemSkeleton } from '@/shared/ui/Skeleton';

const AdminSubjects = () => {
    const { getUserPermissions } = useUserPermissions();

    const {
        data: permissions,
        isLoading: permissionsIsLoading,
        isError: permissionsError,
    } = useQuery({
        queryKey: ['user_permissions'],
        queryFn: getUserPermissions,
    });

    const queryClient = useQueryClient();
    const { getPagginationSubjects } = useSubjects();

    const resetRequest = () => {
        queryClient.resetQueries({ queryKey: ['subjects'] });
    };

    const { data, isPending, isError } = useQuery({
        queryKey: ['subjects'],
        queryFn: () => getPagginationSubjects(0, 9999),
    });

    return (
        <PrivateWrapper permissions={[PERMISSIONS.SUBJECTS]}>
            <div className={base.baseWrapperGap16}>
                <div className={base.titleInner}>
                    <div className={base.titleWrapper}>
                        <Text variant="h3">
                            Предметы {!isError && !isPending && !!data?.totalCount && `(${data?.totalCount})`}
                        </Text>

                        <ReloadButton onClick={resetRequest} disabled={isPending} />
                    </div>

                    {checkPermission(permissions || [], [PERMISSIONS.CREATE_SUBJECTS]) && (
                        <Tooltip title="Создать">
                            <IconButton small variant="light" href="subjects/create" circle>
                                <Plus />
                            </IconButton>
                        </Tooltip>
                    )}
                </div>

                {isPending ? (
                    <div className={base.contentItems}>
                        {[...Array(3)].map((_, id) => (
                            <SubjectItemSkeleton key={id} />
                        ))}
                    </div>
                ) : isError ? (
                    <NotContent text="Ошибка при загрузке предметов" icon={<Cross />} danger />
                ) : !!data?.subjects.length ? (
                    <div className={cn(base.baseWrapperGap16, base.aic)}>
                        <div className={base.contentItems}>
                            {data?.subjects?.map((data) => (
                                <SubjectItem
                                    key={data.id}
                                    data={data}
                                    edit={checkPermission(permissions || [], [PERMISSIONS.UPDATE_SUBJECTS])}
                                    remove={checkPermission(permissions || [], [PERMISSIONS.DELETE_SUBJECTS])}
                                    publish={checkPermission(permissions || [], [PERMISSIONS.UPDATE_SUBJECTS])}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <NotContent text="Предметов не найдено" />
                )}
            </div>
        </PrivateWrapper>
    );
};

export default AdminSubjects;
