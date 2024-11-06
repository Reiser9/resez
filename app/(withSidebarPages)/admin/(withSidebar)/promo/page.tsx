'use client';

import React from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { Tooltip } from 'antd';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { usePathname, useSearchParams } from 'next/navigation';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import { PrivateWrapper } from '@/shared/wrappers/PrivateWrapper';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { Cross, Plus } from '@/shared/icons';
import { usePromocode } from '@/features/promocode';

import { Text } from '@/shared/ui/Text';
import { Button, IconButton, ReloadButton } from '@/shared/ui/Button';
import { NotContent } from '@/shared/ui/NotContent';
import { PromocodeItem } from '@/entities/promocode/ui';
import { TestItemSkeleton } from '@/shared/ui/Skeleton';
import { ScrollWithArrows } from '@/shared/ui/ScrollWithArrows';

const AdminPromo = () => {
    const queryClient = useQueryClient();
    const pathname = usePathname();
    const { getPagginationPromocodes, deactivatePromocode } = usePromocode();
    const searchParams = useSearchParams();
    const active = searchParams.get('active');

    const revalidateRequest = () => {
        queryClient.invalidateQueries({ queryKey: ['admin_promocodes', active] });
    };

    const resetRequest = () => {
        queryClient.resetQueries({ queryKey: ['admin_promocodes', active] });
    };

    const deactivatePromocodeHandler = (id: number | string) => {
        deactivatePromocode(id, revalidateRequest);
    };

    const { data, isPending, isError, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['admin_promocodes', active],
        queryFn: (params) => getPagginationPromocodes(params.pageParam, active || ''),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = !lastPage?.isLast ? allPages.length : undefined;

            return nextPage;
        },
    });

    return (
        <PrivateWrapper permissions={[PERMISSIONS.PROMOCODES]}>
            <div className={base.baseWrapperGap16}>
                <ScrollWithArrows>
                    <Link
                        href="/admin/promo"
                        prefetch={false}
                        className={cn(base.tag, {
                            [base.active]: pathname === '/admin/promo' && !active,
                        })}
                        replace
                    >
                        Активные
                    </Link>

                    <Link
                        href="/admin/promo?active=false"
                        prefetch={false}
                        className={cn(base.tag, {
                            [base.active]: pathname === '/admin/promo' && active,
                        })}
                        replace
                    >
                        Завершенные
                    </Link>
                </ScrollWithArrows>

                <div className={base.titleInner}>
                    <div className={base.titleWrapper}>
                        <Text variant="h3">
                            Промокоды{' '}
                            {!isError &&
                                !isPending &&
                                !!data?.pages[0]?.totalCount &&
                                `(${data?.pages[0]?.totalCount})`}
                        </Text>

                        <ReloadButton onClick={resetRequest} disabled={isPending} />
                    </div>

                    <Tooltip title="Создать">
                        <IconButton small variant="light" href="/admin/promo/create" circle>
                            <Plus />
                        </IconButton>
                    </Tooltip>
                </div>

                {isPending ? (
                    <div className={base.contentItems}>
                        {[...Array(3)].map((_, id) => (
                            <TestItemSkeleton key={id} />
                        ))}
                    </div>
                ) : isError ? (
                    <NotContent text="Ошибка при загрузке промокодов" icon={<Cross />} danger />
                ) : data.pages[0]?.totalCount ? (
                    <div className={cn(base.baseWrapperGap16, base.aic)}>
                        <div className={base.contentItems}>
                            {data?.pages.map((promo) =>
                                promo?.promoCodes.map((data) => (
                                    <PromocodeItem
                                        key={data.id}
                                        data={data}
                                        finishPromocode={() => deactivatePromocodeHandler(data.id)}
                                    />
                                )),
                            )}
                        </div>

                        {!isError && hasNextPage && (
                            <Button
                                auto
                                onClick={fetchNextPage}
                                loading={isFetchingNextPage}
                                className={base.buttonShowMore}
                            >
                                Показать еще
                            </Button>
                        )}
                    </div>
                ) : (
                    <NotContent text="Промокодов не найдено" />
                )}
            </div>
        </PrivateWrapper>
    );
};

export default AdminPromo;
