import React from 'react';

import styles from './index.module.scss';

import { ArrowBottomLong, ArrowTopLong } from '@/shared/icons';

type Props = {
    data: any,
    red?: number,
    green?: number,
    id: number,
    isPoint: boolean,
    callbackRed?: () => void,
    callbackGreen?: () => void,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>, id: number) => void,
}

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
            className={`${styles.subjectPointsItem}${red && red !== null && red >= id ? ` ${styles.error}` : ''}${
                green && green !== null && green <= id ? ` ${styles.success}` : ''
            }`}
        >
            <p className={styles.subjectPointsValue}>{isPoint ? primaryScore + 1 : primaryScore}</p>

            <div className={styles.subjectPointsActions}>
                <button
                    className={`${styles.subjectPointsAction} ${styles.top}${red === id ? ` ${styles.show}` : ''}`}
                    onClick={callbackRed}
                >
                    <ArrowTopLong />
                </button>

                <button
                    className={`${styles.subjectPointsAction} ${styles.bottom}${green === id ? ` ${styles.show}` : ''}`}
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
