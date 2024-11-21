'use client';

import React from 'react';
import Link from 'next/link';
import { Tooltip } from 'antd';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import type { UserAdmin } from '@/entities/user/model';
import { CONFIG } from '@/shared/consts/CONFIG';
import useCopyText from '@/features/utils/useCopyText';
import { Notify, ResCoin, Stop, Verified } from '@/shared/icons';
import { getFormattedDate } from '@/shared/utils/getFormattedDate';

import { Badge } from '@/shared/ui/Badge';
import { Button, IconButton } from '@/shared/ui/Button';
import { TextPoint } from '@/shared/ui/TextPoint';
import { LoaderForItem } from '@/shared/ui/Preloader';
import { Text } from '@/shared/ui/Text';
import { ConfirmModal, Modal } from '@/shared/ui/Modal';
import { Input } from '@/shared/ui/Input';

type Props = {
    data?: UserAdmin;
    userBlock?: (reason: string) => void;
    userUnblock?: () => void;
    loading?: boolean;
    notify?: boolean;
    block?: boolean;
};

const UserItem: React.FC<Props> = ({
    data,
    loading = false,
    userBlock = () => {},
    userUnblock = () => {},
    notify = false,
    block = false,
}) => {
    const {
        avatar,
        isBlocked,
        isVerified,
        levelInfo,
        nickname,
        roles,
        id,
        firstName,
        lastName,
        registrationDate,
        activity,
        balance,
        subscription,
        telegramUsername,
    } = data || {};
    const { level, limit, xp } = levelInfo || {};
    const { isOnline, lastSeen } = activity || {};
    const [confirmBlock, setConfirmBlock] = React.useState(false);
    const [confirmUnblock, setConfirmUnblock] = React.useState(false);
    const [blockReason, setBlockReason] = React.useState('');

    const { copyTextWithNotify } = useCopyText();

    return (
        <>
            <div className={styles.userItem}>
                <div className={styles.userInfoInner}>
                    <div className={styles.userAvatarInner}>
                        <Link prefetch={false} href={`/user/${nickname}`}>
                            <Badge isUserAvatar size="big" image={avatar} text={nickname} />
                        </Link>

                        {isOnline ? (
                            <Tooltip destroyTooltipOnHide title="Онлайн">
                                <div className={styles.userOnline}></div>
                            </Tooltip>
                        ) : (
                            <Tooltip destroyTooltipOnHide title="Оффлайн">
                                <div className={styles.userOffline}></div>
                            </Tooltip>
                        )}

                        {isVerified && (
                            <Tooltip destroyTooltipOnHide title="Верифицирован">
                                <div className={styles.userVerified}>
                                    <Verified className={styles.userVerifiedIcon} />
                                </div>
                            </Tooltip>
                        )}
                    </div>

                    <div className={styles.userInfo}>
                        {firstName && lastName && (
                            <Link prefetch={false} href={`/user/${nickname}`}>
                                <Text className={styles.userInfoName}>{`${firstName} ${lastName}`}</Text>
                            </Link>
                        )}

                        {nickname && (
                            <Tooltip destroyTooltipOnHide title="Скопировать">
                                <Text
                                    variant="text2"
                                    className={styles.userInfoNickname}
                                    onClick={() => copyTextWithNotify(nickname, 'Имя пользователя скопировано')}
                                >
                                    {nickname}
                                </Text>
                            </Tooltip>
                        )}
                    </div>
                </div>

                <div className={base.baseWrapperGap12}>
                    <div className={base.titleInnerNowrap}>
                        {id && <TextPoint title="ID" text={`${id}`} />}

                        {/* {theme && (
                            <TextPoint title="Тема:">
                                <div
                                    className={styles.userThemeCircle}
                                    style={{ background: theme?.primary || CONFIG.BASE_COLOR }}
                                ></div>
                            </TextPoint>
                        )} */}
                    </div>

                    {!isOnline && (
                        <TextPoint title="Был(а) в сети" text={lastSeen ? getFormattedDate(lastSeen) : 'Неизвестно'} />
                    )}
                    {registrationDate && (
                        <TextPoint title="Дата регистрации" text={getFormattedDate(registrationDate)} />
                    )}

                    {!!roles?.length && (
                        <TextPoint title={roles.length === 1 ? 'Роль' : 'Роли'}>
                            <div className={styles.userRoles}>
                                {roles.map((data, id) => (
                                    <p
                                        key={id}
                                        className={styles.userRole}
                                        style={{
                                            color: data?.textColor || CONFIG.BASE_COLOR,
                                            background: data?.backgroundColor || CONFIG.BASE_COLOR,
                                        }}
                                    >
                                        {data.role}
                                    </p>
                                ))}
                            </div>
                        </TextPoint>
                    )}

                    <TextPoint title="Баланс">
                        <div className={styles.userBalance}>
                            {balance || 0}

                            <ResCoin />
                        </div>
                    </TextPoint>

                    {telegramUsername && (
                        <TextPoint title="Телеграм никнейм">
                            <a
                                href={`https://t.me/${telegramUsername}`}
                                className={styles.telegramLink}
                                target="_blanc"
                            >
                                @{telegramUsername}
                            </a>
                        </TextPoint>
                    )}
                </div>

                <div className={styles.userItemWrapper}>
                    <div className={styles.userItemButtons}>
                        <Button variant="light" href={`/admin/users/${id}`}>
                            Подробнее
                        </Button>

                        {!isBlocked && (notify || block) && (
                            <>
                                {notify && (
                                    <Tooltip destroyTooltipOnHide title="Уведомление">
                                        <IconButton
                                            variant="light"
                                            href={`/admin/notifies?users=${id}`}
                                            className={styles.userItemButtonIcons}
                                        >
                                            <Notify />
                                        </IconButton>
                                    </Tooltip>
                                )}

                                {block && (
                                    <Tooltip destroyTooltipOnHide title="Заблокировать">
                                        <IconButton
                                            variant="danger"
                                            className={styles.userItemButtonIcons}
                                            onClick={() => setConfirmBlock(true)}
                                        >
                                            <Stop />
                                        </IconButton>
                                    </Tooltip>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {isBlocked && (
                    <div className={styles.userItemBlock}>
                        <Text textClassName={styles.userItemBlockText}>Пользователь заблокирован</Text>

                        <Button onClick={() => setConfirmUnblock(true)}>Разблокировать</Button>
                    </div>
                )}

                {loading && <LoaderForItem />}
            </div>

            <Modal value={confirmBlock} setValue={setConfirmBlock} size="small" title="Подтвердите действие">
                <Text>Вы действительно хотите заблокировать пользователя {nickname || ''}?</Text>

                <Input
                    value={blockReason}
                    setValue={setBlockReason}
                    placeholder="Введите текст"
                    title="Причина блокировки"
                    variant="textarea"
                    trackLength
                    lengthLimit={75}
                />

                <Button
                    variant="light"
                    color="danger"
                    onClick={() => {
                        userBlock(blockReason);
                        setConfirmBlock(false);
                        setBlockReason('');
                    }}
                >
                    Заблокировать
                </Button>
            </Modal>

            <ConfirmModal
                value={confirmUnblock}
                setValue={setConfirmUnblock}
                text={`Вы действительно хотите разблокировать пользователя ${nickname || ''}`}
                confirmText="Разблокировать"
                rejectText="Отмена"
                callback={userUnblock}
            />
        </>
    );
};

export default UserItem;
