'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Tooltip } from 'antd';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { Text } from '@/shared/ui/Text';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { CONFIG } from '@/shared/consts/CONFIG';
import { useProfileData } from '@/features/user';
import { HoverMenu, MenuLink } from '@/shared/ui/HoverMenu';
import { IconButton } from '@/shared/ui/Button';
import { Block, Delete, DotsHorizontal, Edit, Lvl20, Lvl30, Lvl75, Message, Paintbruh, Qr, User } from '@/shared/icons';
import useCopyText from '@/features/utils/useCopyText';
import { Badge } from '@/shared/ui/Badge';
import { Handshake } from '@/shared/icons/awards/Handshake';

const ProfilePage = () => {
    const [moreProfileMenu, setMoreProfileMenu] = React.useState(false);

    const { user, profileInfo } = useAppSelector((state) => state.user);
    const { avatar, nickname, levelInfo } = user || {};
    const { firstName, lastName } = profileInfo || {};
    const { level, limit, xp } = levelInfo || {};

    const { getProfileData } = useProfileData();
    const { copyTextWithNotify } = useCopyText();

    React.useEffect(() => {
        getProfileData();
    }, []);

    return (
        <div className={base.baseWrapperGap16}>
            <div className={base.baseWrapperGap0}>
                <div className={styles.profileBannerInner}>
                    <Image src="/img/banner.jpg" alt="banner" className={styles.profileBanner} fill />

                    <Link href="/personalization" className={styles.dataPersonalizationButton}>
                        <Paintbruh />
                        Персонализация
                    </Link>

                    <div className={styles.profileAvatarInner}>
                        <Badge image={avatar} text={nickname} style={{width: 92, height: 92}} />

                        <Link href="profile/data" className={styles.profileAvatarLink}>
                            Изменить
                        </Link>

                        <Tooltip title="Тема пользователя" placement="bottom">
                            <div
                                className={styles.profileInfoTheme}
                                style={{ background: CONFIG.BASE_COLOR }} //theme?.primary || CONFIG.BASE_COLOR
                            ></div>
                        </Tooltip>
                    </div>
                </div>

                <div className={styles.profileInfoInner}>
                    <div className={styles.profileInfoNameInner}>
                        {firstName && lastName && (
                            <Text variant="h3">
                                {firstName} {lastName}
                            </Text>
                        )}

                        <Tooltip title="Скопировать" placement="bottom">
                            <Text
                                variant="text2"
                                className={styles.profileInfoNick}
                                onClick={() => copyTextWithNotify(nickname, 'Имя пользователя скопировано')}
                            >
                                {nickname}
                            </Text>
                        </Tooltip>
                    </div>

                    <div className={styles.profileInfoItem}>
                        <Tooltip title="QR-код профиля">
                            <IconButton small variant="light" disabled>
                                <Qr />
                            </IconButton>
                        </Tooltip>

                        <HoverMenu
                            button={
                                <IconButton small variant="light" onClick={() => setMoreProfileMenu((prev) => !prev)}>
                                    <DotsHorizontal />
                                </IconButton>
                            }
                            value={moreProfileMenu}
                            setValue={setMoreProfileMenu}
                        >
                            <MenuLink disabled>
                                <Edit />
                                Редактировать
                            </MenuLink>

                            <MenuLink disabled>
                                <Message />
                                Сообщение
                            </MenuLink>

                            <MenuLink disabled>
                                <User />
                                Добавить в друзья
                            </MenuLink>

                            <MenuLink danger disabled>
                                <Block />
                                Заблокировать
                            </MenuLink>

                            <MenuLink danger disabled>
                                <Delete />
                                Удалить из друзей
                            </MenuLink>
                        </HoverMenu>
                    </div>
                </div>
            </div>

            <div className={styles.profileWrapper}>
                <div className={styles.profileSidebar}>
                    <div className={styles.profileSidebarLvlContent}>
                        <p className={styles.profileSidebarLvlValue}>{level}</p>

                        <Tooltip title={`Опыта до нового уровня: ${(limit || 0) - (xp || 0)}`}>
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
                                    className={styles.profileSidebarAchievementInner}
                                    title="За помощь в развитии проекта"
                                >
                                    <Handshake />
                                </Tooltip>
                            </div>

                            <div className={styles.profileSidebarAchievementItem}>
                                <Tooltip className={styles.profileSidebarAchievementInner} title="Заголовок">
                                    <Lvl30 />
                                </Tooltip>
                            </div>

                            <div className={styles.profileSidebarAchievementItem}>
                                <Tooltip className={styles.profileSidebarAchievementInner} title="Заголовок">
                                    <Lvl75 />
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
