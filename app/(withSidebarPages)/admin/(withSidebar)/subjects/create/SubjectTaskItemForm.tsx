'use client';

import React from 'react';

import styles from './index.module.scss';

import { Input } from '@/shared/ui/Input';
import { Checkbox } from 'antd';
import { Button, IconButton } from '@/shared/ui/Button';
import { Delete, Plus } from '@/shared/icons';
import { SubTheme } from '@/entities/subject';

type Props = {
    subThemes: SubTheme[];
    setSubThemes: React.Dispatch<React.SetStateAction<SubTheme[]>>;
    subTheme: string;
    setSubTheme: React.Dispatch<React.SetStateAction<string>>;
    number: number;
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
    primaryScore: string;
    setPrimaryScore: React.Dispatch<React.SetStateAction<string>>;
    isDetailedAnswer: boolean;
    setIsDetailedAnswer: React.Dispatch<React.SetStateAction<boolean>>;
    tasksCount: number;
    setTasksCount: React.Dispatch<React.SetStateAction<number>>;
    subThemeId?: number;
    setSubThemeId?: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const SubjectTaskItemForm: React.FC<Props> = ({
    subThemes,
    setSubThemes,
    subTheme,
    setSubTheme,
    number,
    theme,
    setTheme,
    primaryScore,
    setPrimaryScore,
    isDetailedAnswer,
    setIsDetailedAnswer,
    tasksCount,
    setTasksCount,
    subThemeId,
    setSubThemeId,
}) => {
    const updateSubTheme = (id: number, value: string) => {
        const subthemes = [...subThemes];
        subthemes[id].subTheme = value;
        setSubThemes(subthemes);
    };

    const addSubTheme = () => {
        const tempSubTheme = subTheme.trim();

        let newSubTheme: SubTheme = {
            subTheme: tempSubTheme,
            tasksCount,
        };

        if (subThemeId) {
            newSubTheme.id = subThemeId;
        }

        setSubThemes((prev) => [...prev, newSubTheme]);
        setSubTheme('');
        setTasksCount(0);
        setSubThemeId && setSubThemeId(0);
    };

    const deleteSubTheme = (id: number) => {
        const updatedSubThemes = [...subThemes];
        updatedSubThemes.splice(id, 1);
        setSubThemes(updatedSubThemes);
    };

    const removeStateSubTheme = () => {
        setSubThemeId && setSubThemeId(subThemes[subThemes.length - 1].id);
        setTasksCount(subThemes[subThemes.length - 1].tasksCount);
        setSubTheme(subThemes[subThemes.length - 1].subTheme);
        setSubThemes((prev) => prev.slice(0, -1));
    };

    return (
        <div className={styles.subjectTaskItem}>
            <p className={styles.subjectTaskNum}>{number}</p>

            <Input value={theme} setValue={setTheme} title="Тема задания" trackLength lengthLimit={150} />

            <Input
                value={primaryScore}
                setValue={setPrimaryScore}
                title="Первичный балл"
                lengthLimit={2}
                type="number"
            />

            <Checkbox checked={isDetailedAnswer} onChange={(e) => setIsDetailedAnswer(e.target.checked)}>
                Развернутый ответ
            </Checkbox>

            {subThemes.map((subTheme, id) => (
                <div className={styles.subjectItemDeleteInner} key={id}>
                    <Input
                        value={subTheme.subTheme}
                        onChange={(e) => updateSubTheme(id, e.target.value)}
                        title={`Подтема (${subTheme.tasksCount})`}
                        trackLength
                        lengthLimit={150}
                    />

                    <IconButton variant="danger" onClick={() => deleteSubTheme(id)}>
                        <Delete />
                    </IconButton>
                </div>
            ))}

            <div className={styles.subjectItemDeleteInner}>
                <Input
                    value={subTheme}
                    setValue={setSubTheme}
                    title={`Подтема (${tasksCount})`}
                    trackLength
                    lengthLimit={150}
                />

                <IconButton variant="danger" disabled={subThemes.length < 1} onClick={removeStateSubTheme}>
                    <Delete />
                </IconButton>
            </div>

            <Button auto variant="empty" className={styles.subjectTaskAdd} onClick={addSubTheme}>
                <Plus />
                Подтема
            </Button>
        </div>
    );
};

export default SubjectTaskItemForm;
