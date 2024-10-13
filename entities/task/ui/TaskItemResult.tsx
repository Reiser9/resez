'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import cn from 'classnames';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import type { TaskHistory } from '@/entities/test';

import { Text } from '@/shared/ui/Text';
import { DynamicSkeleton } from '@/shared/ui/Skeleton';
import { Spoiler } from '@/shared/ui/Spoiler';
import { FakeInput } from '@/shared/ui/Input';

const CustomHtmlParser = dynamic(() => import('@/shared/ui/CustomHtmlParser/CustomHtmlParser'), {
    ssr: false,
    loading: () => <DynamicSkeleton />,
});

type Props = {
    data: TaskHistory;
};

const TaskItemResult: React.FC<Props> = ({ data }) => {
    const { isCorrect, solution, answers, userAnswer, task, source, subTheme, subjectTask, primaryScore, id } =
        data || {};
    const { primaryScore: taskPrimaryScore, theme, number, isDetailedAnswer } = subjectTask || {};

    return (
        <div
            className={cn(styles.taskTestItem, {
                [styles.wrong]: isCorrect === false || primaryScore === 0,
                [styles.correct]: isCorrect,
                [styles.partTrue]: primaryScore > 0 && primaryScore < taskPrimaryScore,
            })}
        >
            <div className={base.titleInnerNowrap}>
                <Link prefetch={false} href={`/task/${id}`} className={styles.taskItemWrapper}>
                    <span className={base.circle32}>{number ?? '?'}</span>

                    {theme && <p className={styles.taskTheme}>{theme}</p>}

                    {subTheme?.subTheme && <p className={styles.taskTheme}>{subTheme.subTheme}</p>}
                </Link>

                {isCorrect && (
                    <Text fontWeight={600} color="success">
                        Верно
                    </Text>
                )}
                {(isCorrect === false || primaryScore === 0) && (
                    <Text fontWeight={600} color="error">
                        Неверно
                    </Text>
                )}
                {primaryScore > 0 && primaryScore < taskPrimaryScore && (
                    <Text fontWeight={600} color="warn">
                        Частично верно
                    </Text>
                )}
            </div>

            {task && (
                <div className={base.format}>
                    <CustomHtmlParser html={task} />
                </div>
            )}

            <Spoiler title="Решение" defaultOpen={true} theme="white">
                {solution && (
                    <div className={base.format}>
                        <CustomHtmlParser html={solution} />
                    </div>
                )}

                {!!answers?.length && <p className={styles.taskTestItemAnswer}>Ответ: {answers.join(' или ')}</p>}
            </Spoiler>

            {source && <Text fontWeight={600}>Источник: {source}</Text>}

            {userAnswer !== null && <FakeInput title="Ваш ответ:" value={userAnswer || 'Нет ответа'} color="white" />}

            {isDetailedAnswer && (
                <Text fontWeight={600}>
                    Ваша оценка в первичных баллах: {primaryScore} / {taskPrimaryScore}
                </Text>
            )}
        </div>
    );
};

export default TaskItemResult;
