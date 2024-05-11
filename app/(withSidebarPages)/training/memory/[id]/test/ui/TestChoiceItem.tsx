'use client';

import React from 'react';
import Image from 'next/image';
import cn from 'classnames';

import styles from '../index.module.scss';

import { Text } from '@/shared/ui/Text';
import type { CollectionChoice } from '@/entities/collection';

type Props = {
    data: CollectionChoice;
    number: number;
    handleTestResult: (id: number, answer: number, data: CollectionChoice) => void;
    showResult: boolean;
};

const TestChoiceItem: React.FC<Props> = ({ data, number, handleTestResult, showResult }) => {
    const { questionText, questionPicture, choices, id } = data;

    const [activeId, setActiveId] = React.useState<number>();

    const chooseVariant = (choiceId: number, id: number) => {
        if(showResult){
            return;
        }

        setActiveId(choiceId);

        handleTestResult(id, choiceId, data);
    };

    return (
        <div key={data.id} className={styles.testItem}>
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
                <Text fontWeight={600}>Выберите ответ:</Text>

                <div className={styles.testItemVariants}>
                    {choices.map((data) => (
                        <button
                            key={data.id}
                            className={cn(styles.testItemVariant, {
                                [styles.choosed]: activeId === data.id,
                                [styles.success]: showResult && data.isCorrect,
                                [styles.error]: showResult && activeId === data.id && !data.isCorrect,
                                [styles.disabled]: showResult
                            })}
                            onClick={() => chooseVariant(data.id, id)}
                        >
                            {data.answerText}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TestChoiceItem;
