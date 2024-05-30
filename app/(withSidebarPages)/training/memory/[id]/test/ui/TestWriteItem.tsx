'use client';

import React from 'react';
import Image from 'next/image';

import styles from '../index.module.scss';

import type { CollectionWrite } from '@/entities/collection';
import { Text } from '@/shared/ui/Text';
import { Input } from '@/shared/ui/Input';
import { percentCorrectAnswer } from '@/shared/utils/levenshteinDistance';
import { generateCorrectPhrase, generateWrongPhrase } from '@/shared/utils/generatePhrase';

type Props = {
    data: CollectionWrite;
    number: number;
    handleTestResult: (id: number, correct: boolean) => void;
    showResult: boolean;
};

const TestWriteItem: React.FC<Props> = ({ data, number, handleTestResult, showResult }) => {
    const { questionText, questionPicture, id, answerText } = data;

    const [inputAnswer, setInputAnswer] = React.useState('');
    const [answerIsCorrect, setAnswerIsCorrect] = React.useState(false);

    const checkAnswer = () => {
        let isCorrectAnswer = false;
        const hasNumber = /\d/;
        if (hasNumber.test(answerText) || hasNumber.test(inputAnswer)) {
            isCorrectAnswer = answerText === inputAnswer;
            setAnswerIsCorrect(isCorrectAnswer);
        } else {
            isCorrectAnswer = percentCorrectAnswer(answerText, inputAnswer) > 85;
            setAnswerIsCorrect(isCorrectAnswer);
        }

        handleTestResult(id, isCorrectAnswer);
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
            </div>

            <div className={styles.testItemBottom}>
                {showResult ? (
                    answerIsCorrect ? (
                        <Text fontWeight={600} color="success">
                            {generateCorrectPhrase()}
                        </Text>
                    ) : (
                        <>
                            <Text fontWeight={600} color="error">
                                {generateWrongPhrase()}
                            </Text>

                            <Text fontWeight={600}>Правильный ответ: {answerText}</Text>
                        </>
                    )
                ) : (
                    <Text fontWeight={600}>Введите ответ:</Text>
                )}

                <Input
                    disabled={showResult}
                    color="white"
                    value={inputAnswer}
                    setValue={setInputAnswer}
                    onBlur={checkAnswer}
                    isSuccess={showResult && answerIsCorrect}
                    isError={showResult && !answerIsCorrect}
                />
            </div>
        </div>
    );
};

export default TestWriteItem;
