'use client';

import React from 'react';
import cn from 'classnames';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { useTest } from '@/features/test';
import { formatTime } from '@/shared/utils/formatSeconds';
import { formatDate } from '@/shared/utils/formatDate';
import { TaskItemResult } from '@/entities/task/ui';

import { BackButton, Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { TextPoint } from '@/shared/ui/TextPoint';
import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';
import { Cross } from '@/shared/icons';

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
        tasks,
        user,
    } = data || {};

    if (isLoading) {
        return <Preloader page />;
    }

    if (isError) {
        return <NotContent text="Произошла ошибка при загрузке данных" danger icon={<Cross />} />;
    }

    return (
        <>
            <div className={base.titleWrapper}>
                <BackButton />

                <Text variant="h3">История решения</Text>
            </div>

            <div className={cn(base.baseWrapperGap4, base.aic)}>
                {grade ? (
                    <Text variant="h4" fontWeight={600}>
                        Ваша оценка: <span>{grade || 0}</span>
                    </Text>
                ) : (
                    <Text variant="h4" fontWeight={600}>
                        Вы набрали <span>{secondaryScore || 0}</span> из <span>100</span> баллов
                    </Text>
                )}

                <p className={styles.testResultSubtitle}>
                    Набрано первичных баллов: {primaryScore} из {maxPrimaryScore}
                </p>

                <Button href={`/test/${testId}`} auto variant="light">
                    Решать тест снова
                </Button>
            </div>

            <div className={base.contentItems}>
                <div className={base.item4}>
                    <TextPoint title="Предмет:" text={subject?.subject} />
                </div>

                {secondsSpent && (
                    <div className={base.item4}>
                        <TextPoint title="Затрачено времени:" text={formatTime(secondsSpent)} />
                    </div>
                )}

                <div className={base.item4}>
                    <TextPoint title="Длительность экзамена:" text={`${durationMinutes} мин.`} />
                </div>

                <div className={base.item4}>
                    <TextPoint title="Дата решения:" text={formatDate(createdAt)} />
                </div>
            </div>

            <div className={base.baseWrapperGap8}>
                {tasks?.map((data) => (
                    <TaskItemResult key={data.id} data={data} />
                ))}
            </div>
        </>
    );
};

export default TestsHistoryId;
