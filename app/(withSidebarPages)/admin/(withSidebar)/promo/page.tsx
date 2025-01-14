'use client';

import React from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { Tooltip } from 'antd';
import { useQueryClient } from '@tanstack/react-query';
import { usePathname, useSearchParams } from 'next/navigation';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { PrivateWrapper } from '@/shared/wrappers/PrivateWrapper';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { Cross, Plus } from '@/shared/icons';
import { usePromocode } from '@/features/promocode';
import useInfiniteScroll from '@/shared/hooks/useInfiniteScroll';

import { Text } from '@/shared/ui/Text';
import { IconButton, ReloadButton } from '@/shared/ui/Button';
import { NotContent } from '@/shared/ui/NotContent';
import { PromocodeItem } from '@/entities/promocode/ui';
import { TestItemSkeleton } from '@/shared/ui/Skeleton';
import { ScrollWithArrows } from '@/shared/ui/ScrollWithArrows';
import { Preloader } from '@/shared/ui/Preloader';

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

    const { data, endPage, isPending, isError, isFetchingNextPage } = useInfiniteScroll({
        queryKey: ['admin_promocodes', active],
        queryFn: (pageParam) => getPagginationPromocodes(pageParam, active || ''),
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

                    <Tooltip destroyTooltipOnHide title="Создать">
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
                ) : data?.pages[0]?.totalCount ? (
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

                        {isFetchingNextPage && <Preloader offIndent small page />}

                        {!isFetchingNextPage && <div ref={endPage}></div>}
                    </div>
                ) : (
                    <NotContent text="Промокодов не найдено" />
                )}
            </div>
        </PrivateWrapper>
    );
};

export default AdminPromo;
