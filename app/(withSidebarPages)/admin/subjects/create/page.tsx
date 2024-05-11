'use client';

import React from 'react';
import { Checkbox, Steps } from 'antd';

import base from '@/shared/styles/base.module.scss';
import typography from '@/shared/styles/typography.module.scss';
import styles from './index.module.scss';

// import useTest from '../../../../hooks/useTest';
import useAlert from '@/shared/hooks/useAlert';

import { Delete, Plus } from '@/shared/icons';

import CreatePageDefault from '@/shared/wrappers/CreatePageWrapper/CreatePageWrapper';
import { Button, IconButton } from '@/shared/ui/Button';
import { Preloader } from '@/shared/ui/Preloader';
import { Input } from '@/shared/ui/Input';
import { cyrToLat } from '@/shared/utils/cytToLat';
import PointsTable from './PointsTable';
import { useSubjects } from '@/features/subjects';

type SubTheme = {
    subTheme: string;
    tasksCount: number;
};

type Task = {
    theme: string;
    primaryScore: string;
    isDetailedAnswer: boolean;
    subThemes: SubTheme[];
};

type TaskKey = 'theme' | 'primaryScore' | 'isDetailedAnswer' | 'subThemes';

const SubjectsCreate = () => {
    const [step, setStep] = React.useState(0);

    const [name, setName] = React.useState('');
    const [slug, setSlug] = React.useState('');
    const [examMinutes, setExamMinutes] = React.useState('');
    const [isPublished, setIsPublished] = React.useState(false);
    const [isPoint, setIsPoint] = React.useState(false);

    const [tasks, setTasks] = React.useState<Task[]>([]);

    const [theme, setTheme] = React.useState('');
    const [primaryScore, setPrimaryScore] = React.useState('');
    const [isDetailedAnswer, setIsDetailedAnswer] = React.useState(false);
    const [subTheme, setSubTheme] = React.useState('');
    const [subThemes, setSubThemes] = React.useState<SubTheme[]>([]);

    const [createdSubjectId, setCreatedSubjectId] = React.useState(0);
    const [red, setRed] = React.useState(-9999);
    const [green, setGreen] = React.useState(9999);
    const [elements, setElements] = React.useState([]);
    const [primaryCount, setPrimaryCount] = React.useState<number | null>(null);

    const { createSubject } = useSubjects();

    const cyrToLatName = () => {
        if (!slug) {
            setSlug(cyrToLat(name));
        }
    };

    const subjectHandler = async () => {
        let updatedTasks = [...tasks];

        if (theme && primaryScore && (subThemes.length > 0 || subTheme)) {
            const trimSubTheme = subTheme.trim();
            updatedTasks = [
                ...updatedTasks,
                {
                    theme,
                    primaryScore,
                    isDetailedAnswer,
                    subThemes: trimSubTheme ? [...subThemes, { subTheme: trimSubTheme, tasksCount: 0 }] : subThemes,
                },
            ];
        }

        const id = await createSubject(name, slug, isPublished, updatedTasks, isPoint, examMinutes, () => {
            setStep(1);
        });

        if (id) {
            setCreatedSubjectId(id);
        }

        const primaryCount = updatedTasks.reduce((accumulator, currentValue) => {
            return accumulator + parseInt(currentValue.primaryScore);
        }, 0);

        setPrimaryCount(primaryCount);
        console.log(primaryCount);
        // fillEmptyTableCell(primaryCount);
    };

    const addTask = () => {
        const trimSubTheme = subTheme.trim();

        const newTask = {
            theme,
            primaryScore,
            isDetailedAnswer,
            subThemes: trimSubTheme ? [...subThemes, { subTheme: trimSubTheme, tasksCount: 0 }] : subThemes,
        };

        setTasks((prev) => [...prev, newTask]);

        setTheme('');
        setPrimaryScore('');
        setIsDetailedAnswer(false);
        setSubThemes([]);
        setSubTheme('');
    };

    const removeTask = (id: number) => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(id, 1);
        setTasks(updatedTasks);
    };

    const updateCreatedTask = (id: number, key: TaskKey, value: string | boolean | SubTheme[]) => {
        let updatedTasks = [...tasks];

        if (id < 0 || id >= updatedTasks.length) {
            return updatedTasks;
        }

        let editedTask = updatedTasks[id][key];
        editedTask = value;

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

    const updateSubTheme = (id: number, value: string) => {
        const subthemes = [...subThemes];
        subthemes[id].subTheme = value;
        setSubThemes(subthemes);
    };

    const addSubTheme = () => {
        const tempSubTheme = subTheme.trim();

        setSubThemes((prev) => [
            ...prev,
            {
                subTheme: tempSubTheme,
                tasksCount: 0,
            },
        ]);
        setSubTheme('');
    };

    const deleteSubTheme = (id: number) => {
        const updatedSubThemes = [...subThemes];
        updatedSubThemes.splice(id, 1);
        setSubThemes(updatedSubThemes);
    };

    const removeStateSubTheme = () => {
        setSubTheme(subThemes[subThemes.length - 1].subTheme);
        setSubThemes((prev) => prev.slice(0, -1));
    };

    return (
        <CreatePageDefault
            title={`Создание ${step === 0 ? 'предмета' : 'таблицы'}`}
            button={
                step === 0 ? (
                    <Button auto levitation onClick={subjectHandler}>
                        К таблице баллов
                    </Button>
                ) : (
                    <Button auto levitation>
                        Создать
                    </Button>
                )
            }
        >
            <div className={base.formMedium}>
                <Steps
                    current={step}
                    size="small"
                    items={[{ title: 'Предмет' }, { title: 'Таблица баллов' }]}
                    className={styles.subjectSteps}
                />

                {step === 0 && (
                    <>
                        <Input
                            value={name}
                            setValue={setName}
                            title="Название предмета"
                            trackLength
                            lengthLimit={75}
                            onBlur={cyrToLatName}
                        />

                        <Input
                            value={slug}
                            setValue={setSlug}
                            title="Ярлык предмета"
                            trackLength
                            lengthLimit={300}
                            infoText="Генерируется автоматически"
                        />

                        <Input
                            value={examMinutes}
                            setValue={setExamMinutes}
                            title="Длительность экзамена в минутах"
                            lengthLimit={3}
                        />

                        <Checkbox checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)}>
                            Опубликовать
                        </Checkbox>

                        <Checkbox checked={isPoint} onChange={(e) => setIsPoint(e.target.checked)}>
                            Оценка
                        </Checkbox>

                        <div className={styles.subjectTasksInner}>
                            <p className={typography.text2}>Задания: {tasks.length + 1}</p>

                            <div className={styles.subjectTasksContent}>
                                {tasks.map((task, taskId) => (
                                    <div className={styles.subjectTaskItem} key={taskId}>
                                        <div className={styles.subjectTaskItemDelete}>
                                            <p className={styles.subjectTaskNum}>{taskId + 1}</p>

                                            <IconButton variant="danger" small onClick={() => removeTask(taskId)}>
                                                <Delete />
                                            </IconButton>
                                        </div>

                                        <Input
                                            value={task.theme}
                                            onChange={(e) => updateCreatedTask(taskId, 'theme', e.target.value)}
                                            title="Тема задания"
                                            trackLength
                                            lengthLimit={150}
                                        />

                                        <Input
                                            value={task.primaryScore}
                                            onChange={(e) => updateCreatedTask(taskId, 'primaryScore', e.target.value)}
                                            title="Первичный балл"
                                            lengthLimit={2}
                                        />

                                        <Checkbox
                                            checked={task.isDetailedAnswer}
                                            onChange={(e) =>
                                                updateCreatedTask(taskId, 'isDetailedAnswer', e.target.checked)
                                            }
                                        >
                                            Развернутый ответ
                                        </Checkbox>

                                        {task.subThemes.map((theme, subThemeId) => (
                                            <div className={styles.subjectItemDeleteInner} key={subThemeId}>
                                                <Input
                                                    value={theme.subTheme}
                                                    onChange={(e) =>
                                                        updateCreatedSubTheme(taskId, subThemeId, e.target.value)
                                                    }
                                                    title={`Подтема (${theme.tasksCount || 0})`}
                                                    trackLength
                                                    lengthLimit={150}
                                                />

                                                {task.subThemes.length <= 1 ? (
                                                    <IconButton variant="danger" disabled>
                                                        <Delete />
                                                    </IconButton>
                                                ) : (
                                                    <IconButton
                                                        variant="danger"
                                                        onClick={() => deleteCreatedSubTheme(taskId, subThemeId)}
                                                    >
                                                        <Delete />
                                                    </IconButton>
                                                )}
                                            </div>
                                        ))}

                                        <Button
                                            auto
                                            variant="empty"
                                            className={styles.subjectTaskAdd}
                                            onClick={() => addCreatedSubTheme(taskId)}
                                        >
                                            <Plus />
                                            Подтема
                                        </Button>
                                    </div>
                                ))}

                                <div className={styles.subjectTaskItem}>
                                    <p className={styles.subjectTaskNum}>{tasks.length + 1}</p>

                                    <Input
                                        value={theme}
                                        setValue={setTheme}
                                        title="Тема задания"
                                        trackLength
                                        lengthLimit={150}
                                    />

                                    <Input
                                        value={primaryScore}
                                        setValue={setPrimaryScore}
                                        title="Первичный балл"
                                        lengthLimit={2}
                                    />

                                    <Checkbox
                                        checked={isDetailedAnswer}
                                        onChange={(e) => setIsDetailedAnswer(e.target.checked)}
                                    >
                                        Развернутый ответ
                                    </Checkbox>

                                    {subThemes.map((subTheme, id) => (
                                        <div className={styles.subjectItemDeleteInner} key={id}>
                                            <Input
                                                value={subTheme.subTheme}
                                                onChange={(e) => updateSubTheme(id, e.target.value)}
                                                title="Подтема"
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
                                            title="Подтема"
                                            trackLength
                                            lengthLimit={150}
                                        />

                                        <IconButton
                                            variant="danger"
                                            disabled={subThemes.length < 1}
                                            onClick={removeStateSubTheme}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </div>

                                    <Button
                                        auto
                                        variant="empty"
                                        className={styles.subjectTaskAdd}
                                        onClick={addSubTheme}
                                    >
                                        <Plus />
                                        Подтема
                                    </Button>
                                </div>

                                <Button auto variant="empty" className={styles.subjectTaskAdd} onClick={addTask}>
                                    <Plus />
                                    Добавить задание
                                </Button>
                            </div>
                        </div>
                    </>
                )}

                {step === 1 && <PointsTable isPoint={isPoint} primaryCount={primaryCount} />}
            </div>
        </CreatePageDefault>
    );
};

export default SubjectsCreate;
