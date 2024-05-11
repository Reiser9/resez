'use client';

import React from 'react';
import Image from 'next/image';

import styles from '../index.module.scss';

import type { CollectionChoice, CollectionValidation, CollectionWrite } from '@/entities/collection';
import { Text } from '@/shared/ui/Text';
import { Input } from '@/shared/ui/Input';

type Props = {
    data: CollectionWrite;
    number: number;
    handleTestResult: (id: number, answer: string, data: CollectionWrite) => void;
    showResult: boolean;
};

const TestWriteItem: React.FC<Props> = ({ data, number, handleTestResult, showResult }) => {
    const { questionText, questionPicture, id } = data;

    const [inputAnswer, setInputAnswer] = React.useState('');

    const checkAnswer = () => {
        handleTestResult(id, inputAnswer, data);
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
                <Text fontWeight={600}>Введите ответ:</Text>

                <Input color="white" value={inputAnswer} setValue={setInputAnswer} onBlur={checkAnswer} />
            </div>
        </div>
    );
};

export default TestWriteItem;
