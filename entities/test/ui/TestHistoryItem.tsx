'use client';

import React from 'react';
import cn from 'classnames';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import type { TestHistory } from '../model';
import { formatDate } from '@/shared/utils/formatDate';
import { formatTime } from '@/shared/utils/formatSeconds';

import { Button } from '@/shared/ui/Button';
import { TextPoint } from '@/shared/ui/TextPoint';
import { Text } from '@/shared/ui/Text';

type Props = {
    data: TestHistory;
};

const TestHistoryItem: React.FC<Props> = ({ data }) => {
    const {
        id,
        subject,
        secondsSpent,
        createdAt,
        primaryScore,
        secondaryScore,
        maxPrimaryScore,
        grade,
        durationMinutes,
        testId,
    } = data || {};

    return (
        <div className={cn(base.item3, styles.testHistoryItem)}>
            <Text variant="h4">{subject}</Text>

            <TextPoint title="Дата решения:" text={formatDate(createdAt)} />
            <TextPoint title="Затрачено времени:" text={formatTime(secondsSpent)} />
            <TextPoint title="Экзамен длится:" text={formatTime(durationMinutes * 60)} />
            <TextPoint title="Первичные баллы:" text={`${primaryScore} из ${maxPrimaryScore}`} />
            {grade ? (
                <TextPoint title="Оценка:" text={grade} />
            ) : (
                <TextPoint title="Вторичные баллы:" text={`${secondaryScore} из 100`} />
            )}

            <Button href={`/tests/history/${id}`} variant="light">
                Подробнее
            </Button>

            <Button href={`/test/${testId}`} variant="light">
                Решать снова
            </Button>
        </div>
    );
};

export default TestHistoryItem;
