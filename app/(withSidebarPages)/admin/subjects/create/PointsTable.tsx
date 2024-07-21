'use client';

import React, { ChangeEvent } from 'react';

import styles from './index.module.scss';

import { Table } from '@/shared/ui/Table';
import CreateTableItem from './CreateTableItem';
import { ScoreConversionItem } from '@/entities/subject';

type Props = {
    isPoint: boolean;
    primaryCount: number | null;
    red: number;
    green: number;
    handleChangeInput: (e: ChangeEvent<HTMLInputElement>, id: number) => void;
    setRedHandler: (id: number) => void;
    setGreenHandler: (id: number) => void;
    elements: ScoreConversionItem[];
};

const PointsTable: React.FC<Props> = ({
    isPoint,
    primaryCount,
    red,
    green,
    handleChangeInput,
    setRedHandler,
    setGreenHandler,
    elements,
}) => {
    return (
        <Table>
            {isPoint && <p className={styles.subjectsPointsValue}>Количество первичных баллов: {primaryCount}</p>}

            <div className={styles.subjectPointsItem}>
                <p className={styles.subjectPointsHead}>{isPoint ? 'Оценка' : 'Первичный балл'}</p>

                <div className={styles.subjectPointsActions}></div>

                <p className={styles.subjectPointsHead}>{isPoint ? 'Баллы' : 'Вторичный балл'}</p>
            </div>

            {elements?.map((data, id) => (
                <CreateTableItem
                    key={id}
                    data={data}
                    red={red}
                    id={id}
                    green={green}
                    callbackRed={() => setRedHandler(id)}
                    callbackGreen={() => setGreenHandler(id)}
                    onChange={handleChangeInput}
                    isPoint={isPoint}
                />
            ))}
        </Table>
    );
};

export default PointsTable;
