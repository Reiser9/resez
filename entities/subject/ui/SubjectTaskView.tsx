'use client';

import React from 'react';
import { Checkbox } from 'antd';

import styles from './index.module.scss';

import type { CreatedTask } from '@/entities/subject';

import { FakeInput } from '@/shared/ui/Input';

type Props = {
    task: CreatedTask;
};

const SubjectTaskView: React.FC<Props> = ({ task }) => {
    const { isDetailedAnswer, primaryScore, subThemes, theme, tasksCount, number } = task || {};

    return (
        <div className={styles.subjectTaskItem}>
            <p className={styles.subjectTaskNum}>{number}</p>

            <FakeInput title="Тема задания:" value={theme} />
            <FakeInput title="Первичный балл:" value={`${primaryScore}`} />

            <Checkbox checked={isDetailedAnswer}>Развернутый ответ</Checkbox>

            {subThemes.map((theme, subThemeId) => (
                <FakeInput
                    key={`subthemeId_${subThemeId}`}
                    title={`Подтема (${theme.tasksCount || 0})`}
                    value={theme?.subTheme}
                />
            ))}
        </div>
    );
};

export default SubjectTaskView;
