'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Lottie from 'lottie-react';
import cn from 'classnames';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { QRCode, Tooltip } from 'antd';
import { useQuery } from '@tanstack/react-query';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import {
    Block,
    Delete,
    DotsHorizontal,
    Edit,
    Lvl20,
    Lvl30,
    Lvl75,
    Message,
    Paintbruh,
    Qr,
    Send,
    User,
} from '@/shared/icons';
import { Handshake } from '@/shared/icons/awards/Handshake';
import useCopyText from '@/features/utils/useCopyText';
import { CONFIG } from '@/shared/consts/CONFIG';
import { useProfileData } from '@/features/user';
import { useThemeContext } from '@/shared/context/ThemeProvider';
import { useDialog } from '@/features/messenger';
import ScrollWithArrows from '@/shared/ui/ScrollWithArrow/ScrollWithArrow';
import { useAppSelector } from '@/shared/hooks/useRedux';
import useShortInfo from '@/features/user/data/useShortInfo';

import { Modal } from '@/shared/ui/Modal';
import { Input } from '@/shared/ui/Input';
import { Preloader } from '@/shared/ui/Preloader';
import { Text } from '@/shared/ui/Text';
import { Button, IconButton } from '@/shared/ui/Button';
import { HoverMenu, MenuLink } from '@/shared/ui/HoverMenu';
import { Badge } from '@/shared/ui/Badge';

const UserProfileWrapper = ({ children }: { children: React.ReactNode }) => {
    const [moreProfileMenu, setMoreProfileMenu] = React.useState(false);
    const [qrModal, setQrModal] = React.useState(false);
    const [messageModal, setMessageModal] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [sendMessageIsLoading, setSendMessageIsLoading] = React.useState(false);

    const { nickname } = useParams();
    const isAuth = useAppSelector((state) => state.user.isAuth);
    const router = useRouter();

    const { copyTextWithNotify } = useCopyText();
    const { getUserProfile } = useProfileData();
    const { getShortInfo } = useShortInfo();
    const { sendStartMessageUser } = useDialog();
    const { theme } = useThemeContext();
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

    const sendMessage = async () => {
        setSendMessageIsLoading(true);
        const data = await sendStartMessageUser(String(userId), message, () => {
            setMessageModal(false);
            setMessage('');
        });
        setSendMessageIsLoading(false);

        if (data) {
            router.push(`/messenger/${data.chatId}`);
        }
    };

    const { id: userId, avatar, firstName, lastName, nickname: userNickname, avatarDecoration } = data || {};
    const { contentUrl, title, options, contentType } = avatarDecoration || {};
    const { width, x, y } = options || {};

    const [animationData, setAnimationData] = React.useState<any | null>(null);

    React.useEffect(() => {
        const fetchAnimationData = async () => {
            try {
                if (!contentUrl) {
                    return;
                }
                const response = await fetch(contentUrl);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAnimationData(data);
            } catch (error) {
                console.error('Error fetching animation data:', error);
            }
        };

        if (contentType === 'animation') {
            fetchAnimationData();
        }
    }, [contentUrl, contentType]);

    React.useEffect(() => {
        if (userNickname && userNickname === myNickname) {
            router.replace('/profile');
        }
    }, [userNickname, myNickname]);

    if (isLoading) {
        return <Preloader page />;
    }

    return (
        <>
            <div className={base.baseWrapperGap16}>
                <div className={base.baseWrapperGap0}>
                    <div className={styles.profileBannerInner}>
                        <Image src="/img/banner.jpg" alt="banner" className={styles.profileBanner} fill />

                        {/* <Link href="/personalization" className={styles.dataPersonalizationButton}>
                            <Paintbruh />
                            Персонализация
                        </Link> */}

                        <div className={styles.profileAvatarInner}>
                            <Badge isUserAvatar image={avatar} text={userNickname} style={{ width: 92, height: 92 }} />

                            {/* <Link href="/profile/data" className={styles.profileAvatarLink}>
                                Изменить
                            </Link> */}

                            {/* <Tooltip title="Тема пользователя" placement="bottom">
                                <div
                                    className={styles.profileInfoTheme}
                                    style={{ background: CONFIG.BASE_COLOR }} //theme?.primary || CONFIG.BASE_COLOR
                                ></div>
                            </Tooltip> */}

                            {avatarDecoration && (
                                <div className={styles.avatarDecorationWrapper}>
                                    {contentType === 'animation' ? (
                                        <Lottie
                                            animationData={animationData}
                                            className={base.avatarDecoration}
                                            style={{ width: width, top: y, left: x }}
                                        />
                                    ) : (
                                        <>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={contentUrl}
                                                alt={title}
                                                className={base.avatarDecoration}
                                                style={{ width: width, top: y, left: x }}
                                            />
                                        </>
                                    )}
                                </div>
                            )}
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
                                    onClick={() => copyTextWithNotify(userNickname, 'Имя пользователя скопировано')}
                                >
                                    {nickname}
                                </Text>
                            </Tooltip>
                        </div>

                        <div className={styles.profileInfoItem}>
                            {isAuth && (
                                <Button small variant="light" onClick={() => setMessageModal(true)}>
                                    <Message />
                                    Сообщение
                                </Button>
                            )}

                            <Tooltip title="QR-код профиля">
                                <IconButton small variant="light" onClick={() => setQrModal(true)}>
                                    <Qr />
                                </IconButton>
                            </Tooltip>

                            {/* <HoverMenu
                                button={
                                    <IconButton
                                        small
                                        variant="light"
                                        onClick={() => setMoreProfileMenu((prev) => !prev)}
                                    >
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
                            </HoverMenu> */}
                        </div>
                    </div>
                </div>

                <ScrollWithArrows>
                    <Link
                        href={`/user/${nickname}`}
                        replace
                        className={cn(base.tag, {
                            [base.active]: path === `/user/${nickname}`,
                        })}
                    >
                        Главная
                    </Link>

                    <Link
                        href={`/user/${nickname}/collections`}
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

                            <Tooltip title={`Опыта до нового уровня: 375`}>
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
                </div> */}
            </div>

            <Modal title="QR-код" value={qrModal} setValue={setQrModal} size="small">
                <div className={styles.profileQrModal}>
                    <QRCode
                        color={theme === 'dark' ? '#fff' : '#000'}
                        errorLevel="H"
                        value={window.location.href}
                        icon="/img/logo-circle.svg"
                        size={140}
                        iconSize={38}
                    />
                </div>
            </Modal>

            <Modal title="Написать сообщение" value={messageModal} setValue={setMessageModal} size="small">
                <div className={styles.profileMessageModal}>
                    <Input value={message} setValue={setMessage} placeholder="Введите сообщение" variant="textarea" />

                    <Button variant="light" onClick={sendMessage} loading={sendMessageIsLoading}>
                        Отправить
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default UserProfileWrapper;
