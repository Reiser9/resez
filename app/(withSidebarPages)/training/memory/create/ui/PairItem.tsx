'use client';

import React from 'react';
import Image from 'next/image';
import cn from 'classnames';

import styles from '../../index.module.scss';

import { Delete, Photo, Swap } from '@/shared/icons';
import { IconButton } from '@/shared/ui/Button';
import { File } from '@/shared/ui/File';
import { Input } from '@/shared/ui/Input';
import type { PairDTO } from '@/entities/collection';
import useCollections from '@/features/collection/useCollections';

type Props = {
    data: PairDTO;
    id: number;
    error: boolean;
    questionImageId: string;
    answerImageId: string;
    pairs: PairDTO[];
    setPairs: React.Dispatch<React.SetStateAction<PairDTO[]>>;
    addNewPair: () => void;
    removePair: () => void;
};

const PairItem: React.FC<Props> = ({
    data,
    id,
    error,
    questionImageId,
    answerImageId,
    addNewPair,
    removePair,
    pairs,
    setPairs,
}) => {
    const { uploadImage } = useCollections();

    const enterNewPair = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addNewPair();
        }
    };

    const handleChange = (
        index: number,
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
        name: string,
    ) => {
        const newValues = [...pairs];

        newValues[index] = {
            ...newValues[index],
            [name]: e.target.value,
        };

        setPairs(newValues);
    };

    const removeImageInArray = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        index: number,
        name: string,
    ) => {
        e.preventDefault();
        const newValues = [...pairs];

        newValues[index] = {
            ...newValues[index],
            [name]: '',
        };

        setPairs(newValues);
    };

    const swapElementsInArray = (id: number) => {
        const tempObject = {
            questionText: pairs[id].answerText,
            questionPicture: pairs[id].answerPicture,
            answerText: pairs[id].questionText,
            answerPicture: pairs[id].questionPicture,
        };

        const updatedObjects = [...pairs];
        updatedObjects.splice(id, 1, tempObject);
        setPairs(updatedObjects);
    };

    const uploadImageInArray = async (index: number, name: string, imageFile: File | null) => {
        if (!imageFile) {
            return;
        }

        let formData = new FormData();
        formData.append('file', imageFile);

        const url = await uploadImage(formData);

        if (!url) {
            return;
        }

        const newValues = [...pairs];

        newValues[index] = {
            ...newValues[index],
            [name]: url.url,
        };

        setPairs(newValues);
    };

    const { questionText, questionPicture, answerText, answerPicture } = data || {};

    return (
        <div
            className={cn(styles.cardCollectionItem, {
                [styles.error]: error,
            })}
        >
            <div className={styles.cardCollectionItemNumberInner}>
                <p className={styles.cardCollectionItemNumber}>{id + 1}</p>

                <IconButton variant="danger" small onClick={removePair}>
                    <Delete />
                </IconButton>
            </div>

            <div className={styles.cardCollectionItemContent}>
                <div className={styles.cardCollectionItemHalf}>
                    <File
                        id={questionImageId}
                        onChange={(file: File) => uploadImageInArray(id, 'questionPicture', file)}
                    />

                    <label
                        htmlFor={questionImageId}
                        className={cn(styles.cardCollectionItemHalfImage, {
                            [styles.imageFill]: questionPicture,
                        })}
                    >
                        {questionPicture ? <Image src={questionPicture} alt="image" fill /> : <Photo />}

                        {questionPicture && (
                            <IconButton
                                small
                                circle
                                variant="danger"
                                className={styles.cardCollectionItemImageDelete}
                                onClick={(e) => removeImageInArray(e, id, 'questionPicture')}
                            >
                                <Delete />
                            </IconButton>
                        )}
                    </label>

                    <Input
                        onChange={(e) => handleChange(id, e, 'questionText')}
                        onKeyDown={(e) => enterNewPair(e)}
                        title="Вопрос"
                        variant="textarea"
                        lengthLimit={750}
                        trackLength
                        value={questionText}
                    />
                </div>

                <div className={styles.cardCollectionItemHalf}>
                    <File id={answerImageId} onChange={(file: File) => uploadImageInArray(id, 'answerPicture', file)} />

                    <label
                        htmlFor={answerImageId}
                        className={cn(styles.cardCollectionItemHalfImage, {
                            [styles.imageFill]: answerPicture,
                        })}
                    >
                        {answerPicture ? <Image src={answerPicture} alt="image" fill /> : <Photo />}

                        {answerPicture && (
                            <IconButton
                                small
                                circle
                                variant="danger"
                                className={styles.cardCollectionItemImageDelete}
                                onClick={(e) => removeImageInArray(e, id, 'answerPicture')}
                            >
                                <Delete />
                            </IconButton>
                        )}
                    </label>

                    <Input
                        onChange={(e) => handleChange(id, e, 'answerText')}
                        onKeyDown={(e) => enterNewPair(e)}
                        title="Ответ"
                        variant="textarea"
                        lengthLimit={750}
                        trackLength
                        value={answerText}
                    />
                </div>

                <button className={styles.addCardCollectionPairSwap} onClick={() => swapElementsInArray(id)}>
                    <Swap />
                </button>
            </div>
        </div>
    );
};

export default PairItem;
