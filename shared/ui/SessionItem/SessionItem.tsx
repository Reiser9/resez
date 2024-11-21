'use client';

import React from 'react';
import cn from 'classnames';
import { Tooltip } from 'antd';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import { getDeviceByName } from '../../utils/getDeviceByName';
import type { Session } from '@/entities/user/session';
import { getFormattedDate } from '@/shared/utils/getFormattedDate';

import { Text } from '../Text';
import { ConfirmModal } from '../Modal';
import { TextPoint } from '../TextPoint';
import { Button } from '../Button';

type Props = {
    current?: boolean;
    data?: Session;
    active?: boolean;
    callback?: () => void;
    loading?: boolean;
};

const SessionItem: React.FC<Props> = ({ current = false, data, active = false, callback, loading = false }) => {
    const { isActive, browser, deviceType, date, ip, country, city, browserVersion, os, platform, id } = data || {};

    const [confirmEndSession, setConfirmEndSession] = React.useState(false);

    return (
        <>
            <div
                data-session={id}
                className={cn(base.item3, styles.sessionItem, {
                    [styles.disabled]: !isActive,
                    [styles.active]: active,
                })}
            >
                <Tooltip destroyTooltipOnHide title={getDeviceByName(deviceType)?.name}>
                    <div className={styles.sessionItemIcon}>{getDeviceByName(deviceType)?.icon}</div>
                </Tooltip>

                <div className={`${styles.sessionItemPoints} ${base.baseWrapperGap12}`}>
                    <div className={base.baseWrapperGap0}>
                        <Text variant="text3" className={styles.sessionItemPointTitle}>
                            Статус
                        </Text>

                        {current ? (
                            <Text className={styles.currentSession}>Текущий сеанс</Text>
                        ) : (
                            <Text>{isActive ? 'Активный' : 'Завершен'}</Text>
                        )}
                    </div>

                    <TextPoint title="Браузер" text={browser ? `${browser} ${browserVersion}` : 'Неопределен'} />
                    <TextPoint title="Операционная система" text={os ? os : 'Неопределена'} />
                    <TextPoint title="Платформа" text={platform ? platform : 'Неопределена'} />
                    <TextPoint title="IP адрес" text={ip ? ip : 'Неопределен'} />
                    {(country || city) && <TextPoint title="Местоположение" text={`${city} ${country}`} />}
                    {date && <TextPoint title="Дата" text={getFormattedDate(date)} />}
                </div>

                {callback &&
                    (isActive ? (
                        <Button
                            loading={loading}
                            variant="empty"
                            color="danger"
                            className={styles.sessionItemButton}
                            onClick={() => setConfirmEndSession(true)}
                        >
                            Завершить сеанс
                        </Button>
                    ) : (
                        <div className={styles.sessionItemEnded}>Сеанс завершен</div>
                    ))}
            </div>

            {callback && (
                <ConfirmModal
                    value={confirmEndSession}
                    setValue={setConfirmEndSession}
                    callback={callback}
                    loading={loading}
                    text="Вы действительно хотите завершить данный сеанс?"
                    confirmText="Завершить"
                    rejectText="Отмена"
                />
            )}
        </>
    );
};

export default SessionItem;
