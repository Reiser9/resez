'use client';

import React from 'react';
import cn from 'classnames';
import { useQuery } from '@tanstack/react-query';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import { Cross, Stats } from '@/shared/icons';
import { useStats } from '@/features/admin';

import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';
import { Text } from '@/shared/ui/Text';
import { FakeInput, SearchInput } from '@/shared/ui/Input';
import { Select } from '@/shared/ui/Select';

const chartData = [
    {
        name: '22.11',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: '23.11',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: '24.11',
        uv: 2000,
        pv: 7800,
        amt: 2290,
    },
    {
        name: '25.11',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: '26.11',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: '27.11',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: '28.11',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

const chartData2 = [
    {
        name: '22.11',
        uv: 2000,
        pv: 2600,
        amt: 1400,
    },
    {
        name: '23.11',
        uv: 2000,
        pv: 1898,
        amt: 2210,
    },
    {
        name: '24.11',
        uv: 2000,
        pv: 1200,
        amt: 2290,
    },
    {
        name: '25.11',
        uv: 1280,
        pv: 2908,
        amt: 24200,
    },
    {
        name: '26.11',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: '27.11',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: '28.11',
        uv: 3490,
        pv: 300,
        amt: 2100,
    },
];

const AdminPage = () => {
    const [chartValue, setChartValue] = React.useState('day');

    const { getAdminStats } = useStats();

    const { data, isPending, isError } = useQuery({
        queryKey: ['admin_stat'],
        queryFn: getAdminStats,
        refetchInterval: 5000,
    });

    const { adminsCount, blockedUsersCount, online, usersCount } = data || {};

    if (isPending) {
        return <Preloader page />;
    }

    return (
        <div className={base.baseWrapperGap16}>
            <Text variant="h3">Статистика</Text>

            {isError ? (
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

            <div className={styles.adminChart}>
                <Select
                    value={chartValue}
                    onChange={(value) => setChartValue(value)}
                    title="Периодичность"
                    className={styles.adminChartSelect}
                    options={[
                        { label: 'За сегодня', value: 'day' },
                        { label: 'За неделю', value: 'week' },
                    ]}
                />

                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartValue === 'day' ? chartData : chartData2}>
                        <XAxis dataKey="name" />
                        <Tooltip />
                        <Line type="monotone" dataKey="pv" stroke="#007cee" activeDot={{ r: 6 }} />
                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AdminPage;
