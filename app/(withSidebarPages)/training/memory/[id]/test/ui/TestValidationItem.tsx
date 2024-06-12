'use client';

import React from 'react';
import Image from 'next/image';
import cn from 'classnames';
import parse from 'html-react-parser';

import styles from '../index.module.scss';

import { Text } from '@/shared/ui/Text';
import type { CollectionValidation } from '@/entities/collection';
import { generateCorrectPhrase, generateWrongPhrase } from '@/shared/utils/generatePhrase';

type Props = {
    data: CollectionValidation;
    number: number;
    handleTestResult: (id: number, correct: boolean, withoutScroll?: boolean) => void;
    showResult: boolean;
};

const wrongPhrase = generateWrongPhrase();
const correctPhrase = generateCorrectPhrase();

const TestValidationItem = React.forwardRef(
    ({ data, number, handleTestResult, showResult }: Props, ref: React.ForwardedRef<HTMLDivElement>) => {
        const { questionText, questionPicture, answerText, answerPicture, isCorrect, id, correctAnswer } = data;

        const [trueAnswer, setTrueAnswer] = React.useState<boolean | null>(null);

        const chooseVariant = (answer: boolean) => {
            if (showResult) {
                return;
            }

            setTrueAnswer(answer);

            handleTestResult(id, answer === isCorrect);
        };

        React.useEffect(() => {
            if (!showResult) {
                setTrueAnswer(null);
            }
        }, [showResult]);

        return (
            <div className={styles.testItem} ref={ref}>
                <div className={styles.testItemNumber}>{number}</div>

                <div className={styles.testItemTop}>
                    <div className={styles.testItemTopBlock}>
                        <Text variant="text2" fontWeight={600}>
                            Термин:
                        </Text>

                        <div className={styles.testItemTopBlockElement}>
                            {questionPicture && (
                                <div className={styles.testItemTopBlockImage}>
                                    <Image src={questionPicture} alt="Изображение вопроса" fill />
                                </div>
                            )}

                            <Text variant="h4">{parse(questionText)}</Text>
                        </div>
                    </div>

                    <div className={styles.testItemTopBlock}>
                        <Text variant="text2" fontWeight={600}>
                            Определение:
                        </Text>

                        <div className={styles.testItemTopBlockElement}>
                            {answerPicture && (
                                <div className={styles.testItemTopBlockImage}>
                                    <Image src={answerPicture} alt="Изображение вопроса" fill />
                                </div>
                            )}

                            <Text variant="h4">{parse(answerText)}</Text>
                        </div>
                    </div>
                </div>

                <div className={styles.testItemBottom}>
                    {showResult ? (
                        <>
                            {trueAnswer === isCorrect ? (
                                <Text fontWeight={600} color="success">
                                    {correctPhrase}
                                </Text>
                            ) : trueAnswer === null ? (
                                <Text fontWeight={600} color="grey">
                                    Вернитесь к этому вопросу позже!
                                </Text>
                            ) : (
                                <Text fontWeight={600} color="error">
                                    {wrongPhrase}
                                </Text>
                            )}
                        </>
                    ) : (
                        <Text fontWeight={600}>Выберите ответ:</Text>
                    )}

                    {showResult && !isCorrect && <Text fontWeight={600}>Правильное определение: {correctAnswer}</Text>}

                    <div className={styles.testItemVariants}>
                        <button
                            className={cn(styles.testItemVariant, {
                                [styles.choosed]: trueAnswer,
                                [styles.success]: showResult && trueAnswer !== null && isCorrect,
                                [styles.error]:
                                    showResult && trueAnswer !== null && trueAnswer && trueAnswer !== isCorrect,
                                [styles.grey]: showResult && trueAnswer === null && isCorrect,
                                [styles.disabled]: showResult,
                            })}
                            onClick={() => chooseVariant(true)}
                        >
                            Верно
                        </button>

                        <button
                            className={cn(styles.testItemVariant, {
                                [styles.choosed]: !trueAnswer && trueAnswer !== null,
                                [styles.success]: showResult && trueAnswer !== null && !isCorrect,
                                [styles.error]:
                                    showResult && trueAnswer !== null && !trueAnswer && trueAnswer !== isCorrect,
                                [styles.grey]: showResult && trueAnswer === null && !isCorrect,
                                [styles.disabled]: showResult,
                            })}
                            onClick={() => chooseVariant(false)}
                        >
                            Неверно
                        </button>
                    </div>
                </div>
            </div>
        );
    },
);

TestValidationItem.displayName = 'TestValidationItem';

export default TestValidationItem;
