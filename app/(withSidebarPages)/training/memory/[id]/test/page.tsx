'use client';

import React from 'react';
import cn from 'classnames';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { useCollections } from '@/features/collection';
import { BackButton, Button } from '@/shared/ui/Button';
import { NotContent } from '@/shared/ui/NotContent';
import { Cross } from '@/shared/icons';
import { Preloader } from '@/shared/ui/Preloader';
import { Text } from '@/shared/ui/Text';
import TestValidationItem from './ui/TestValidationItem';
import TestChoiceItem from './ui/TestChoiceItem';
import TestWriteItem from './ui/TestWriteItem';
import type { CollectionChoice, CollectionValidation, CollectionWrite } from '@/entities/collection';

type TestResult = {
    id: number;
    answer: string | boolean | number;
    data: CollectionWrite | CollectionValidation | CollectionChoice;
};

// type TestResultWrite = TestResult & {
//     data: CollectionWrite;
// };

// type TestResultValidation = TestResult & {
//     data: CollectionValidation;
// };

// type TestResultChoice = TestResult & {
//     data: CollectionChoice;
// };

const MemoryTest = () => {
    const [testResult, setTestResult] = React.useState<TestResult[]>([]);
    const [showResults, setShowResults] = React.useState(false);

    const { getTestCollection } = useCollections();
    const { id } = useParams();

    const { data, isLoading, error } = useQuery({
        queryKey: ['collection_cards', id],
        queryFn: () => getTestCollection(String(id)),
        enabled: !!id,
    });

    const { test } = data || {};

    const handleTestResult = (
        id: number,
        answer: string | boolean | number,
        data: CollectionWrite | CollectionValidation | CollectionChoice,
    ) => {
        const newObj = {
            id,
            answer,
            data,
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
        setShowResults(true);
    };

    // React.useEffect(() => {
    //     console.log(testResult);
    // }, [testResult]);

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
                <div className={styles.testContent}>
                    {showResults && "Результаты"}
                    
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

                    <Button variant="light" auto onClick={checkTestResults}>
                        Закончить тест
                    </Button>
                </div>
            )}
        </div>
    );
};

export default MemoryTest;
