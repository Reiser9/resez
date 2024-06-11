<<<<<<< HEAD
'use client';

import React from 'react';
import Image from 'next/image';

import styles from '../../index.module.scss';

import { ExcelFile } from '@/shared/ui/File';
import { ConfirmModal, Modal } from '@/shared/ui/Modal';
import { Text } from '@/shared/ui/Text';
import { Excel } from '@/shared/icons';
import type { Excel as ExcelType, PairDTO } from '@/entities/collection';

type Props = {
    valueModal: boolean;
    setValueModal: (value: boolean) => void;
    scrollBottom: () => void;
    pairs: PairDTO[];
    setPairs: React.Dispatch<React.SetStateAction<PairDTO[]>>;
};

const ImportExcel: React.FC<Props> = ({ valueModal, setValueModal, scrollBottom, pairs, setPairs }) => {
    const [excelData, setExcelData] = React.useState<ExcelType[]>();
    const [replacePairs, setReplacePairs] = React.useState(false);

    const importExcel = () => {
        if (!excelData || !excelData.length) {
            return;
        }

        const importedPairs = excelData.map((data) => {
            return {
                questionText: data.A,
                questionPicture: '',
                answerText: data.B,
                answerPicture: '',
            };
        });

        setValueModal(false);

        if (pairs.length >= 1) {
            return setReplacePairs(true);
        }

        setPairs(importedPairs);
        scrollBottom();
    };

    const replacePairsOnExcel = (replace = false) => {
        if (!excelData || !excelData.length) {
            return;
        }

        const importedPairs = excelData.map((data) => {
            return {
                questionText: data.A,
                answerText: data.B,
            };
        });

        if (replace) {
            setPairs(importedPairs);
        } else {
            setPairs((prev) => [...prev, ...importedPairs]);
        }

        scrollBottom();
        setExcelData([]);
    };

    React.useEffect(() => {
        if (excelData && !!excelData.length) {
            importExcel();
        }
    }, [excelData]);

    return (
        <>
            <Modal title="Импорт из Excel" value={valueModal} setValue={setValueModal}>
                <div className={styles.cardCollectionExcelInfo}>
                    <div className={styles.cardCollectionExcelWrapper}>
                        <div className={styles.cardCollectionExcelImg}>
                            <Image src="/img/excel-collection.png" alt="excel collection" fill />
                        </div>

                        <div className={styles.cardCollectionExcelPoints}>
                            <div className={styles.cardCollectionExcelPoint}>
                                <p className={styles.cardCollectionExcelPointNumber}>1</p>

                                <Text fontWeight={600}>Выберите файл формата .xlsx (Excel)</Text>
                            </div>

                            <div className={styles.cardCollectionExcelPoint}>
                                <p className={styles.cardCollectionExcelPointNumber}>2</p>

                                <Text fontWeight={600}>
                                    Напомним, что максимальное число карточек в коллекции для вас - 100, если в вашем
                                    файле их будет больше, то импортируются лишь 100
                                </Text>
                            </div>

                            <div className={styles.cardCollectionExcelPoint}>
                                <p className={styles.cardCollectionExcelPointNumber}>3</p>

                                <Text fontWeight={600}>Пример как должен выглядеть файл вы можете наблюдать слева</Text>
                            </div>
                        </div>
                    </div>
                </div>

                <ExcelFile id="excelFile" setData={setExcelData} accept=".xlsx" />

                <label htmlFor="excelFile" className={styles.cardCollectionExcelButton}>
                    <Excel />
                    Выбрать файл
                </label>
            </Modal>

            <ConfirmModal
                text="У вас уже есть существующие вопросы. Хотите заменить их новыми из файла Excel или добавить новые вопросы в конец списка?"
                value={replacePairs}
                setValue={setReplacePairs}
                callback={() => replacePairsOnExcel(true)}
                confirmText="Заменить"
                rejectCallback={replacePairsOnExcel}
                rejectText="Добавить"
            ></ConfirmModal>
        </>
    );
};

export default ImportExcel;
=======
'use client';

