'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Checkbox } from 'antd';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import type { SubjectTaskById } from '../model';

import { FakeInput } from '@/shared/ui/Input';
import { Text } from '@/shared/ui/Text';
import { Badge } from '@/shared/ui/Badge';
import { DynamicSkeleton } from '@/shared/ui/Skeleton';

const CustomHtmlParser = dynamic(() => import('@/shared/ui/CustomHtmlParser/CustomHtmlParser'), {
    ssr: false,
    loading: () => <DynamicSkeleton />,
});

type Props = {
    task: SubjectTaskById;
};

const TaskView: React.FC<Props> = ({ task }) => {
    const {
        source,
        isVerified,
        user,
        subject,
        subjectTask,
        subTheme,
        task: taskContent,
        solution,
        answers,
    } = task || {};
    const { isDetailedAnswer, theme } = subjectTask || {};
    const { nickname, avatar } = user || {};

    return (
        <>
            {/* {nickname && (
                <div className={base.baseWrapperGap4}>
                    <Text variant="text3">Задание создал</Text>

                    <Link prefetch={false} href={`/user/${nickname}`} className={base.titleWrapper}>
                        <Badge text={nickname} image={avatar} />

                        <Text>{nickname}</Text>
                    </Link>
                </div>
            )} */}

            <FakeInput title="Предмет" value={subject.subject} />
            <FakeInput title="Номер задания" value={theme} />
            <FakeInput title="Тема" value={subTheme.subTheme} />

            <Checkbox checked={isVerified}>Задание проверено</Checkbox>

            <div className={base.baseWrapperGap4}>
                <Text variant="text3">Задание</Text>

                <div className={styles.taskViewEditor}>
                    <CustomHtmlParser html={taskContent} />
                </div>
            </div>

            <div className={base.baseWrapperGap4}>
                <Text variant="text3">Решение</Text>

                <div className={styles.taskViewEditor}>
                    <CustomHtmlParser html={solution} />
                </div>
            </div>

            {!isDetailedAnswer && (
                <div className={base.baseWrapperGap4}>
                    <Text variant="text3">
                        Ответ{answers.length > 1 && 'ы'} {answers.length > 1 && `(${answers.length})`}
                    </Text>

                    {!!answers.length && answers.map((answer, id) => <FakeInput key={id} value={answer} />)}
                </div>
            )}

            <FakeInput title="Источник" value={source} />
        </>
    );
};

export default TaskView;
