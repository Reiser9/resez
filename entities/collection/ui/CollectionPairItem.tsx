'use client';

import React from 'react';
import cn from 'classnames';
import parse from 'html-react-parser';
import Image from 'next/image';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import type { Pair } from '../model';
import { TextPoint } from '@/shared/ui/TextPoint';

type Props = {
    data: Pair;
    showAnswers?: boolean;
};

const CollectionPairItem: React.FC<Props> = ({ data, showAnswers = false }) => {
    const { questionText, questionPicture, answerText, answerPicture } = data || {};

    return (
        <div className={cn(base.item2, styles.memoCollectionPair)}>
            <TextPoint title="Термин">
                {questionPicture && (
                    <div className={styles.memoCollectionPairImage}>
                        <Image src={questionPicture} alt="image" fill />
                    </div>
                )}

                <div className={styles.memoCollectionPairText}>{parse(questionText)}</div>
            </TextPoint>

            <TextPoint blur={!showAnswers} title="Определение">
                {answerPicture && (
                    <div className={styles.memoCollectionPairImage}>
                        <Image src={answerPicture} alt="image" fill />
                    </div>
                )}

                <div className={styles.memoCollectionPairText}>{parse(answerText)}</div>
            </TextPoint>
        </div>
    );
};

export default CollectionPairItem;
