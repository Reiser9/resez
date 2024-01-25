'use client';

import React from 'react';
import { Tooltip } from 'antd';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import { CONFIG } from '../../consts/CONFIG';

import { formatDate } from '../../utils/formatDate';

import useCopyText from '@/features/utils/useCopyText';
import { UserAdmin } from '@/entities/user/model';
import { Badge } from '../Badge';
import { Button, IconButton } from '../Button';
import { TextPoint } from '../TextPoint';
import { Notify, Stop, Verified } from '@/shared/icons';
import { LoaderForItem } from '../Preloader';
import { Text } from '../Text';
import { ConfirmModal } from '../Modal';

type Props = {
    data?: UserAdmin;
    userBlock?: () => void;
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
        level,
        xp,
        xpLimit,
        nickname,
        roles,
        id,
        firstName,
        lastName,
        status,
        registrationDate,
        isOnline,
        lastActivity,
    } = data || {};
    const [confirmBlock, setConfirmBlock] = React.useState(false);
    const [confirmUnblock, setConfirmUnblock] = React.useState(false);

    const { copyTextWithNotify } = useCopyText();

    return (
        <>
            <div className={styles.userItem}>
                <div className={styles.userInfoInner}>
                    <div className={styles.userAvatarInner}>
                        <Badge size='big' image={avatar} text={nickname} />

                        {isOnline ? (
                            <Tooltip title="Онлайн">
                                <div className={styles.userOnline}></div>
                            </Tooltip>
                        ) : (
                            <Tooltip title="Оффлайн">
                                <div className={styles.userOffline}></div>
                            </Tooltip>
                        )}

                        {isVerified && (
                            <Tooltip title="Верифицирован">
                                <div className={styles.userVerified}>
                                    <Verified className={styles.userVerifiedIcon} />
                                </div>
                            </Tooltip>
                        )}
                    </div>

                    <div className={styles.userInfo}>
                        {firstName && lastName && (
                            <Text className={styles.userInfoName}>{`${firstName} ${lastName}`}</Text>
                        )}

                        {nickname && (
                            <Tooltip title="Скопировать">
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

                    {status && <TextPoint title="Статус" text={status} />}
                    {!isOnline && (
                        <TextPoint
                            title="Был(а) в сети"
                            text={lastActivity ? formatDate(lastActivity) : 'Неизвестно'}
                        />
                    )}
                    {registrationDate && (
                        <TextPoint title="Дата регистрации" text={formatDate(registrationDate, 'DD.MM.YYYY в HH:mm')} />
                    )}

                    {!!roles?.length && (
                        <TextPoint title="Роли">
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
                </div>

                <div className={styles.userItemWrapper}>
                    <div className={styles.userLvlInner}>
                        <p className={styles.userLvlPoint}>{level || 1}</p>

                        <div className={styles.userLvlProgressTotal}>
                            <div
                                className={styles.userLvlProgressLine}
                                style={{ width: `${((xp || 0) / (xpLimit || 1)) * 100}%` }}
                            ></div>

                            <Text variant="text3" className={styles.userLvlExp}>
                                {xp || 0} / {xpLimit || 0}
                            </Text>
                        </div>

                        <p className={styles.userLvlPoint}>{(level || 1) + 1}</p>
                    </div>

                    <div className={styles.userItemButtons}>
                        <Button variant="light">
                            Подробнее
                        </Button>
                        
                        {!isBlocked && (notify || block) && (
                            <>
                                {notify && (
                                    <Tooltip title="Уведомление">
                                        <IconButton variant="light" className={styles.userItemButtonIcons}>
                                            <Notify />
                                        </IconButton>
                                    </Tooltip>
                                )}

                                {block && (
                                    <Tooltip title="Заблокировать">
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
                        <Text className={styles.userItemBlockText}>Пользователь заблокирован</Text>

                        <Button onClick={() => setConfirmUnblock(true)}>Разблокировать</Button>
                    </div>
                )}

                {loading && <LoaderForItem />}
            </div>

            <ConfirmModal
                value={confirmBlock}
                setValue={setConfirmBlock}
                text={`Вы действительно хотите заблокировать пользователя ${nickname || ''}`}
                confirmText="Заблокировать"
                rejectText="Отмена"
                callback={userBlock}
            />

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
