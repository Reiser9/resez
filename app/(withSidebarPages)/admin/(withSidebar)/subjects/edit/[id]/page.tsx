'use client';

import React, { ChangeEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Checkbox, Steps } from 'antd';
import { useQuery } from '@tanstack/react-query';

import styles from '../../create/index.module.scss';
import base from '@/shared/styles/base.module.scss';

import type { ScoreConversionItem, Task } from '@/entities/subject';
import { useSubjects } from '@/features/subjects';
import useAlert from '@/shared/hooks/useAlert';
import { cyrToLat } from '@/shared/utils/cytToLat';
import { CreatePageWrapper } from '@/shared/wrappers/CreatePageWrapper';
import SubjectTaskItem from '../../create/SubjectTaskItem';
import { Cross, Plus } from '@/shared/icons';
import PointsTable from '../../create/PointsTable';
import { PrivateWrapper } from '@/shared/wrappers/PrivateWrapper';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { useHandlers } from '@/features/collection';

import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';
import { Input } from '@/shared/ui/Input';

const SubjectEdit = () => {
    const [step, setStep] = React.useState(0);

    const [name, setName] = React.useState('');
    const [slug, setSlug] = React.useState('');
    const [examMinutes, setExamMinutes] = React.useState('');
    const [order, setOrder] = React.useState('0');
    const [isPublished, setIsPublished] = React.useState(false);
    const [isPoint, setIsPoint] = React.useState(false);

    const [tasks, setTasks] = React.useState<Task[]>([]);

    const [red, setRed] = React.useState(-9999);
    const [green, setGreen] = React.useState(9999);
    const [elements, setElements] = React.useState<ScoreConversionItem[]>([]);
    const [primaryCount, setPrimaryCount] = React.useState(0);

    const { alertNotify } = useAlert();
    const { scrollBottom } = useHandlers();
    const router = useRouter();

    const { getSubjectById, getPointsSubjectById, editSubject, createTableForSubject } = useSubjects();
    const { id } = useParams();

    const cyrToLatName = () => {
        if (!slug) {
            setSlug(cyrToLat(name));
        }
    };

    const updateSubjectHandler = () => {
        let updatedTasks = [...tasks];

        if (!updatedTasks.length) {
            return alertNotify('Предупреждение', 'Хотя бы одно задание должно быть создано', 'warn');
        }

        editSubject(String(id), name, slug, isPublished, order, updatedTasks, isPoint, examMinutes, () => {
            setStep(1);
            alertNotify('Успешно', 'Информация о предмета сохранена', 'success');
            const primaryCountReduce = updatedTasks.reduce((accumulator, currentValue) => {
                return accumulator + parseInt(currentValue.primaryScore);
            }, 0);

            setPrimaryCount(primaryCountReduce);
            fillEmptyTableCell(primaryCountReduce, primaryCount);
        });
    };

    const addTask = () => {
        setTasks((prev) => [
            ...prev,
            {
                theme: '',
                subThemes: [
                    {
                        subTheme: '',
                        tasksCount: 0,
                    },
                ],
                tasksCount: 0,
                isDetailedAnswer: false,
                primaryScore: '',
            },
        ]);
        scrollBottom();
    };

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>, id: number) => {
        let currentData = [...elements];
        currentData[id].secondaryScore = e.target.value;

        setElements(currentData);
    };

    const fillEmptyTableCell = (count: number, primaryCount: number) => {
        let newElements: ScoreConversionItem[] = [];

        if (isPoint) {
            let newElements = elements.slice(0, 4);

            if (elements.length < 4) {
                [...Array(4 - elements.length)].map((_, id) => {
                    newElements = [
                        ...newElements,
                        {
                            primaryScore: id + 1 + elements.length,
                            isRed: false,
                            isGreen: false,
                            secondaryScore: '',
                        },
                    ];
                });
            }

            setPrimaryCount(count);
            return setElements(newElements);
        }

        if (primaryCount > count) {
            const difference = primaryCount - count;
            const newElements = elements.slice(0, elements.length - difference);

            setElements(newElements);
            setPrimaryCount(count);
        } else if (primaryCount < count) {
            const difference = count - primaryCount;
            let newElementsTemp: ScoreConversionItem[] = [];

            [...Array(difference)].map((_, id) => {
                newElementsTemp = [
                    ...newElementsTemp,
                    {
                        primaryScore: id + 1 + elements.length,
                        isRed: false,
                        isGreen: false,
                        secondaryScore: '',
                    },
                ];
            });

            newElements = [...elements, ...newElementsTemp];

            setElements(newElements);
            setPrimaryCount(count);
        }
    };

    const updateTablePoints = () => {
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
                const { primaryScore, secondaryScore } = data || {};
                const score = String(secondaryScore).split('-');
                const isGreen = Number(primaryScore) - 1 >= green;
                const isRed = Number(primaryScore) - 1 <= red;

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

            return createTableForSubject(String(id), updatedScores, () => router.push('/admin/subjects'));
        }

        if (incorrectValue) {
            return alertNotify('Ошибка', 'Баллы введены некорректно, пример ввода: 1-2', 'error');
        }

        createTableForSubject(String(id), updatedScores, () => {
            alertNotify('Успешно', 'Таблица баллов сохранена', 'success');
            router.push('/admin/subjects');
        });
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

    const { data, isLoading, isError } = useQuery({
        queryKey: ['subject_by_id', id],
        queryFn: () => getSubjectById(String(id)),
        enabled: !!id,
    });

    const {
        data: subjectPoints,
        isLoading: subjectPointsIsLoading,
        isError: subjectPointsError,
    } = useQuery({
        queryKey: ['subject_points_by_id', id],
        queryFn: () => getPointsSubjectById(String(id)),
        enabled: !!id,
    });

    React.useEffect(() => {
        if (data) {
            const { subject } = data || {};
            const {
                subject: subjectName,
                slug,
                durationMinutes,
                isPublished,
                isMark,
                subjectTasks,
                order,
            } = subject || {};

            setName(subjectName);
            setSlug(slug);
            setExamMinutes(durationMinutes);
            setIsPublished(isPublished);
            setIsPoint(isMark);
            setOrder(String(order));
            setTasks(subjectTasks);
        }
    }, [data]);

    React.useEffect(() => {
        if (subjectPoints && subjectPoints.scoreConversion.length) {
            const { isMark, scoreConversion } = subjectPoints;

            let idRed = -9999,
                idGreen = 9999;

            scoreConversion.map((data, id) => {
                const { isRed, isGreen } = data;

                if (isRed) {
                    idRed = id;
                }
                if (isGreen && idGreen === 9999) {
                    idGreen = id;
                }

                return;
            });

            setRed(idRed);
            setGreen(idGreen);

            let currentElements;

            if (isMark) {
                currentElements = scoreConversion.map((data, id) => {
                    const { isGreen, isRed, minScore, maxScore } = data;

                    return {
                        primaryScore: id + 1,
                        secondaryScore: `${minScore}-${maxScore}`,
                        isRed,
                        isGreen,
                    };
                });
            } else {
                currentElements = scoreConversion.map((data) => {
                    const { isGreen, isRed, primaryScore, secondaryScore } = data;

                    return {
                        primaryScore,
                        secondaryScore,
                        isRed,
                        isGreen,
                    };
                });
            }

            setElements(currentElements);
            setPrimaryCount(Number(currentElements[currentElements.length - 1].primaryScore));
        }
    }, [subjectPoints]);

    React.useEffect(() => {
        if (step === 1 && subjectPoints && !subjectPoints.scoreConversion.length) {
            const primaryCountReduce = tasks.reduce((accumulator, currentValue) => {
                return accumulator + parseInt(currentValue.primaryScore);
            }, 0);

            setPrimaryCount(primaryCountReduce);
            fillEmptyTableCell(primaryCountReduce, primaryCount);
        }
    }, [step]);

    if (isLoading) {
        return <Preloader page />;
    }

    if (isError) {
        return <NotContent icon={<Cross />} text="Ошибка при загрузке данных" danger />;
    }

    return (
        <PrivateWrapper permissions={[PERMISSIONS.UPDATE_SUBJECTS]}>
            <CreatePageWrapper
                title={`Редактирование ${step === 0 ? 'предмета' : 'таблицы'}`}
                button={
                    step === 0 ? (
                        <Button auto levitation onClick={updateSubjectHandler} loading={subjectPointsIsLoading}>
                            К таблице баллов
                        </Button>
                    ) : (
                        <Button auto levitation onClick={updateTablePoints}>
                            Сохранить
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
                        onChange={(value) => setStep(value)}
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
                                lengthLimit={2}
                            />

                            <Input value={order} setValue={setOrder} title="Позиция" lengthLimit={3} type="number" />

                            <Checkbox checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)}>
                                Опубликовать
                            </Checkbox>

                            <Checkbox checked={isPoint} onChange={(e) => setIsPoint(e.target.checked)}>
                                Оценка
                            </Checkbox>

                            <div className={styles.subjectTasksInner}>
                                <Text variant="text2">Задания: {tasks.length}</Text>

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

                                    <Button auto variant="empty" className={styles.subjectTaskAdd} onClick={addTask}>
                                        <Plus />
                                        Добавить задание
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}

                    {step === 1 &&
                        (subjectPointsIsLoading ? (
                            <Preloader small />
                        ) : subjectPointsError ? (
                            <NotContent text="Ошибка при загрузке данных" icon={<Cross />} danger />
                        ) : (
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
                        ))}
                </div>
            </CreatePageWrapper>
        </PrivateWrapper>
    );
};

export default SubjectEdit;
