'use client';

import React, { LegacyRef } from 'react';
import cn from 'classnames';
import { Slider } from 'antd';
import { useParams } from 'next/navigation';

import pws from '@/shared/styles/pageWithSidebar.module.scss';
import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import { ConfirmModal } from '@/shared/ui/Modal';
import { Preloader } from '@/shared/ui/Preloader';
import { Reload } from '@/shared/icons/Reload';
import { TextPoint } from '@/shared/ui/TextPoint';
import { Button } from '@/shared/ui/Button';
import { Table, TableItem } from '@/shared/ui/Table';
import { ContentWrapper } from '@/shared/wrappers/ContentWrapper';
import { Text } from '@/shared/ui/Text';
import { Pause, Play } from '@/shared/icons';
import { InfoSidebar } from '@/shared/ui/InfoSidebar';
import { useQuery } from '@tanstack/react-query';
import { useTest } from '@/features/test';
import TaskTestItem from '@/entities/task/ui/TaskTestItem';
import { formatMinutesToDuration } from '@/shared/utils/formatMinutes';
import TaskTestItemWithAnswer from '@/entities/task/ui/TaskTestItemWithAnswer';
import { TestResult } from '@/entities/test';
import { useCountdown } from '@/shared/hooks/useCoundown';
import { formatTime } from '@/shared/utils/formatSeconds';
import { useHandlers } from '@/features/collection';

type TaskAnswer = { id: string | number; answer: string };
type TaskDetailed = { id: string | number; primaryScore: number | string };

