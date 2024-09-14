'use client';

import React from 'react';
import { Checkbox } from 'antd';

import styles from './index.module.scss';

import type { CreatedSubTheme, CreatedTask, SubTheme, Task } from '@/entities/subject';
import { Delete, Plus } from '@/shared/icons';

import { Button, IconButton } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';

type TaskKey = 'theme' | 'primaryScore' | 'isDetailedAnswer' | 'subThemes';

type Props<T> = {
    index: number;
    task: T;
    tasks: T[];
    setTasks: (tasks: T[]) => void;
};

const SubjectTaskItem: React.FC<Props<CreatedTask | Task>> = ({ index, task, tasks, setTasks }) => {
    const removeTask = (id: number) => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(id, 1);
        setTasks(updatedTasks);
    };

    const updateCreatedTask = (id: number, key: TaskKey, value: string | boolean | SubTheme[] | CreatedSubTheme[]) => {
        let updatedTasks = [...tasks];

        updatedTasks[id] = {
            ...updatedTasks[id],
            [key]: value,
        };

        setTasks(updatedTasks);
    };

    const addCreatedSubTheme = (id: number) => {
        const updatedSubThemes = [...tasks];
        const temp = updatedSubThemes[id].subThemes;
        updatedSubThemes[id].subThemes = [
            ...temp,
            {
                subTheme: '',
                tasksCount: 0,
            },
        ];
        setTasks(updatedSubThemes);
    };

    const updateCreatedSubTheme = (taskId: number, themeId: number, value: string) => {
        const updatedSubThemes = [...tasks];
        updatedSubThemes[taskId].subThemes[themeId].subTheme = value;
        setTasks(updatedSubThemes);
    };

    const deleteCreatedSubTheme = (taskId: number, themeId: number) => {
        const updatedSubThemes = [...tasks];
        updatedSubThemes[taskId].subThemes.splice(themeId, 1);
        setTasks(updatedSubThemes);
    };

    return (
        <div className={styles.subjectTaskItem}>
            <div className={styles.subjectTaskItemDelete}>
                <p className={styles.subjectTaskNum}>{index + 1}</p>

                <IconButton variant="danger" small onClick={() => removeTask(index)} disabled={tasks.length <= 1}>
                    <Delete />
                </IconButton>
            </div>

            <Input
                value={task.theme}
                onChange={(e) => updateCreatedTask(index, 'theme', e.target.value)}
                title="Тема задания"
                trackLength
                lengthLimit={150}
            />

            <Input
                value={`${task.primaryScore}`}
                onChange={(e) => updateCreatedTask(index, 'primaryScore', e.target.value)}
                title="Первичный балл"
                lengthLimit={2}
                type="number"
            />

            <Checkbox
                checked={task.isDetailedAnswer}
                onChange={(e) => updateCreatedTask(index, 'isDetailedAnswer', e.target.checked)}
            >
                Развернутый ответ
            </Checkbox>

            {task.subThemes.map((theme, subThemeId) => (
                <div className={styles.subjectItemDeleteInner} key={`subthemeId_${subThemeId}`}>
                    <Input
                        value={theme.subTheme}
                        onChange={(e) => updateCreatedSubTheme(index, subThemeId, e.target.value)}
                        title={`Подтема (${theme.tasksCount || 0})`}
                        trackLength
                        lengthLimit={150}
                    />

                    <IconButton
                        variant="danger"
                        onClick={() => deleteCreatedSubTheme(index, subThemeId)}
                        disabled={task.subThemes.length <= 1}
                    >
                        <Delete />
                    </IconButton>
                </div>
            ))}

            <Button auto variant="empty" className={styles.subjectTaskAdd} onClick={() => addCreatedSubTheme(index)}>
                <Plus />
                Подтема
            </Button>
        </div>
    );
};

export default SubjectTaskItem;
