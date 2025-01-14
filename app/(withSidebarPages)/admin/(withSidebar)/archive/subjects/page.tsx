'use client';

import React from 'react';
import cn from 'classnames';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';

import { Cross } from '@/shared/icons';
import { SubjectItem } from '@/entities/subject/ui';
import { checkPermission } from '@/shared/utils/checkPermissions';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { useArchive, useUserPermissions } from '@/features/user';
import useInfiniteScroll from '@/shared/hooks/useInfiniteScroll';

import { NotContent } from '@/shared/ui/NotContent';
import { SubjectItemSkeleton } from '@/shared/ui/Skeleton';
import { ReloadButton } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { Preloader } from '@/shared/ui/Preloader';

const AdminArchiveSubjects = () => {
    const { getUserPermissions } = useUserPermissions();

    const { data: permissions } = useQuery({
        queryKey: ['user_permissions'],
        queryFn: getUserPermissions,
    });

    const queryClient = useQueryClient();
    const { getArhiveSubjects } = useArchive();

    const resetRequest = () => {
        queryClient.resetQueries({ queryKey: ['archive_subjects'] });
    };

    const { data, endPage, isPending, isError, isFetchingNextPage } = useInfiniteScroll({
        queryKey: ['archive_subjects'],
        queryFn: (pageParam) => getArhiveSubjects(pageParam),
    });

    return (
        <div className={base.baseWrapperGap16}>
            <div className={base.titleInner}>
                <Text variant="h3">
                    Предметы{' '}
                    {!isError && !isPending && !!data?.pages[0]?.totalCount && `(${data?.pages[0]?.totalCount})`}
                </Text>

                <ReloadButton onClick={resetRequest} disabled={isPending} />
            </div>

            {isPending ? (
                <div className={base.contentItems}>
                    {[...Array(3)].map((_, id) => (
                        <SubjectItemSkeleton key={id} />
                    ))}
                </div>
            ) : isError ? (
                <NotContent text="Произошла ошибка при загрузке данных" icon={<Cross />} danger />
            ) : data?.pages[0]?.totalCount ? (
                <div className={cn(base.baseWrapperGap16, base.aic)}>
                    <div className={base.contentItems}>
                        {data?.pages.map((subject) =>
                            subject?.subjects.map((data) => (
                                <SubjectItem
                                    key={data.id}
                                    data={data}
                                    edit={checkPermission(permissions || [], [PERMISSIONS.UPDATE_SUBJECTS])}
                                    remove={checkPermission(permissions || [], [PERMISSIONS.DELETE_SUBJECTS])}
                                    restore
                                />
                            )),
                        )}
                    </div>

                    {isFetchingNextPage && <Preloader offIndent small page />}

                    {!isFetchingNextPage && <div ref={endPage}></div>}
                </div>
            ) : (
                <NotContent text="Предметов не найдено" />
            )}
        </div>
    );
};

export default AdminArchiveSubjects;
