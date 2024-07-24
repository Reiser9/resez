'use client';

import React from 'react';
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

const TestingTestById = () => {
    const { id } = useParams();

    const [confirmRestart, setConfirmRestart] = React.useState(false);
    const [sidebarActive, setSidebarActive] = React.useState(false);
    const [step, setStep] = React.useState(1);
    const [result, setResult] = React.useState({});

    const [tasksDetailed, setTasksDetailed] = React.useState([]);
    const [tasksAnswer, setTasksAnswer] = React.useState([]);

    const checkResult = async () => {};

    const checkDetailedTasksHandler = async () => {};

    return (
        <>
            <ContentWrapper>
                <div className={pws.wrapper}>
                    <div className={pws.contentFull}>
                        <div className={styles.taskInner}>
                            <div className={base.taskContent}>
                                {/* {step === 1 &&
                                    tasksAnswer?.map((data, id) => (
                                        <TaskTestItem
                                            key={id}
                                            test
                                            data={data}
                                            value={data.answer}
                                            setValue={setAnswerHandler}
                                        />
                                    ))} */}

                                {step === 2 && (
                                    <div className={base.baseWrapperGap20}>
                                        <Text variant="h3" center>
                                            Проверка заданий с развёрнутым ответом
                                        </Text>

                                        {/* {tasksDetailed?.map((data) => (
                                            <div key={data.id} className={base.baseWrapperGap20}>
                                                <TaskTestItem data={data} showAnswer />

                                                <div className={base.baseWrapperGap4}>
                                                    <Text variant="text2">
                                                        Оцените задание (максимум баллов за задание:{' '}
                                                        {data.maxPrimaryScore})
                                                    </Text>

                                                    <Slider
                                                        className={styles.taskSlider}
                                                        min={0}
                                                        max={data.maxPrimaryScore}
                                                        value={data.primaryScore}
                                                        onChange={(value) => handleScoreChange(data.id, value)}
                                                    />
                                                </div>
                                            </div>
                                        ))} */}
                                    </div>
                                )}

                                {step === 3 && (
                                    <div className={cn(base.baseWrapperGap20, base.aic)}>
                                        <div className={cn(base.baseWrapperGap4, base.aic)}>
                                            {/* {isExam && (
                                                <p className={styles.testResultTitle}>
                                                    Вы набрали <span>{totalSecondaryScore}</span> из <span>100</span>{' '}
                                                    баллов
                                                </p>
                                            )}

                                            <p className={styles.testResultSubtitle}>
                                                Набрано первичных баллов: {totalPrimaryScore} из {maxPrimaryScore}
                                            </p>

                                            <p className={styles.testResultSubtitle}>
                                                Затрачено времени: {elapsedTime}
                                            </p> */}
                                        </div>

                                        <Button href="/tests/recommended" variant="light" auto>
                                            Решать другие тесты
                                        </Button>

                                        {/* {tasksWithoutDetailedAnswerResult.length > 0 && (
                                            <div className={styles.testResultWrapper}>
                                                <p className={styles.testResultSubtitle}>Тестовая часть</p>

                                                <Table>
                                                    <TableItem
                                                        head
                                                        id="Задание"
                                                        text="Ваш ответ"
                                                        value="Правильный ответ"
                                                    />

                                                    {tasksWithoutDetailedAnswerResult?.map((data) => (
                                                        <TableItem
                                                            key={data.id}
                                                            id={data.number}
                                                            text={data.answer || '-'}
                                                            value={data.correctAsnwer}
                                                            status={data.isCorrect ? 'success' : 'error'}
                                                        />
                                                    ))}
                                                </Table>
                                            </div>
                                        )}

                                        {tasksWithDetailedAnswerResult.length > 0 && (
                                            <div className={styles.testResultWrapper}>
                                                <p className={styles.testResultSubtitle}>Развёрнутый ответ</p>

                                                <Table>
                                                    <TableItem
                                                        head
                                                        id="Задание"
                                                        text="Ваш балл"
                                                        value="Максимальный балл"
                                                    />

                                                    {tasksWithDetailedAnswerResult?.map((data) => (
                                                        <TableItem
                                                            key={data.id}
                                                            id={data.number}
                                                            text={`${data.primaryScore}`}
                                                            value={data.maxPrimaryScore}
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
                                        )} */}
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
                                                    // pauseResume();
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
                                            {/* <Text variant="h4">{elapsedTime}</Text> */}
                                        </TextPoint>

                                        <TextPoint title="Осталось:" className={styles.testInfoItem}>
                                            {/* <Text variant="h4">{remainingTime}</Text> */}
                                        </TextPoint>
                                    </div>
                                )}

                                <TextPoint title="Предмет:">{/* <Text variant="h4">{subject}</Text> */}</TextPoint>

                                <TextPoint title="Экзамен длится:">
                                    {/* <Text variant="h4">{formatMinutesToDuration(durationMinutes)}</Text> */}
                                </TextPoint>

                                {step === 1 && (
                                    <div className={styles.testInfoButtons}>
                                        <button className={styles.testInfoButton}>
                                            {/* {!isPaused ? <Pause /> : <Play />} */}

                                            {/* {!isPaused ? 'Пауза' : 'Продолжить'} */}
                                        </button>

                                        <button
                                            className={cn(styles.testInfoButton, styles.danger)}
                                            onClick={() => {
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

            {/* <ConfirmModal
                value={confirmRestart}
                setValue={setConfirmRestart}
                callback={restartTest}
                text="Вы действительно хотите начать тест заново? Прогресс теста не будет сохранен"
                rejectText="Продолжить решать"
                confirmText="Начать заново"
            /> */}
        </>
    );
};

export default TestingTestById;
