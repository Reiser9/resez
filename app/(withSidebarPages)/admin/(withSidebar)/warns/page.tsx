'use client';

import React from 'react';
import cn from 'classnames';
import { useQueryClient } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';

import { Cross } from '@/shared/icons';
import { useWarn } from '@/features/admin';
import { PrivateWrapper } from '@/shared/wrappers/PrivateWrapper';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { WarnItem } from '@/entities/admin/ui';
import useInfiniteScroll from '@/shared/hooks/useInfiniteScroll';

import { CollectionItemSkeleton } from '@/shared/ui/Skeleton';
import { NotContent } from '@/shared/ui/NotContent';
import { Text } from '@/shared/ui/Text';
import { ReloadButton } from '@/shared/ui/Button';
import { Preloader } from '@/shared/ui/Preloader';

const AdminWarns = () => {
    const queryClient = useQueryClient();
    const { getPagginationWarns, readWarn } = useWarn();

    const revalidateWarns = () => {
        queryClient.invalidateQueries({ queryKey: ['warns'] });
    };

    const resetRequest = () => {
        queryClient.resetQueries({ queryKey: ['warns'] });
    };

    const { data, endPage, isPending, isError, isFetchingNextPage } = useInfiniteScroll({
        queryKey: ['warns'],
        queryFn: (pageParam) => getPagginationWarns(pageParam),
    });

    return (
        <PrivateWrapper permissions={[PERMISSIONS.COMPLAINTS]}>
            <div className={base.baseWrapperGap16}>
                <div className={base.titleInner}>
                    <Text variant="h3">
                        Жалобы{' '}
                        {!isError && !isPending && !!data?.pages[0]?.totalCount && `(${data?.pages[0].totalCount})`}
                    </Text>

                    <ReloadButton onClick={resetRequest} disabled={isPending} />
                </div>

                {isPending ? (
                    <div className={base.contentItems}>
                        {[...Array(3)].map((_, id) => (
                            <CollectionItemSkeleton key={id} />
                        ))}
                    </div>
                ) : isError ? (
                    <NotContent text="Произошла ошибка при загрузке данных" icon={<Cross />} danger />
                ) : data?.pages[0]?.totalCount ? (
                    <div className={cn(base.baseWrapperGap16, base.aic)}>
                        <div className={base.contentItems}>
                            {data?.pages.map((role) =>
                                role?.feedback?.map((data) => (
                                    <WarnItem
                                        key={data.id}
                                        data={data}
                                        readWarnCallback={() => readWarn(data.id, revalidateWarns)}
                                    />
                                )),
                            )}
                        </div>

                        {isFetchingNextPage && <Preloader offIndent small page />}

                        {!isFetchingNextPage && <div ref={endPage}></div>}
                    </div>
                ) : (
                    <NotContent text="Жалоб не найдено" />
                )}
            </div>
        </PrivateWrapper>
    );
};

export default AdminWarns;
