'use client';

import React from 'react';
import cn from 'classnames';

import styles from './index.module.scss';

import { ArrowBottomLong, ArrowTopLong } from '@/shared/icons';

type Props = {
    data: any;
    red?: number;
    green?: number;
    id: number;
    isPoint: boolean;
    callbackRed?: () => void;
    callbackGreen?: () => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>, id: number) => void;
};

const CreateTableItem: React.FC<Props> = ({
    data,
    red,
    green,
    id,
    isPoint = false,
    callbackRed = () => {},
    callbackGreen = () => {},
    onChange = () => {},
}) => {
    const { primaryScore, secondaryScore } = data || {};

    return (
        <div
            className={cn(styles.subjectPointsItem, {
                [styles.error]: red != undefined && red !== null && red >= id,
                [styles.success]: green != undefined && green !== null && green <= id,
            })}
        >
            <p className={styles.subjectPointsValue}>{isPoint ? primaryScore + 1 : primaryScore}</p>

            <div className={styles.subjectPointsActions}>
                <button
                    className={cn(styles.subjectPointsAction, styles.top, {
                        [styles.show]: red === id,
                    })}
                    onClick={callbackRed}
                >
                    <ArrowTopLong />
                </button>

                <button
                    className={cn(styles.subjectPointsAction, styles.bottom, {
                        [styles.show]: green === id,
                    })}
                    onClick={callbackGreen}
                >
                    <ArrowBottomLong />
                </button>
            </div>

            <input
                type="text"
                className={styles.subjectPointsValue}
                value={secondaryScore}
                onChange={(e) => onChange(e, id)}
            />
        </div>
    );
};

export default CreateTableItem;
