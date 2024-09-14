'use client';

import React from 'react';
import cn from 'classnames';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { useTest } from '@/features/test';
import { formatTime } from '@/shared/utils/formatSeconds';

import { BackButton } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';

const TestsHistoryId = () => {
    const { id } = useParams();
    const { getTestHistoryById } = useTest();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['test_history_by_id', id],
        queryFn: () => getTestHistoryById(String(id)),
        enabled: !!id,
    });

    const {
        primaryScore,
        maxPrimaryScore,
        grade,
        subject,
        secondaryScore,
        secondsSpent,
        durationMinutes,
        createdAt,
        testId,
        task,
        user
    } = data || {};

    return (
        <>
            <div className={base.titleWrapper}>
                <BackButton />

                <Text variant="h3">История решения</Text>
            </div>

            <div className={cn(base.baseWrapperGap4, base.aic)}>
                {grade ? (
                    <p className={styles.testResultTitle}>
                        Ваша оценка: <span>{grade || 0}</span>
                    </p>
                ) : (
                    <p className={styles.testResultTitle}>
                        Вы набрали <span>{secondaryScore || 0}</span> из <span>100</span> баллов
                    </p>
                )}

                <p className={styles.testResultSubtitle}>
                    Набрано первичных баллов: {primaryScore} из {maxPrimaryScore}
                </p>

                {secondsSpent && (
                    <p className={styles.testResultSubtitle}>Затрачено времени: {formatTime(secondsSpent)}</p>
                )}
            </div>
        </>
    );
};

export default TestsHistoryId;
