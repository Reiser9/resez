'use client';

import React from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { Tooltip } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { useProfileData } from '@/features/user';
import { Block, Delete, DotsHorizontal, Edit, Message, Paintbruh, Qr, User } from '@/shared/icons';
import { Handshake } from '@/shared/icons/awards/Handshake';
import { ScrollWithArrows } from '@/shared/ui/ScrollWithArrows';
import { UserProfileOverlay } from '@/entities/user/ui';

import { Text } from '@/shared/ui/Text';
import { NotContent } from '@/shared/ui/NotContent';
import { Preloader } from '@/shared/ui/Preloader';

const tabs = [
    {
        name: 'Коллекции',
        href: '/profile/collections',
    },
];

const ProfilePage = () => {
    const { getProfileData } = useProfileData();

    const { data: profileInfo, isLoading: profileInfoIsLoading } = useQuery({
        queryKey: ['profile_data'],
        queryFn: () => getProfileData(),
    });

    const path = usePathname();

    if (profileInfoIsLoading) {
        return <Preloader page />;
    }

    return (
        <div className={base.baseWrapperGap16}>
            <div className={base.baseWrapperGap0}>
                {!!profileInfo && <UserProfileOverlay myProfile data={profileInfo} />}
            </div>

            {/* <ScrollWithArrows>
                {tabs.map((data, id) => (
                    <Link
                        key={id}
                        href={data.href}
                        replace
                        className={cn(base.tag, {
                            [base.active]: path === data.href,
                        })}
                    >
                        {data.name}
                    </Link>
                ))}
            </ScrollWithArrows> */}

            <NotContent text="Страница в доработке" />

            {/* <div className={styles.profileWrapper}>
                <div className={styles.profileSidebar}>
                    <div className={styles.profileSidebarLvlContent}>
                        <p className={styles.profileSidebarLvlValue}>{level}</p>

                        <Tooltip destroyTooltipOnHide title={`Опыта до нового уровня: ${(limit || 0) - (xp || 0)}`}>
                            <div className={styles.profileSidebarLvl}>
                                <div className={styles.profileSidebarLvlBar}>
                                    <div
                                        className={styles.profileSidebarLvlProgress}
                                        style={{ width: `${(xp || 0) / (limit || 1)}%` }}
                                    ></div>
                                </div>

                                <div className={styles.profileSidebarLvlValues}>
                                    <Text variant="text3" className={styles.profileSidebarLvlExpValue}>
                                        {xp}
                                    </Text>

                                    <Text variant="text3" className={styles.profileSidebarLvlExpValue}>
                                        {limit}
                                    </Text>
                                </div>
                            </div>
                        </Tooltip>
                    </div>

                    <div className={base.baseWrapperGap12}>
                        <div className={styles.profileSidebarValues}>
                            <p className={styles.profileSidebarValueTitle}>Друзья (102)</p>

                            <Link href="/" className={styles.profileSidebarValueLink}>
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

                            <Link href="/" className={styles.profileSidebarValueLink}>
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

                            <Link href="/" className={styles.profileSidebarValueLink}>
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
    );
};

export default ProfilePage;
