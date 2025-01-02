'use client';

import React from 'react';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';

import base from '@/shared/styles/base.module.scss';

import { useAvatar } from '@/features/store';
import { Cross } from '@/shared/icons';
import { AvatarStoreItem } from '@/entities/store/ui';
import { useAppSelector } from '@/shared/hooks/useRedux';

import { AvatarItemSkeleton } from '@/shared/ui/Skeleton';
import { NotContent } from '@/shared/ui/NotContent';
import { Button, ReloadButton } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { Modal } from '@/shared/ui/Modal';
import { Preloader } from '@/shared/ui/Preloader';

const StorePersonalizationAvatar = () => {
    const [productModal, setProductModal] = React.useState(false);

    const isAuth = useAppSelector((state) => state.user.isAuth);

    const queryClient = useQueryClient();
    const router = useRouter();
    const { getPaginationStoreAvatars, addAvatarDecorationToProfile, getAvatarById } = useAvatar();

    const searchParams = useSearchParams();
    const avatarDecorationId = searchParams.get('avatar_decoration');

    const revalidateAvatars = () => {
        queryClient.invalidateQueries({ queryKey: ['store_avatars'] });
        queryClient.invalidateQueries({ queryKey: ['short_info'] });
    };

    const resetRequest = () => {
        queryClient.resetQueries({ queryKey: ['store_avatars'] });
    };

    const addProductToProfileHandler = (id: number) => {
        if (!isAuth) {
            return router.push('/login');
        }

        addAvatarDecorationToProfile(id, revalidateAvatars);
    };

    const { data, isPending, isError, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['store_avatars'],
        queryFn: getPaginationStoreAvatars,
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = !lastPage?.isLast ? allPages.length : undefined;

            return nextPage;
        },
    });

    const {
        data: avatarDecoration,
        isPending: avatarDecorationIsPending,
        isError: avatarDecorationIsError,
    } = useQuery({
        queryKey: ['avatar_decoration_by_id', avatarDecorationId],
        queryFn: () => getAvatarById(String(avatarDecorationId)),
        enabled: !!avatarDecorationId,
    });

    const openProductModal = (id: number) => {
        setProductModal(true);
        router.replace(`?avatar_decoration=${id}`);
    };

    const closeProductModal = () => {
        router.replace('?');
    };

    React.useEffect(() => {
        if (avatarDecorationId) {
            setProductModal(true);
        }
    }, [avatarDecorationId]);

    return (
        <>
            <div className={base.baseWrapperGap16}>
                <div className={base.titleInner}>
                    <Text variant="h3">
                        Украшения аватарок{' '}
                        {!isError && !isPending && !!data?.pages[0]?.totalCount && `(${data?.pages[0].totalCount})`}
                    </Text>

                    <ReloadButton onClick={resetRequest} disabled={isPending} />
                </div>

                {isPending ? (
                    <div className={base.contentItems}>
                        {[...Array(3)].map((_, id) => (
                            <AvatarItemSkeleton key={id} />
                        ))}
                    </div>
                ) : isError ? (
                    <NotContent text="Произошла ошибка при загрузке данных" icon={<Cross />} danger />
                ) : data.pages[0]?.totalCount ? (
                    <div className={base.contentItems}>
                        {data?.pages.map((avatar) =>
                            avatar?.products?.map((data) => (
                                <AvatarStoreItem
                                    key={data.id}
                                    data={data}
                                    addProductToProfile={() => addProductToProfileHandler(data.id)}
                                    openProductModal={() => openProductModal(data.id)}
                                />
                            )),
                        )}
                    </div>
                ) : (
                    <NotContent text="Украшений аватарок не найдено" />
                )}

                {!isError && hasNextPage && (
                    <Button auto onClick={fetchNextPage} loading={isFetchingNextPage} className={base.buttonShowMore}>
                        Показать еще
                    </Button>
                )}
            </div>

            <Modal
                title={avatarDecorationIsError ? 'Товара не существует' : avatarDecoration?.title}
                value={productModal}
                setValue={setProductModal}
                onClose={closeProductModal}
            >
                {avatarDecorationIsPending ? (
                    <Preloader page small />
                ) : avatarDecorationIsError ? (
                    <NotContent text="Произошла ошибка при загрузке данных" icon={<Cross />} danger />
                ) : (
                    `Цена: ${avatarDecoration?.price}`
                )}
            </Modal>
        </>
    );
};

export default StorePersonalizationAvatar;
