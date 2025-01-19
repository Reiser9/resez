'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import cn from 'classnames';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import { Input } from '@/shared/ui/Input';
import { DynamicSkeleton } from '@/shared/ui/Skeleton';
import { Text } from '@/shared/ui/Text';
import { TestTask } from '@/entities/test';

const CustomHtmlParser = dynamic(() => import('@/shared/ui/CustomHtmlParser/CustomHtmlParser'), {
    ssr: false,
    loading: () => <DynamicSkeleton />,
});

type Props = {
    data: TestTask;
    taskWithLink?: boolean;
    setValue: (id: number, value: string) => void;
};

const TaskTestItemWithAnswer: React.FC<Props> = ({ data, setValue }) => {
    const { id, task, subTheme, subjectTask } = data || {};
    const { number, theme, isDetailedAnswer } = subjectTask || {};
    const { subTheme: subThemeName } = subTheme || {};

    return (
        <div className={styles.taskTestItem}>
            <Link prefetch={false} href={`/task/${id}`} className={styles.taskItemWrapper}>
                <span className={base.titleWrapper}>
                    <span className={base.circle32}>{number}</span>

                    <Text variant="h4">Задание</Text>
                </span>

                {theme && <p className={styles.taskTheme}>{theme}</p>}

                {subTheme && <p className={styles.taskTheme}>{subThemeName}</p>}
            </Link>

            {task && (
                <div className={base.format}>
                    <CustomHtmlParser html={task} />
                </div>
            )}

            {isDetailedAnswer ? (
                <p className={styles.taskTestItemDetailed}>
                    Задание проверяется самостоятельно, решите данное задание в тетради и на следующей странице вы
                    сможете проверить его
                </p>
            ) : (
                <div className={cn(base.baseWrapperGap4, styles.testTaskItemAnswer)}>
                    <p className={styles.answerTitle}>Ответ:</p>

                    <Input setValue={(e) => setValue(id, String(e))} color="white" />
                </div>
            )}
        </div>
    );
};

export default TaskTestItemWithAnswer;
