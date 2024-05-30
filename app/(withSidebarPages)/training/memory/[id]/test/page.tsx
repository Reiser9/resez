'use client';

import React from 'react';
import cn from 'classnames';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import Confetti from 'react-confetti';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { useCollections, useHandlers } from '@/features/collection';
import { BackButton, Button } from '@/shared/ui/Button';
import { NotContent } from '@/shared/ui/NotContent';
import { Cross } from '@/shared/icons';
import { Preloader } from '@/shared/ui/Preloader';
import { Text } from '@/shared/ui/Text';
import TestValidationItem from './ui/TestValidationItem';
import TestChoiceItem from './ui/TestChoiceItem';
import TestWriteItem from './ui/TestWriteItem';

type TestResult = {
    id: number;
    correct: boolean
};

const MemoryTest = () => {
    const [testResult, setTestResult] = React.useState<TestResult[]>([]);
    const [showResults, setShowResults] = React.useState(false);
    const [correctCount, setCorrectCount] = React.useState(0);
    const [wrongCount, setWrongCount] = React.useState(0);

    const { getTestCollection } = useCollections();
    const { scrollTop } = useHandlers();
    const { id } = useParams();

    const { data, isLoading, isFetching, error, refetch } = useQuery({
        queryKey: ['collection_cards', id],
        queryFn: () => getTestCollection(String(id)),
        enabled: !!id,
    });

    const { test } = data || {};

    const handleTestResult = (id: number, correct: boolean) => {
        const newObj = {
            id,
            correct
        };

        setTestResult((prevObjects) => {
            const index = prevObjects.findIndex((obj) => obj.id === newObj.id);

            if (index !== -1) {
                prevObjects[index] = newObj;
                return [...prevObjects];
            } else {
                return [...prevObjects, newObj];
            }
        });
    };

    const checkTestResults = () => {
        if(!test){
            return;
        }

        const totalCorrect = testResult.filter(item => !!item.correct).length;
        const totalWrong = test.length - totalCorrect;

        setCorrectCount(totalCorrect);
        setWrongCount(totalWrong);
        setShowResults(true);
        scrollTop();  
    };

    const resetTest = async () => {
        await refetch();

        setTestResult([]);
        setShowResults(false);
        setCorrectCount(0);
        setWrongCount(0);
    }

    if (isLoading) {
        return <Preloader page small />;
    }

    return (
        <div className={cn(base.baseWrapperGap16, styles.typeTestOuter)}>
            <div className={base.titleInner}>
                <BackButton />

                {!error && !showResults && (
                    <Text variant="h4" fontWeight={600}>
                        Вопросов: {test?.length}
                    </Text>
                )}
            </div>

            {error ? (
                <NotContent text="Ошибка загрузка теста" icon={<Cross />} danger />
            ) : (
                <>
                    {showResults && (
                        <>
                            <div className={styles.testConfettiWrapper}>
                                <Confetti gravity={0.05} recycle={false} numberOfPieces={600} tweenDuration={20000} />
                            </div>

                            <div className={styles.testResultContent}>
                                <Text center color='success' fontWeight={600} variant='h3'>Правильно: {correctCount}</Text>
                                <Text center color='error' fontWeight={600} variant='h3'>Неправильно: {wrongCount}</Text>

                                <Button variant='light' auto onClick={resetTest} loading={isFetching}>
                                    Начать тест сначала
                                </Button>
                            </div>

                            <Text variant="h3">Ваши ответы:</Text>
                        </>
                    )}

                    <div className={styles.testContent}>
                        {test?.map((data, id) =>
                            data.mode === 'VALIDATION' ? (
                                <TestValidationItem
                                    key={data.id}
                                    data={data}
                                    number={id + 1}
                                    handleTestResult={handleTestResult}
                                    showResult={showResults}
                                />
                            ) : data.mode === 'CHOICE' ? (
                                <TestChoiceItem
                                    key={data.id}
                                    data={data}
                                    number={id + 1}
                                    handleTestResult={handleTestResult}
                                    showResult={showResults}
                                />
                            ) : (
                                <TestWriteItem
                                    key={data.id}
                                    data={data}
                                    number={id + 1}
                                    handleTestResult={handleTestResult}
                                    showResult={showResults}
                                />
                            ),
                        )}

                        {!showResults && (
                            <Button variant="light" auto onClick={checkTestResults}>
                                Закончить тест
                            </Button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default MemoryTest;
