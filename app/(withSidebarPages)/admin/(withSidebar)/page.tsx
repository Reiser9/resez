'use client';

import React from 'react';
import cn from 'classnames';
import { Tooltip } from 'antd';
import { useQuery } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import { Text } from '@/shared/ui/Text';
import { Cross, Stats } from '@/shared/icons';
import { useStats } from '@/features/admin';
import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';

const AdminPage = () => {
    const { getAdminStats } = useStats();

    const { data, isPending, error } = useQuery({
        queryKey: ['admin_stat'],
        queryFn: getAdminStats,
        refetchInterval: 5000
    });

    const { adminsCount, blockedUsersCount, online, usersCount } = data || {};

    if (isPending) {
        return <Preloader page />;
    }

    return (
        <div className={base.baseWrapperGap16}>
            <Text variant="h3">Статистика</Text>

            {error ? (
                <NotContent text="Ошибка при загрузке статистики" icon={<Cross />} danger />
            ) : (
                <div className={styles.adminStats}>
                    <div className={styles.adminStatsContent}>
                        <div className={styles.adminStatsItems}>
                            <div className={styles.adminStatsItem}>
                                <div className={cn(styles.adminStatsNumberInner, styles.success)}>
                                    <div className={styles.adminStatsCircle}></div>

                                    <p className={styles.adminStatsNumber}>{online || 0}</p>
                                </div>

                                <Text variant="text2" className={styles.adminStatsItemText}>
                                    Общий онлайн
                                </Text>
                            </div>

                            {/* <div className={styles.adminStatsItem}>
                                <div className={cn(styles.adminStatsNumberInner, styles.success)}>
                                    <div className={styles.adminStatsCircle}></div>

                                    <p className={styles.adminStatsNumber}>{authUsersOnline || 0}</p>
                                </div>

                                <Text variant="text2" className={styles.adminStatsItemText}>
                                    Онлайн авторизованных
                                </Text>
                            </div> */}

                            {/* <Tooltip title={maxOnlinePerDayDate ? formatDate(maxOnlinePerDayDate) : 'Неизвестно'}>
                                <div className={styles.adminStatsItem}>
                                    <div className={cn(styles.adminStatsNumberInner, styles.success)}>
                                        <div className={styles.adminStatsCircle}></div>

                                        <p className={styles.adminStatsNumber}>{maxOnlinePerDay || 0}</p>
                                    </div>

                                    <Text variant="text2" className={styles.adminStatsItemText}>
                                        Максимальный онлайн за день
                                    </Text>
                                </div>
                            </Tooltip> */}

                            {/* <div className={styles.adminStatsItem}>
                                <div className={cn(styles.adminStatsNumberInner, styles.success)}>
                                    <div className={styles.adminStatsCircle}></div>

                                    <p className={styles.adminStatsNumber}>{uniqueUsersCountPerDay || 0}</p>
                                </div>

                                <Text variant="text2" className={styles.adminStatsItemText}>
                                    Количество уникальных пользователей за день
                                </Text>
                            </div> */}

                            {/* <Tooltip
                                title={
                                    maxTotalOnlineDate
                                        ? formatDate(maxTotalOnlineDate, 'D MMMM YYYY в HH:mm')
                                        : 'Неизвестно'
                                }
                            >
                                <div className={styles.adminStatsItem}>
                                    <div className={cn(styles.adminStatsNumberInner, styles.success)}>
                                        <div className={styles.adminStatsCircle}></div>

                                        <p className={styles.adminStatsNumber}>{maxTotalOnline || 0}</p>
                                    </div>

                                    <Text variant="text2" className={styles.adminStatsItemText}>
                                        Максимальный онлайн
                                    </Text>
                                </div>
                            </Tooltip> */}

                            <div className={styles.adminStatsItem}>
                                <div className={cn(styles.adminStatsNumberInner, styles.info)}>
                                    <div className={styles.adminStatsCircle}></div>

                                    <p className={styles.adminStatsNumber}>{usersCount || 0}</p>
                                </div>

                                <Text variant="text2" className={styles.adminStatsItemText}>
                                    Зарегистрировано аккаунтов
                                </Text>
                            </div>

                            <div className={styles.adminStatsItem}>
                                <div className={cn(styles.adminStatsNumberInner, styles.error)}>
                                    <div className={styles.adminStatsCircle}></div>

                                    <p className={styles.adminStatsNumber}>{blockedUsersCount || 0}</p>
                                </div>

                                <Text variant="text2" className={styles.adminStatsItemText}>
                                    Заблокировано аккаунтов
                                </Text>
                            </div>

                            <div className={styles.adminStatsItem}>
                                <div className={cn(styles.adminStatsNumberInner, styles.warn)}>
                                    <div className={styles.adminStatsCircle}></div>

                                    <p className={styles.adminStatsNumber}>{adminsCount || 0}</p>
                                </div>

                                <Text variant="text2" className={styles.adminStatsItemText}>
                                    Администраторов
                                </Text>
                            </div>
                        </div>

                        <div className={styles.adminStatsIconInner}>
                            <Stats />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPage;
