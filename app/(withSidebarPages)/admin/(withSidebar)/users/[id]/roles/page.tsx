'use client';

import React from 'react';
import cn from 'classnames';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import { useRoles } from '@/features/user';
import { Cross } from '@/shared/icons';
import { RoleItem } from '@/entities/role/ui';
import useInfiniteScroll from '@/shared/hooks/useInfiniteScroll';

import { Text } from '@/shared/ui/Text';
import { Button, ReloadButton } from '@/shared/ui/Button';
import { NotContent } from '@/shared/ui/NotContent';
import { RoleItemSkeleton } from '@/shared/ui/Skeleton';
import { Preloader } from '@/shared/ui/Preloader';

const AdminUserByIdRoles = () => {
    const { id } = useParams();
    const { getPaginationRolesByUserId, toggleRole } = useRoles();
    const queryClient = useQueryClient();

    const revalidateRequest = () => {
        queryClient.invalidateQueries({ queryKey: ['roles_by_user_id', id] });
    };

    const resetRequest = () => {
        queryClient.resetQueries({ queryKey: ['roles_by_user_id', id] });
    };

    const { data, endPage, isPending, isError, isFetchingNextPage } = useInfiniteScroll({
        queryKey: ['roles_by_user_id', String(id)],
        queryFn: (pageParam) => getPaginationRolesByUserId(pageParam, String(id)),
        enabled: !!id,
    });

    return (
        <div className={base.baseWrapperGap8}>
            <div className={base.titleInner}>
                <Text variant="h3">
                    Роли {!isError && !isPending && !!data?.pages[0]?.totalCount && `(${data?.pages[0]?.totalCount})`}
                </Text>

                <ReloadButton onClick={resetRequest} disabled={isPending} />
            </div>

            <div className={styles.rolesContent}>
                {isPending ? (
                    <div className={base.contentItems}>
                        {[...Array(4)].map((_, id) => (
                            <RoleItemSkeleton key={id} />
                        ))}
                    </div>
                ) : isError ? (
                    <NotContent text="Произошла ошибка при загрузке данных" icon={<Cross />} danger />
                ) : data?.pages[0]?.totalCount ? (
                    <div className={cn(base.baseWrapperGap16, base.aic)}>
                        <div className={base.contentItems}>
                            {data?.pages.map((role) =>
                                role?.roles?.map((data) => (
                                    <RoleItem data={data} key={data.id}>
                                        <Button
                                            onClick={() => toggleRole(String(id), data.id, revalidateRequest)}
                                            variant="light"
                                            color={data.isAssigned ? 'danger' : 'primary'}
                                        >
                                            {data.isAssigned ? 'Забрать' : 'Выдать'} роль
                                        </Button>
                                    </RoleItem>
                                )),
                            )}
                        </div>

                        {isFetchingNextPage && <Preloader offIndent small page />}

                        {!isFetchingNextPage && <div ref={endPage}></div>}
                    </div>
                ) : (
                    <NotContent text="Ролей не найдено" />
                )}
            </div>
        </div>
    );
};

export default AdminUserByIdRoles;