const TestingTestById = () => {
    const { id } = useParams();

    const [confirmRestart, setConfirmRestart] = React.useState(false);
    const [sidebarActive, setSidebarActive] = React.useState(false);
    const [step, setStep] = React.useState(1);
    const [result, setResult] = React.useState<TestResult>();

    const { grade, primaryScore, secondaryScore, maxPrimaryScore, simpleTasks, detailedTasks, isMark } = result || {};

    const [tasksAnswer, setTasksAnswer] = React.useState<TaskAnswer[]>([]);
    const [tasksDetailed, setTasksDetailed] = React.useState<TaskDetailed[]>([]);

    const { getTestById, getDetailedTasksByTestId, checkResultTestById } = useTest();

    const {
        data: test,
        isLoading: testIsLoading,
        error,
    } = useQuery({
        queryKey: ['test_by_id', id],
        queryFn: () => getTestById(String(id)),
        enabled: !!id,
    });

    const {
        data: detailedAnswerTasks,
        isLoading: detailedAnswerTasksIsLoading,
        error: detailedAnswerTasksError,
    } = useQuery({
        queryKey: ['detailed_tasks_by_test_id', id],
        queryFn: () => getDetailedTasksByTestId(String(id)),
        enabled: !!id && step > 1,
    });

    const { subject, tasks, durationMinutes, isExam } = test || {};
    const { elapsedTime, remainingTime, isPaused, pause, resume, reset } = useCountdown((durationMinutes || 0) * 60, 1000, () => setStep(2));
    const { scrollTop } = useHandlers();

    const setAnswerHandler = (id: number, value: string) => {
        let newTasksAnswer = [...tasksAnswer];

        newTasksAnswer = newTasksAnswer.map((obj) => (obj.id === id ? { ...obj, answer: value } : obj));

        setTasksAnswer(newTasksAnswer);
    };

    const handleScoreChange = (id: number, value: number) => {
        let newTasksDetailed = [...tasksDetailed];

        newTasksDetailed = newTasksDetailed.map((obj) => (obj.id === id ? { ...obj, primaryScore: value } : obj));

        setTasksDetailed(newTasksDetailed);
    };

    const checkResult = async () => {
        if (!id) {
            return;
        }

        const result = await checkResultTestById(String(id), tasksAnswer, tasksDetailed, () => setStep(3));

        if (result) {
            setResult(result);
        }
    };

    const checkDetailedTasksHandler = async () => {
        pause();
        setStep(2);
    };

    const togglePauseCountdown = () => {
        if (isPaused) {
            resume();
        } else {
            pause();
        }
    };

    const fillEmptyAnswers = () => {
        if (test && test.tasks) {
            const { tasks } = test;

            const simpleTasks = tasks
                .filter((el) => !el.isDetailedAnswer)
                .map((data) => {
                    return {
                        id: data.id,
                        answer: '',
                    };
                });

            const detailedTasks = tasks
                .filter((el) => el.isDetailedAnswer)
                .map((data) => {
                    return {
                        id: data.id,
                        primaryScore: 0,
                    };
                });

            setTasksAnswer(simpleTasks);
            setTasksDetailed(detailedTasks);
        }
    };

    const restartTest = () => {
        reset();
        resume();
        fillEmptyAnswers();
        scrollTop();
    };

    React.useEffect(fillEmptyAnswers, [test]);

    return (
        <>
            <ContentWrapper>
                <div className={pws.wrapper}>
                    <div className={pws.contentFull}>
                        <div className={styles.taskInner}>
                            <div className={base.taskContent}>
                                {step === 1 &&
                                    test?.tasks.map((data, id) => (
                                        <TaskTestItemWithAnswer key={id} data={data} setValue={setAnswerHandler} />
                                    ))}

                                {step === 2 &&
                                    (detailedAnswerTasksIsLoading ? (
                                        <Preloader page small />
                                    ) : (
                                        <div className={base.baseWrapperGap20}>
                                            <Text variant="h3" center>
                                                Проверка заданий с развёрнутым ответом
                                            </Text>

                                            {detailedAnswerTasks?.map((data) => (
                                                <div key={data.id} className={base.baseWrapperGap20}>
                                                    <TaskTestItem data={data} showAnswer taskWithLink />

                                                    <div className={base.baseWrapperGap4}>
                                                        <Text variant="text2">
                                                            Оцените задание (максимум баллов за задание:{' '}
                                                            {data.subjectTask.primaryScore})
                                                        </Text>

                                                        <Slider
                                                            className={styles.taskSlider}
                                                            min={0}
                                                            max={data.subjectTask.primaryScore}
                                                            onChange={(value) => handleScoreChange(data.id, value)}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ))}

                                {step === 3 && (
                                    <div className={cn(base.baseWrapperGap20, base.aic)}>
                                        <div className={cn(base.baseWrapperGap4, base.aic)}>
                                            {isExam && (
                                                <p className={styles.testResultTitle}>
                                                    Вы набрали <span>{secondaryScore || 0}</span> из <span>100</span>{' '}
                                                    баллов
                                                </p>
                                            )}

                                            <p className={styles.testResultSubtitle}>
                                                Набрано первичных баллов: {primaryScore} из {maxPrimaryScore}
                                            </p>

                                            {/* <p className={styles.testResultSubtitle}>Затрачено времени: 0</p> */}
                                        </div>

                                        <Button href="/tests" variant="light" auto>
                                            Решать другие тесты
                                        </Button>

                                        {!!simpleTasks?.length && (
                                            <div className={styles.testResultWrapper}>
                                                <p className={styles.testResultSubtitle}>Тестовая часть</p>

                                                <Table>
                                                    <TableItem
                                                        head
                                                        id="Задание"
                                                        text="Ваш ответ"
                                                        value="Правильный ответ"
                                                    />

                                                    {simpleTasks?.map((data) => (
                                                        <TableItem
                                                            key={data.id}
                                                            id={String(data.number)}
                                                            text={data.answer || '-'}
                                                            value={data.correctAnswers.join(' или ')}
                                                            status={data.isCorrect ? 'success' : 'error'}
                                                        />
                                                    ))}
                                                </Table>
                                            </div>
                                        )}

                                        {!!detailedTasks?.length && (
                                            <div className={styles.testResultWrapper}>
                                                <p className={styles.testResultSubtitle}>Развёрнутый ответ</p>

                                                <Table>
                                                    <TableItem
                                                        head
                                                        id="Задание"
                                                        text="Ваш балл"
                                                        value="Максимальный балл"
                                                    />

                                                    {detailedTasks?.map((data) => (
                                                        <TableItem
                                                            key={data.id}
                                                            id={String(data.number)}
                                                            text={String(data.primaryScore)}
                                                            value={String(data.maxPrimaryScore)}
                                                            status={
                                                                data.primaryScore === data.maxPrimaryScore
                                                                    ? 'success'
                                                                    : data.primaryScore === 0
                                                                    ? 'error'
                                                                    : 'warn'
                                                            }
                                                        />
                                                    ))}
                                                </Table>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {step < 3 && (
                                    <div className={styles.taskTestButtons}>
                                        {step > 1 && (
                                            <Button
                                                auto
                                                variant="light"
                                                onClick={() => {
                                                    setStep((prev) => prev - 1);
                                                    resume();
                                                }}
                                            >
                                                Назад
                                            </Button>
                                        )}

                                        {step === 1 && (
                                            <Button auto onClick={() => checkDetailedTasksHandler()}>
                                                Далее
                                            </Button>
                                        )}

                                        {step === 2 && (
                                            <Button auto onClick={checkResult}>
                                                К результату
                                            </Button>
                                        )}
                                    </div>
                                )}
                            </div>

                            <InfoSidebar value={sidebarActive} setValue={setSidebarActive}>
                                {step !== 3 && (
                                    <div className={styles.testInfoWrapper}>
                                        <TextPoint title="Прошло:" className={styles.testInfoItem}>
                                            <Text variant="h4">{formatTime(elapsedTime)}</Text>
                                        </TextPoint>

                                        <TextPoint title="Осталось:" className={styles.testInfoItem}>
                                            <Text variant="h4">{formatTime(remainingTime)}</Text>
                                        </TextPoint>
                                    </div>
                                )}

                                <TextPoint title="Предмет:">
                                    <Text variant="h4">{subject}</Text>
                                </TextPoint>

                                <TextPoint title="Экзамен длится:">
                                    <Text variant="h4">{formatMinutesToDuration(durationMinutes)}</Text>
                                </TextPoint>

                                {step === 1 && (
                                    <div className={styles.testInfoButtons}>
                                        <button className={styles.testInfoButton} onClick={togglePauseCountdown}>
                                            {!isPaused ? <Pause /> : <Play />}

                                            {!isPaused ? 'Пауза' : 'Продолжить'}
                                        </button>

                                        <button
                                            className={cn(styles.testInfoButton, styles.danger)}
                                            onClick={() => {
                                                pause();
                                                setConfirmRestart(true);
                                                setSidebarActive(false);
                                            }}
                                        >
                                            <Reload />
                                            Начать заново
                                        </button>
                                    </div>
                                )}
                            </InfoSidebar>
                        </div>
                    </div>
                </div>
            </ContentWrapper>

            <ConfirmModal
                value={confirmRestart}
                setValue={setConfirmRestart}
                callback={restartTest}
                rejectCallback={resume}
                text="Вы действительно хотите начать тест заново? Прогресс теста не будет сохранен"
                rejectText="Продолжить решать"
                confirmText="Начать заново"
            />
        </>
    );
};

export default TestingTestById;
