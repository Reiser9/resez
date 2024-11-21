'use client';

import React from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { Block, Cross, Delete, DotsHorizontal, Edit, Message, Paintbruh, Qr, Send, User } from '@/shared/icons';
import { Handshake } from '@/shared/icons/awards/Handshake';
import { useProfileData } from '@/features/user';
import { ScrollWithArrows } from '@/shared/ui/ScrollWithArrows';
import { useAppSelector } from '@/shared/hooks/useRedux';
import useShortInfo from '@/features/user/data/useShortInfo';

import { Preloader } from '@/shared/ui/Preloader';
import { Text } from '@/shared/ui/Text';
import { Button, IconButton } from '@/shared/ui/Button';
import { HoverMenu, MenuLink } from '@/shared/ui/HoverMenu';
import { Badge } from '@/shared/ui/Badge';
import { UserProfileOverlay } from '@/entities/user/ui';
import { NotContent } from '@/shared/ui/NotContent';

const UserProfileWrapper = ({ children }: { children: React.ReactNode }) => {
    const { nickname } = useParams();
    const isAuth = useAppSelector((state) => state.user.isAuth);
    const router = useRouter();

    const { getUserProfile } = useProfileData();
    const { getShortInfo } = useShortInfo();

    const path = usePathname();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['user_profile_by_id', nickname],
        queryFn: () => getUserProfile(String(nickname)),
        enabled: !!nickname,
    });

    const { data: user, isLoading: userIsLoading } = useQuery({
        queryKey: ['short_info'],
        queryFn: () => getShortInfo(),
        enabled: isAuth,
    });

    const { nickname: myNickname } = user?.user || {};
    const { nickname: userNickname } = data || {};

    React.useEffect(() => {
        if (userNickname && userNickname === myNickname) {
            router.replace('/profile');
        }
    }, [userNickname, myNickname]);

    if (isLoading || userIsLoading) {
        return <Preloader page />;
    }

    if (isError) {
        return <NotContent icon={<Cross />} danger text="Произошла ошибка при загрузке данных" />;
    }

    return (
        <>
            <div className={base.baseWrapperGap16}>
                <div className={base.baseWrapperGap0}>{!!data && <UserProfileOverlay data={data} />}</div>

                <ScrollWithArrows>
                    <Link
                        href={`/user/${nickname}`}
                        prefetch={false}
                        replace
                        className={cn(base.tag, {
                            [base.active]: path === `/user/${nickname}`,
                        })}
                    >
                        Главная
                    </Link>

                    <Link
                        href={`/user/${nickname}/collections`}
                        prefetch={false}
                        replace
                        className={cn(base.tag, {
                            [base.active]: path === `/user/${nickname}/collections`,
                        })}
                    >
                        Коллекции
                    </Link>
                </ScrollWithArrows>

                {children}

                {/* <div className={styles.profileWrapper}>
                    <div className={styles.profileSidebar}>
                        <div className={styles.profileSidebarLvlContent}>
                            <p className={styles.profileSidebarLvlValue}>1</p>

                            <Tooltip destroyTooltipOnHide title={`Опыта до нового уровня: 375`}>
                                <div className={styles.profileSidebarLvl}>
                                    <div className={styles.profileSidebarLvlBar}>
                                        <div
                                            className={styles.profileSidebarLvlProgress}
                                            style={{ width: `25%` }}
                                        ></div>
                                    </div>

                                    <div className={styles.profileSidebarLvlValues}>
                                        <Text variant="text3" className={styles.profileSidebarLvlExpValue}>
                                            125
                                        </Text>

                                        <Text variant="text3" className={styles.profileSidebarLvlExpValue}>
                                            500
                                        </Text>
                                    </div>
                                </div>
                            </Tooltip>
                        </div>

                        <div className={base.baseWrapperGap12}>
                            <div className={styles.profileSidebarValues}>
                                <p className={styles.profileSidebarValueTitle}>Друзья (102)</p>

                                <Link href="/friends" className={styles.profileSidebarValueLink}>
                                    Все
                                </Link>
                            </div>

                            <div className={styles.profileSidebarFriendList}>
                                <Link href="/user/reiser95" className={styles.profileSidebarFriendItem}>
                                    <Badge text="R" size="big" />

                                    <p className={styles.profileSidebarFriendItemName}>Егор</p>
                                </Link>

                                <Link href="/user/reiser95" className={styles.profileSidebarFriendItem}>
                                    <Badge text="R" size="big" />

                                    <p className={styles.profileSidebarFriendItemName}>Василий</p>
                                </Link>
                            </div>
                        </div>

                        <div className={base.baseWrapperGap12}>
                            <div className={styles.profileSidebarValues}>
                                <p className={styles.profileSidebarValueTitle}>Достижения (41)</p>

                                <Link href="/friends" className={styles.profileSidebarValueLink}>
                                    Все
                                </Link>
                            </div>

                            <div className={styles.profileSidebarAchievementList}>
                                <div className={styles.profileSidebarAchievementItem}>
                                    <div className={styles.profileSidebarAchievementInner}>
                                        <Lvl20 />
                                    </div>
                                </div>

                                <div className={styles.profileSidebarAchievementItem}>
                                    <div className={styles.profileSidebarAchievementInner}>
                                        <Lvl30 />
                                    </div>
                                </div>

                                <div className={styles.profileSidebarAchievementItem}>
                                    <div className={styles.profileSidebarAchievementInner}>
                                        <Lvl75 />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={base.baseWrapperGap12}>
                            <div className={styles.profileSidebarValues}>
                                <p className={styles.profileSidebarValueTitle}>Награды (4)</p>

                                <Link href="/friends" className={styles.profileSidebarValueLink}>
                                    Все
                                </Link>
                            </div>

                            <div className={styles.profileSidebarAchievementList}>
                                <div className={styles.profileSidebarAchievementItem}>
                                    <Tooltip
                                        destroyTooltipOnHide
                                        className={styles.profileSidebarAchievementInner}
                                        title="За помощь в развитии проекта"
                                    >
                                        <Handshake />
                                    </Tooltip>
                                </div>

                                <div className={styles.profileSidebarAchievementItem}>
                                    <Tooltip destroyTooltipOnHide className={styles.profileSidebarAchievementInner} title="Заголовок">
                                        <Lvl30 />
                                    </Tooltip>
                                </div>

                                <div className={styles.profileSidebarAchievementItem}>
                                    <Tooltip destroyTooltipOnHide className={styles.profileSidebarAchievementInner} title="Заголовок">
                                        <Lvl75 />
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </>
    );
};

export default UserProfileWrapper;
