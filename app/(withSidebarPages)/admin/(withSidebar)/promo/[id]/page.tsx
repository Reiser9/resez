'use client';

import React from 'react';
import cn from 'classnames';
import { useParams } from 'next/navigation';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { formatDate } from '@/shared/utils/formatDate';
import { usePromocode } from '@/features/promocode';
import { Cross } from '@/shared/icons';

import { BackButton, Button, ReloadButton } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { Preloader } from '@/shared/ui/Preloader';
import { Badge } from '@/shared/ui/Badge';
import { NotContent } from '@/shared/ui/NotContent';
import { PromocodeUserItem } from '@/entities/promocode/ui';

const AdminPromoById = () => {
    const { id } = useParams();
    const queryClient = useQueryClient();

    const { getPromocodeById, getUsersActivatedPromocodeById } = usePromocode();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['promocode_by_id', id],
        queryFn: () => getPromocodeById(String(id)),
        enabled: !!id,
    });

    const { code, activationsCount, isFinished, xp, coins, createdAt, expiredDate, limit, creator } = data || {};
    const { nickname, avatar } = creator || {};

    const resetRequest = () => {
        queryClient.resetQueries({ queryKey: ['promocode_users_by_id'] });
    };

    const {
        data: users,
        isLoading: usersIsLoading,
        isError: usersIsError,
        isPending,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: ['promocode_users_by_id', id],
        queryFn: () => getUsersActivatedPromocodeById(String(id)),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = !lastPage?.isLast ? allPages.length : undefined;

            return nextPage;
        },
        enabled: !!id,
    });

    if (isLoading) {
        return <Preloader page />;
    }

    if (isError) {
        return <NotContent text="Произошла ошибка при загрузке данных" danger icon={<Cross />} />;
    }

    return (
        <div className={base.baseWrapperGap40}>
            <div className={base.titleWrapper}>
                <BackButton />

                <Text variant="h3">{code}</Text>
            </div>

            <div className={base.contentItems}>
                <div className={base.item4}>
                    <div className={base.baseWrapperGap0}>
                        <Text variant="text2" color="grey">
                            Количество активаций:
                        </Text>
                        <Text>{`${activationsCount} / ${limit ?? 'Безлимитно'}`}</Text>
                    </div>
                </div>

                <div className={base.item4}>
                    <div className={base.baseWrapperGap0}>
                        <Text variant="text2" color="grey">
                            Дата истечения:
                        </Text>
                        <Text>{expiredDate ? formatDate(expiredDate) : '-'}</Text>
                    </div>
                </div>

                <div className={base.item4}>
                    <div className={base.baseWrapperGap0}>
                        <Text variant="text2" color="grey">
                            Создал:
                        </Text>

                        <div className={base.titleWrapper}>
                            <Badge image={avatar} text={nickname} />

                            <Text>{nickname}</Text>
                        </div>
                    </div>
                </div>

                <div className={base.item4}>
                    <div className={base.baseWrapperGap0}>
                        <Text variant="text2" color="grey">
                            Дата создания:
                        </Text>
                        <Text>{formatDate(createdAt)}</Text>
                    </div>
                </div>

                <div className={base.item4}>
                    <div className={base.baseWrapperGap0}>
                        <Text variant="text2" color="grey">
                            Опыт:
                        </Text>
                        <Text>{xp || 0}</Text>
                    </div>
                </div>

                <div className={base.item4}>
                    <div className={base.baseWrapperGap0}>
                        <Text variant="text2" color="grey">
                            Монеты:
                        </Text>
                        <Text>{coins || 0}</Text>
                    </div>
                </div>

                <div className={base.item4}>
                    <div className={base.baseWrapperGap0}>
                        <Text variant="text2" color="grey">
                            Промокод активен:
                        </Text>
                        <Text>{isFinished ? 'Нет' : 'Да'}</Text>
                    </div>
                </div>
            </div>

            <div className={base.baseWrapperGap8}>
                <div className={base.titleInner}>
                    <Text variant="h4">
                        Пользователи{' '}
                        {!isError && !isPending && !!users?.pages[0]?.totalCount && `(${users?.pages[0].totalCount})`}
                    </Text>

                    <ReloadButton onClick={resetRequest} disabled={isPending} />
                </div>

                <div className={base.contentItems}>
                    {usersIsLoading ? (
                        <Preloader page small />
                    ) : usersIsError ? (
                        <NotContent text="Произошла ошибка при загрузке данных" icon={<Cross />} danger />
                    ) : users?.pages[0]?.totalCount ? (
                        <div className={base.contentItems}>
                            {users?.pages.map((pair) =>
                                pair?.users?.map((data) => <PromocodeUserItem key={data.id} data={data} />),
                            )}
                        </div>
                    ) : (
                        <NotContent text="Ни один пользователь не активировал промокод" />
                    )}

                    {hasNextPage && (
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
            </div>
        </div>
    );
};

export default AdminPromoById;
