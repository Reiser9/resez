'use client';

import React from 'react';
import Image from 'next/image';
import cn from 'classnames';
import { useQuery } from '@tanstack/react-query';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import styles from '../../../index.module.scss';

import type { PairDTO } from '@/entities/collection';
import { Delete, NineDots, Photo, ResezPremium, Swap } from '@/shared/icons';
import useShortInfo from '@/features/user/data/useShortInfo';
import { useFile } from '@/features/file';

import { IconButton } from '@/shared/ui/Button';
import { File } from '@/shared/ui/File';
import { Input } from '@/shared/ui/Input';
import { Text } from '@/shared/ui/Text';

type Props = {
    data: PairDTO;
    number: number;
    error: boolean;
    questionImageId: string;
    answerImageId: string;
    pairs: PairDTO[];
    setPairs: React.Dispatch<React.SetStateAction<PairDTO[]>>;
    removePair: () => void;
};

const PairItem: React.FC<Props> = ({
    data,
    number,
    error,
    questionImageId,
    answerImageId,
    removePair,
    pairs,
    setPairs,
}) => {
    const { questionText, questionPicture, answerText, answerPicture, id: pairId } = data || {};
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: pairId,
        data: {
            type: 'pair',
            data,
        },
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
    };

    const { getShortInfo } = useShortInfo();
    const { uploadFile } = useFile();

    const { data: user, isLoading: userIsLoading } = useQuery({
        queryKey: ['short_info'],
        queryFn: () => getShortInfo(),
    });

    const { subscription } = user?.user || {};

    const handleChange = (index: number, value: string, name: string) => {
        const newValues = [...pairs];

        newValues[index] = {
            ...newValues[index],
            [name]: value,
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
            id: pairs[id].id,
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

        const url = await uploadFile(formData);

        if (!url?.file?.url) {
            return;
        }

        const newValues = [...pairs];

        newValues[index] = {
            ...newValues[index],
            [name]: url.file.url,
        };

        setPairs(newValues);
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={cn(styles.cardCollectionItem, {
                [styles.error]: error,
                [styles.dragging]: isDragging,
            })}
        >
            <div className={styles.cardCollectionItemNumberInner}>
                <p className={styles.cardCollectionItemNumber}>{number + 1}</p>

                <div className={styles.cardCollectionItemActions}>
                    <IconButton {...attributes} {...listeners} small className={styles.cardCollectionItemMove}>
                        <NineDots />
                    </IconButton>

                    <IconButton
                        small
                        onClick={() => swapElementsInArray(number)}
                        className={styles.cardCollectionItemSwap}
                    >
                        <Swap />
                    </IconButton>

                    <IconButton variant="danger" small onClick={removePair} disabled={pairs.length === 1}>
                        <Delete />
                    </IconButton>
                </div>
            </div>

            <div className={styles.cardCollectionItemContent}>
                <div className={styles.cardCollectionItemHalf}>
                    <Input
                        resizeChange={(value) => handleChange(number, value, 'questionText')}
                        title="Термин"
                        resizable
                        lengthLimit={750}
                        trackLength
                        value={questionText}
                    />

                    {subscription ? (
                        <>
                            <File
                                id={questionImageId}
                                onChange={(file: File) => uploadImageInArray(number, 'questionPicture', file)}
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
                                        onClick={(e) => removeImageInArray(e, number, 'questionPicture')}
                                    >
                                        <Delete />
                                    </IconButton>
                                )}
                            </label>
                        </>
                    ) : (
                        <div className={cn(styles.cardCollectionItemHalfImage, styles.lock)}>
                            <Text fontWeight={500} variant="text2" center>
                                Для загрузки изображений требуется подписка
                            </Text>

                            <ResezPremium />
                        </div>
                    )}
                </div>

                <div className={styles.cardCollectionItemHalf}>
                    <Input
                        resizeChange={(value) => handleChange(number, value, 'answerText')}
                        title="Определение"
                        resizable
                        lengthLimit={750}
                        trackLength
                        value={answerText}
                    />

                    {subscription ? (
                        <>
                            <File
                                id={answerImageId}
                                onChange={(file: File) => uploadImageInArray(number, 'answerPicture', file)}
                            />

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
                                        onClick={(e) => removeImageInArray(e, number, 'answerPicture')}
                                    >
                                        <Delete />
                                    </IconButton>
                                )}
                            </label>
                        </>
                    ) : (
                        <div className={cn(styles.cardCollectionItemHalfImage, styles.lock)}>
                            <Text fontWeight={500} variant="text2" center>
                                Для загрузки изображений требуется подписка
                            </Text>

                            <ResezPremium />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PairItem;
