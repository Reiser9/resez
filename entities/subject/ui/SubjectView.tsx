'use client';

import React from 'react';
import { Checkbox } from 'antd';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import type { CreatedSubject } from '../model';
import { formatDate } from '@/shared/utils/formatDate';
import SubjectTaskView from './SubjectTaskView';

import { FakeInput } from '@/shared/ui/Input';
import { Text } from '@/shared/ui/Text';

type Props = {
    subject: CreatedSubject;
};

const SubjectView: React.FC<Props> = ({ subject }) => {
    const {
        subject: subjectName,
        slug,
        durationMinutes,
        order,
        isMark,
        isPublished,
        subjectTasks,
        createdAt,
        updatedAt,
        isArchived,
    } = subject;

    return (
        <>
            <FakeInput title="Предмет:" value={subjectName} />
            <FakeInput title="Ярлык предмета:" value={slug} />
            <FakeInput title="Длительность экзамена в минутах:" value={`${durationMinutes}`} />
            <FakeInput title="Позиция:" value={`${order}`} />
            <FakeInput title="Дата создания:" value={formatDate(createdAt)} />
            <FakeInput title="Дата последнего редактирования:" value={formatDate(updatedAt)} />

            <Checkbox checked={isPublished}>Опубликован</Checkbox>
            <Checkbox checked={isMark}>Оценочный предмет</Checkbox>
            <Checkbox checked={isArchived}>В архиве</Checkbox>

            <div className={styles.subjectTasksInner}>
                <Text variant="text2">Задания: {subjectTasks.length}</Text>

                <div className={styles.subjectTasksContent}>
                    {subjectTasks.map((task) => (
                        <SubjectTaskView key={task.id} task={task} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default SubjectView;
