'use client';

import React from 'react';
import Image from 'next/image';
import cn from 'classnames';

import styles from '../index.module.scss';

import { Text } from '@/shared/ui/Text';
import type { CollectionChoice } from '@/entities/collection';
import { generateCorrectPhrase, generateWrongPhrase } from '@/shared/utils/generatePhrase';

type Props = {
    data: CollectionChoice;
    number: number;
    handleTestResult: (id: number, correct: boolean) => void;
    showResult: boolean;
};

const TestChoiceItem = React.forwardRef(({ data, number, handleTestResult, showResult }: Props, ref: React.ForwardedRef<HTMLDivElement>) => {
    const { questionText, questionPicture, choices, id } = data;

    const [activeId, setActiveId] = React.useState<number | null>(null);
    const [answerIsCorrect, setAnswerIsCorrect] = React.useState(false);

    const chooseVariant = (isCorrect: boolean, variantId: number, id: number) => {
        if (showResult) {
            return;
        }

        setActiveId(variantId);

        handleTestResult(id, isCorrect);
        setAnswerIsCorrect(isCorrect);
    };

    React.useEffect(() => {
        if(!showResult){
            setActiveId(null);
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
                    ) : activeId === null ? (
                        <Text fontWeight={600} color='grey'>
                            Вернитесь к этому вопросу позже!
                        </Text>
                    ) : (
                        <Text fontWeight={600} color="error">
                            {generateWrongPhrase()}
                        </Text>
                    )
                ) : (
                    <Text fontWeight={600}>Выберите ответ:</Text>
                )}

                <div className={styles.testItemVariants}>
                    {choices.map((data) => (
                        <button
                            key={data.id}
                            className={cn(styles.testItemVariant, {
                                [styles.choosed]: activeId === data.id,
                                [styles.success]: showResult && activeId !== null && data.isCorrect,
                                [styles.error]: showResult && activeId !== null && activeId === data.id && !data.isCorrect,
                                [styles.grey]: showResult && activeId === null && data.isCorrect,
                                [styles.disabled]: showResult,
                            })}
                            onClick={() => chooseVariant(data.isCorrect, data.id, id)}
                        >
                            {data.answerText}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
});

TestChoiceItem.displayName = 'TestChoiceItem';

export default TestChoiceItem;
