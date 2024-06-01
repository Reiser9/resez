'use client';

import React from 'react';
import Image from 'next/image';
import cn from 'classnames';

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

const TestWriteItem = React.forwardRef(({ data, number, handleTestResult, showResult }: Props, ref: React.ForwardedRef<HTMLDivElement>) => {
    const { questionText, questionPicture, id, answerText } = data;

    const [inputAnswer, setInputAnswer] = React.useState('');
    const [answerIsCorrect, setAnswerIsCorrect] = React.useState(false);

    const checkAnswer = () => {
        if(!inputAnswer.trim()){
            return;
        }

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

    React.useEffect(() => {
        if(!showResult){
            setInputAnswer("");
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
                    ) : !inputAnswer ? (
                        <Text fontWeight={600} color='grey'>
                            Вернитесь к этому вопросу позже!
                        </Text>
                    ) : (
                        <Text fontWeight={600} color="error">
                            {generateWrongPhrase()}
                        </Text>
                    )
                ) : (
                    <Text fontWeight={600}>Введите ответ:</Text>
                )}

                {showResult && <Text fontWeight={600}>Правильный ответ: {answerText}</Text>}

                {showResult
                ? <div className={cn(styles.testItemAnswer, {
                    [styles.success]: inputAnswer.trim() && answerIsCorrect,
                    [styles.error]: inputAnswer.trim() && !answerIsCorrect,
                    [styles.grey]: !inputAnswer.trim()
                })}>
                    {inputAnswer ? inputAnswer : "Нет ответа"}
                </div>
                : <Input
                    disabled={showResult}
                    color="white"
                    value={inputAnswer}
                    setValue={setInputAnswer}
                    onBlur={checkAnswer}
                />}
            </div>
        </div>
    );
});

TestWriteItem.displayName = 'TestWriteItem';

export default TestWriteItem;
