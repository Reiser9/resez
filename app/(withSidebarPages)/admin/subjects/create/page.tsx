'use client';

import React, { ChangeEvent } from 'react';
import { Checkbox, Steps } from 'antd';
import { useRouter } from 'next/navigation';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import { Plus } from '@/shared/icons';

import CreatePageDefault from '@/shared/wrappers/CreatePageWrapper/CreatePageWrapper';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { cyrToLat } from '@/shared/utils/cytToLat';
import PointsTable from './PointsTable';
import { useSubjects } from '@/features/subjects';
import { ScoreConversionItem, SubTheme, Task } from '@/entities/subject';
import SubjectTaskItem from './SubjectTaskItem';
import SubjectTaskItemForm from './SubjectTaskItemForm';
import useAlert from '@/shared/hooks/useAlert';
import { Text } from '@/shared/ui/Text';

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
    const [tasksCount, setTasksCount] = React.useState(0);

    const [createdSubjectId, setCreatedSubjectId] = React.useState(0);
    const [red, setRed] = React.useState(-9999);
    const [green, setGreen] = React.useState(9999);
    const [elements, setElements] = React.useState<ScoreConversionItem[]>([]);
    const [primaryCount, setPrimaryCount] = React.useState<number | null>(null);

    const { createSubject, createTableForSubject } = useSubjects();
    const { alertNotify } = useAlert();
    const router = useRouter();

    const cyrToLatName = () => {
        if (!slug) {
            setSlug(cyrToLat(name));
        }
    };

    const createSubjectHandler = async () => {
        let updatedTasks = [...tasks];

        if (theme && primaryScore && (subThemes.length > 0 || subTheme)) {
            const trimSubTheme = subTheme.trim();
            updatedTasks = [
                ...updatedTasks,
                {
                    theme,
                    primaryScore,
                    isDetailedAnswer,
                    subThemes: trimSubTheme ? [...subThemes, { subTheme: trimSubTheme, tasksCount }] : subThemes,
                    tasksCount: 0,
                },
            ];
        }

        if (!updatedTasks.length) {
            return alertNotify('Предупреждение', 'Хотя бы одно задание должно быть создано', 'warn');
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
        fillEmptyTableCell(primaryCount);
    };

    const createTablePoints = () => {
        let empty = false,
            incorrectValue = false;

        let updatedScores = elements.map((data) => {
            const { primaryScore, secondaryScore } = data || {};
            const isGreen = Number(primaryScore) - 1 >= green;
            const isRed = Number(primaryScore) - 1 <= red;

            if (!secondaryScore) {
                empty = true;
            }

            return {
                primaryScore,
                secondaryScore,
                isGreen,
                isRed,
            };
        });

        if (empty) {
            return alertNotify('Предупреждение', 'Таблица должна быть полностью заполненной', 'warn');
        }

        if (isPoint) {
            let updatedScores = elements.map((data) => {
                const { primaryScore, secondaryScore, isGreen, isRed } = data || {};
                const score = String(secondaryScore).split('-');

                if (score.length !== 2) {
                    incorrectValue = true;
                }

                return {
                    isGreen,
                    isRed,
                    grade: Number(primaryScore) + 1,
                    minScore: score[0],
                    maxScore: score[1],
                };
            });

            return createTableForSubject(createdSubjectId, updatedScores, () => router.push('/admin/subjects'));
        }

        if (incorrectValue) {
            return alertNotify('Ошибка', 'Баллы введены некорректно, пример ввода: 1-2', 'error');
        }

        createTableForSubject(createdSubjectId, updatedScores, () => router.push('/admin/subjects'));
    };

    const addTask = () => {
        const trimSubTheme = subTheme.trim();

        const newTask = {
            theme,
            primaryScore,
            isDetailedAnswer,
            subThemes: trimSubTheme ? [...subThemes, { subTheme: trimSubTheme, tasksCount: 0 }] : subThemes,
            tasksCount: 0,
        };

        setTasks((prev) => [...prev, newTask]);

        setTheme('');
        setPrimaryScore('');
        setIsDetailedAnswer(false);
        setSubThemes([]);
        setSubTheme('');
    };

    const fillEmptyTableCell = (count: number) => {
        let newElements: ScoreConversionItem[] = [];

        [...Array(isPoint ? 4 : count)].map((_, id) => {
            newElements = [
                ...newElements,
                {
                    primaryScore: id + 1,
                    isRed: false,
                    isGreen: false,
                    secondaryScore: '',
                },
            ];
        });

        setElements(newElements);
    };

    const setRedHandler = (id: number) => {
        setGreen((prev) => {
            if (prev === 9999 || id + 1 === primaryCount) {
                return 9999;
            } else if (id >= prev) {
                return id + 1;
            }

            return prev;
        });

        setRed((prev) => (prev === id ? -9999 : id));
    };

    const setGreenHandler = (id: number) => {
        setRed((prev) => {
            if (prev === -9999 || id === -1) {
                return -9999;
            } else if (id <= prev) {
                return id - 1;
            }

            return prev;
        });

        setGreen((prev) => (prev === id ? 9999 : id));
    };

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>, id: number) => {
        let currentData = [...elements];
        currentData[id].secondaryScore = e.target.value;

        setElements(currentData);
    };

    return (
        <CreatePageDefault
            title={`Создание ${step === 0 ? 'предмета' : 'таблицы'}`}
            button={
                step === 0 ? (
                    <Button auto levitation onClick={createSubjectHandler}>
                        К таблице баллов
                    </Button>
                ) : (
                    <Button auto levitation onClick={createTablePoints}>
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
                            <Text variant="text2">Задания: {tasks.length + 1}</Text>

                            <div className={styles.subjectTasksContent}>
                                {tasks.map((task, taskId) => (
                                    <SubjectTaskItem
                                        key={taskId}
                                        number={taskId}
                                        task={task}
                                        tasks={tasks}
                                        setTasks={setTasks}
                                    />
                                ))}

                                <SubjectTaskItemForm
                                    subThemes={subThemes}
                                    setSubThemes={setSubThemes}
                                    subTheme={subTheme}
                                    setSubTheme={setSubTheme}
                                    number={tasks.length + 1}
                                    theme={theme}
                                    setTheme={setTheme}
                                    primaryScore={primaryScore}
                                    setPrimaryScore={setPrimaryScore}
                                    isDetailedAnswer={isDetailedAnswer}
                                    setIsDetailedAnswer={setIsDetailedAnswer}
                                    tasksCount={0}
                                    setTasksCount={setTasksCount}
                                />

                                <Button auto variant="empty" className={styles.subjectTaskAdd} onClick={addTask}>
                                    <Plus />
                                    Добавить задание
                                </Button>
                            </div>
                        </div>
                    </>
                )}

                {step === 1 && (
                    <PointsTable
                        isPoint={isPoint}
                        primaryCount={primaryCount}
                        red={red}
                        green={green}
                        handleChangeInput={handleChangeInput}
                        setRedHandler={setRedHandler}
                        setGreenHandler={setGreenHandler}
                        elements={elements}
                    />
                )}
            </div>
        </CreatePageDefault>
    );
};

export default SubjectsCreate;
