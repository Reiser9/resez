'use client';

import React from 'react';
import Image from 'next/image';
import cn from 'classnames';

import styles from '../index.module.scss';

import { Text } from '@/shared/ui/Text';
import type { CollectionChoice, CollectionValidation, CollectionWrite } from '@/entities/collection';

type Props = {
    data: CollectionValidation;
    number: number;
    handleTestResult: (id: number, answer: boolean, data: CollectionValidation) => void;
    showResult: boolean;
};

const TestValidationItem: React.FC<Props> = ({ data, number, handleTestResult, showResult }) => {
    const { questionText, questionPicture, answerText, answerPicture, isCorrect, id } = data;

    const [trueAnswer, setTrueAnswer] = React.useState<boolean | null>(null);

    const chooseVariant = (answer: boolean) => {
        if(showResult){
            return;
        }

        setTrueAnswer(answer);

        handleTestResult(id, !!trueAnswer, data);
    };

    return (
        <div className={styles.testItem}>
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

                        <Text variant="h4">{questionText}</Text>
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

                        <Text variant="h4">{answerText}</Text>
                    </div>
                </div>
            </div>

            <div className={styles.testItemBottom}>
                <Text fontWeight={600}>Выберите ответ:</Text>

                <div className={styles.testItemVariants}>
                    <button
                        className={cn(styles.testItemVariant, {
                            [styles.choosed]: trueAnswer,
                            [styles.success]: showResult && trueAnswer && isCorrect,
                            [styles.error]: showResult && trueAnswer && trueAnswer !== isCorrect,
                            [styles.disabled]: showResult
                        })}
                        onClick={() => chooseVariant(true)}
                    >
                        Верно
                    </button>

                    <button
                        className={cn(styles.testItemVariant, {
                            [styles.choosed]: !trueAnswer && trueAnswer !== null,
                            [styles.success]: showResult && !trueAnswer && !isCorrect,
                            [styles.error]: showResult && !trueAnswer && trueAnswer !== isCorrect,
                            [styles.disabled]: showResult
                        })}
                        onClick={() => chooseVariant(false)}
                    >
                        Неверно
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TestValidationItem;