import React from 'react';
import Image from 'next/image';

import styles from '../../index.module.scss';

import { ExcelFile } from '@/shared/ui/File';
import { ConfirmModal, Modal } from '@/shared/ui/Modal';
import { Text } from '@/shared/ui/Text';
import { Excel } from '@/shared/icons';
import type { Excel as ExcelType, PairDTO } from '@/entities/collection';

type Props = {
    valueModal: boolean;
    setValueModal: (value: boolean) => void;
    scrollBottom: () => void;
    pairs: PairDTO[];
    setPairs: React.Dispatch<React.SetStateAction<PairDTO[]>>;
};

const ImportExcel: React.FC<Props> = ({ valueModal, setValueModal, scrollBottom, pairs, setPairs }) => {
    const [excelData, setExcelData] = React.useState<ExcelType[]>();
    const [replacePairs, setReplacePairs] = React.useState(false);

    const importExcel = () => {
        if (!excelData || !excelData.length) {
            return;
        }

        const importedPairs = excelData.map((data) => {
            return {
                questionText: data.A,
                questionPicture: '',
                answerText: data.B,
                answerPicture: '',
            };
        });

        setValueModal(false);

        if (pairs.length >= 1) {
            return setReplacePairs(true);
        }

        setPairs(importedPairs);
        scrollBottom();
    };

    const replacePairsOnExcel = (replace = false) => {
        if (!excelData || !excelData.length) {
            return;
        }

        const importedPairs = excelData.map((data) => {
            return {
                questionText: data.A,
                answerText: data.B,
            };
        });

        if (replace) {
            setPairs(importedPairs);
        } else {
            setPairs((prev) => [...prev, ...importedPairs]);
        }

        scrollBottom();
        setExcelData([]);
    };

    React.useEffect(() => {
        if (excelData && !!excelData.length) {
            importExcel();
        }
    }, [excelData]);

    return (
        <>
            <Modal title="Импорт из Excel" value={valueModal} setValue={setValueModal}>
                <div className={styles.cardCollectionExcelInfo}>
                    <div className={styles.cardCollectionExcelWrapper}>
                        <div className={styles.cardCollectionExcelImg}>
                            <Image src="/img/excel-collection.png" alt="excel collection" fill />
                        </div>

                        <div className={styles.cardCollectionExcelPoints}>
                            <div className={styles.cardCollectionExcelPoint}>
                                <p className={styles.cardCollectionExcelPointNumber}>1</p>

                                <Text fontWeight={600}>Выберите файл формата .xlsx (Excel)</Text>
                            </div>

                            <div className={styles.cardCollectionExcelPoint}>
                                <p className={styles.cardCollectionExcelPointNumber}>2</p>

                                <Text fontWeight={600}>
                                    Напомним, что максимальное число карточек в коллекции для вас - 100, если в вашем
                                    файле их будет больше, то импортируются лишь 100
                                </Text>
                            </div>

                            <div className={styles.cardCollectionExcelPoint}>
                                <p className={styles.cardCollectionExcelPointNumber}>3</p>

                                <Text fontWeight={600}>Пример как должен выглядеть файл вы можете наблюдать слева</Text>
                            </div>
                        </div>
                    </div>
                </div>

                <ExcelFile id="excelFile" setData={setExcelData} accept=".xlsx" />

                <label htmlFor="excelFile" className={styles.cardCollectionExcelButton}>
                    <Excel />
                    Выбрать файл
                </label>
            </Modal>

            <ConfirmModal
                text="У вас уже есть существующие вопросы. Хотите заменить их новыми из файла Excel или добавить новые вопросы в конец списка?"
                value={replacePairs}
                setValue={setReplacePairs}
                callback={() => replacePairsOnExcel(true)}
                confirmText="Заменить"
                rejectCallback={replacePairsOnExcel}
                rejectText="Добавить"
            ></ConfirmModal>
        </>
    );
};

export default ImportExcel;
>>>>>>> c61da454dd30e7ca31637fe711cf5e35c92c2018
