'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { QRCode, Tooltip } from 'antd';
import { useRouter } from 'next/navigation';

import styles from './index.module.scss';

import type { UserProfile } from '../model';
import { Message, Paintbruh, Qr } from '@/shared/icons';
import { CONFIG } from '@/shared/consts/CONFIG';
import useCopyText from '@/features/utils/useCopyText';
import { useDialog } from '@/features/messenger';
import { useThemeContext } from '@/shared/context/ThemeProvider';
import { useAppSelector } from '@/shared/hooks/useRedux';

import { Badge } from '@/shared/ui/Badge';
import { AvatarDecoration } from '@/shared/ui/AvatarDecoration';
import { Text } from '@/shared/ui/Text';
import { Button, IconButton } from '@/shared/ui/Button';
import { Modal } from '@/shared/ui/Modal';
import { Input } from '@/shared/ui/Input';

type Props = {
    myProfile?: boolean;
    data: UserProfile;
};

const UserProfileOverlay: React.FC<Props> = ({ myProfile = false, data }) => {
    const [moreProfileMenu, setMoreProfileMenu] = React.useState(false);
    const [qrModal, setQrModal] = React.useState(false);
    const [messageModal, setMessageModal] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [sendMessageIsLoading, setSendMessageIsLoading] = React.useState(false);

    const { theme } = useThemeContext();
    const isAuth = useAppSelector((state) => state.user.isAuth);

    const { id: userId, nickname, avatar, firstName, lastName, avatarDecoration } = data || {};
    const { contentType, title, contentUrl, options } = avatarDecoration || {};

    const { copyTextWithNotify } = useCopyText();
    const { sendStartMessageUser } = useDialog();
    const router = useRouter();

    const sendMessage = async () => {
        if (!message || !message.trim()) {
            return;
        }

        setSendMessageIsLoading(true);
        const data = await sendStartMessageUser(String(userId), message, () => {
            setMessageModal(false);
            setMessage('');
        }).finally(() => setSendMessageIsLoading(false));

        if (data) {
            router.push(`/messenger/${data.chatId}`);
        }
    };

    return (
        <>
            <div className={styles.profileBannerInner}>
                <Image src="/img/banner.jpg" alt="banner" className={styles.profileBanner} fill />

                {myProfile && (
                    <Link prefetch={false} href="/personalization" className={styles.dataPersonalizationButton}>
                        <Paintbruh />
                        Персонализация
                    </Link>
                )}

                <div className={styles.profileAvatarInner}>
                    <Badge image={avatar} text={nickname} style={{ width: 92, height: 92 }} />

                    {myProfile && (
                        <Link prefetch={false} href="profile/data" className={styles.profileAvatarLink}>
                            Изменить
                        </Link>
                    )}

                    {/* <Tooltip destroyTooltipOnHide title="Тема пользователя" placement="bottom">
                        <div
                            className={styles.profileInfoTheme}
                            style={{ background: CONFIG.BASE_COLOR }} //theme?.primary || CONFIG.BASE_COLOR
                        ></div>
                    </Tooltip> */}

                    {avatarDecoration && (
                        <AvatarDecoration
                            contentType={contentType}
                            title={title}
                            contentUrl={contentUrl}
                            options={options}
                        />
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

                    <Tooltip destroyTooltipOnHide title="Скопировать" placement="bottom">
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
                    {!myProfile && isAuth && (
                        <Button small variant="light" onClick={() => setMessageModal(true)}>
                            <Message />
                            Сообщение
                        </Button>
                    )}

                    <Tooltip destroyTooltipOnHide title="QR-код профиля">
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

            <Modal title="QR-код профиля" value={qrModal} setValue={setQrModal} size="small">
                <div className={styles.profileQrModal}>
                    <QRCode
                        color={theme === 'dark' ? '#fff' : '#000'}
                        errorLevel="H"
                        value={window.location.href}
                        icon="/img/logo-circle.svg"
                        size={140}
                        iconSize={38}
                        type="svg"
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

export default UserProfileOverlay;
