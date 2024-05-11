'use client';

import React, { ChangeEvent } from 'react';
import { read, utils } from 'xlsx';

import styles from './index.module.scss';

import { Excel } from '@/entities/collection';

type Props = {
    id: string;
    accept?: string;
    setData: (value: Excel[]) => void;
};

const ExcelFile: React.FC<Props> = ({ id, accept, setData }) => {
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files[0]) {
            return;
        }

        const file = e.target.files[0];
        const fileReader = new FileReader();

        fileReader.onload = (e: ProgressEvent<FileReader>) => {
            const target = e.target as FileReader;
            const data: ArrayBuffer | null = target.result as ArrayBuffer | null;

            if (!data) {
                return;
            }

            const dataArray = new Uint8Array(data);
            const workbook = read(dataArray, { type: 'array' });

            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];

            const excelData: Excel[] = utils.sheet_to_json(worksheet, { header: 'A' });
            console.log(excelData);

            if (excelData.length > 100) {
                return setData(excelData.slice(0, 100));
            }

            setData(excelData);
        };

        fileReader.onloadend = () => {
            e.target.value = '';
        };

        fileReader.readAsArrayBuffer(file);
    };

    return <input id={id} type="file" className={styles.file} accept={accept || '.xlsx'} onChange={onInputChange} />;
};

export default ExcelFile;
