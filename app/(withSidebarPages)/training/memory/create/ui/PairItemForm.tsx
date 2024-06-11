<<<<<<< HEAD
'use client';

import React from 'react';
import cn from 'classnames';
import Image from 'next/image';

import styles from '../../index.module.scss';

import { IconButton } from '@/shared/ui/Button';
import { Delete, Photo, Swap } from '@/shared/icons';
import { File } from '@/shared/ui/File';
import { Input } from '@/shared/ui/Input';
import { PairDTO } from '@/entities/collection';
import { useCollections } from '@/features/collection';

type Props = {
    pairs: PairDTO[];
    setPairs: React.Dispatch<React.SetStateAction<PairDTO[]>>;
    addNewPair: () => void;
    error: boolean;
    setError: React.Dispatch<React.SetStateAction<number[]>>;
    questionText: string;
    setQuestionText: React.Dispatch<React.SetStateAction<string>>;
    questionPicture: string;
    setQuestionPicture: React.Dispatch<React.SetStateAction<string>>;
    answerText: string;
    setAnswerText: React.Dispatch<React.SetStateAction<string>>;
    answerPicture: string;
    setAnswerPicture: React.Dispatch<React.SetStateAction<string>>;
};

const PairItemForm: React.FC<Props> = ({
    pairs,
    setPairs,
    addNewPair,
    error,
    setError,
    questionText,
    setQuestionText,
    questionPicture,
    setQuestionPicture,
    answerText,
    setAnswerText,
    answerPicture,
    setAnswerPicture,
}) => {
    const { uploadImage } = useCollections();

    const enterNewPair = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addNewPair();
        }
    };

    const removePairForm = () => {
        const lastPair = pairs[pairs.length - 1];

        setQuestionText(lastPair.questionText || '');
        setQuestionPicture(lastPair.questionPicture || '');
        setAnswerText(lastPair.answerText || '');
        setAnswerPicture(lastPair.answerPicture || '');

        setPairs((prev) => prev.slice(0, -1));
        setError((prev) => prev.filter((item) => item !== -1));
    };

    const swapElements = () => {
        const tempQuestion = questionText;

        setQuestionText(answerText);
        setAnswerText(tempQuestion);
        setQuestionPicture(answerPicture);
        setAnswerPicture(questionPicture);
    };

    const uploadImageHandler = async (image: File | null, setImage: (url: string) => void) => {
        if (!image) {
            return;
        }

        let formData = new FormData();
        formData.append('file', image);

        const url = await uploadImage(formData);

        if (!url) {
            return;
        }

        setImage(url.url);
    };

    const removeImageHandler = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        setImage: (image: string) => void,
    ) => {
        e.preventDefault();
        setImage('');
    };

    return (
        <div
            className={cn(styles.cardCollectionItem, {
                [styles.error]: error,
            })}
        >
            <div className={styles.cardCollectionItemNumberInner}>
                <p className={styles.cardCollectionItemNumber}>{pairs.length + 1}</p>

                <IconButton variant="danger" small disabled={!pairs.length} onClick={removePairForm}>
                    <Delete />
                </IconButton>
            </div>

            <div className={styles.cardCollectionItemContent}>
                <div className={styles.cardCollectionItemHalf}>
                    <File id="questionImage" onChange={(file: File) => uploadImageHandler(file, setQuestionPicture)} />

                    <label
                        htmlFor="questionImage"
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
                                onClick={(e) => removeImageHandler(e, setQuestionPicture)}
                            >
                                <Delete />
                            </IconButton>
                        )}
                    </label>

                    <Input
                        onKeyDown={(e) => enterNewPair(e)}
                        title="Вопрос"
                        variant="textarea"
                        lengthLimit={750}
                        trackLength
                        value={questionText}
                        setValue={setQuestionText}
                    />
                </div>

                <div className={styles.cardCollectionItemHalf}>
                    <File id="answerImage" onChange={(file: File) => uploadImageHandler(file, setAnswerPicture)} />

                    <label
                        htmlFor="answerImage"
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
                                onClick={(e) => removeImageHandler(e, setAnswerPicture)}
                            >
                                <Delete />
                            </IconButton>
                        )}
                    </label>

                    <Input
                        onKeyDown={(e) => enterNewPair(e)}
                        title="Ответ"
                        variant="textarea"
                        lengthLimit={750}
                        trackLength
                        value={answerText}
                        setValue={setAnswerText}
                    />
                </div>

                <button className={styles.addCardCollectionPairSwap} onClick={swapElements}>
                    <Swap />
                </button>
            </div>
        </div>
    );
};

export default PairItemForm;
=======
'use client';

import React from 'react';
import cn from 'classnames';
import Image from 'next/image';

import styles from '../../index.module.scss';

import { IconButton } from '@/shared/ui/Button';
import { Delete, Photo, Swap } from '@/shared/icons';
import { File } from '@/shared/ui/File';
import { Input } from '@/shared/ui/Input';
import { PairDTO } from '@/entities/collection';
import { useCollections } from '@/features/collection';

type Props = {
    pairs: PairDTO[];
    setPairs: React.Dispatch<React.SetStateAction<PairDTO[]>>;
    addNewPair: () => void;
    error: boolean;
    setError: React.Dispatch<React.SetStateAction<number[]>>;
    questionText: string;
    setQuestionText: React.Dispatch<React.SetStateAction<string>>;
    questionPicture: string;
    setQuestionPicture: React.Dispatch<React.SetStateAction<string>>;
    answerText: string;
    setAnswerText: React.Dispatch<React.SetStateAction<string>>;
    answerPicture: string;
    setAnswerPicture: React.Dispatch<React.SetStateAction<string>>;
};

const PairItemForm: React.FC<Props> = ({
    pairs,
    setPairs,
    addNewPair,
    error,
    setError,
    questionText,
    setQuestionText,
    questionPicture,
    setQuestionPicture,
    answerText,
    setAnswerText,
    answerPicture,
    setAnswerPicture,
}) => {
    const { uploadImage } = useCollections();

    const enterNewPair = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addNewPair();
        }
    };

    const removePairForm = () => {
        const lastPair = pairs[pairs.length - 1];

        setQuestionText(lastPair.questionText || '');
        setQuestionPicture(lastPair.questionPicture || '');
        setAnswerText(lastPair.answerText || '');
        setAnswerPicture(lastPair.answerPicture || '');

        setPairs((prev) => prev.slice(0, -1));
        setError((prev) => prev.filter((item) => item !== -1));
    };

    const swapElements = () => {
        const tempQuestion = questionText;

        setQuestionText(answerText);
        setAnswerText(tempQuestion);
        setQuestionPicture(answerPicture);
        setAnswerPicture(questionPicture);
    };

    const uploadImageHandler = async (image: File | null, setImage: (url: string) => void) => {
        if (!image) {
            return;
        }

        let formData = new FormData();
        formData.append('file', image);

        const url = await uploadImage(formData);

        if (!url) {
            return;
        }

        setImage(url.url);
    };

    const removeImageHandler = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        setImage: (image: string) => void,
    ) => {
        e.preventDefault();
        setImage('');
    };

    return (
        <div
            className={cn(styles.cardCollectionItem, {
                [styles.error]: error,
            })}
        >
            <div className={styles.cardCollectionItemNumberInner}>
                <p className={styles.cardCollectionItemNumber}>{pairs.length + 1}</p>

                <IconButton variant="danger" small disabled={!pairs.length} onClick={removePairForm}>
                    <Delete />
                </IconButton>
            </div>

            <div className={styles.cardCollectionItemContent}>
                <div className={styles.cardCollectionItemHalf}>
                    <File id="questionImage" onChange={(file: File) => uploadImageHandler(file, setQuestionPicture)} />

                    <label
                        htmlFor="questionImage"
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
                                onClick={(e) => removeImageHandler(e, setQuestionPicture)}
                            >
                                <Delete />
                            </IconButton>
                        )}
                    </label>

                    <Input
                        onKeyDown={(e) => enterNewPair(e)}
                        title="Вопрос"
                        variant="textarea"
                        lengthLimit={750}
                        trackLength
                        value={questionText}
                        setValue={setQuestionText}
                    />
                </div>

                <div className={styles.cardCollectionItemHalf}>
                    <File id="answerImage" onChange={(file: File) => uploadImageHandler(file, setAnswerPicture)} />

                    <label
                        htmlFor="answerImage"
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
                                onClick={(e) => removeImageHandler(e, setAnswerPicture)}
                            >
                                <Delete />
                            </IconButton>
                        )}
                    </label>

                    <Input
                        onKeyDown={(e) => enterNewPair(e)}
                        title="Ответ"
                        variant="textarea"
                        lengthLimit={750}
                        trackLength
                        value={answerText}
                        setValue={setAnswerText}
                    />
                </div>

                <button className={styles.addCardCollectionPairSwap} onClick={swapElements}>
                    <Swap />
                </button>
            </div>
        </div>
    );
};

export default PairItemForm;
>>>>>>> c61da454dd30e7ca31637fe711cf5e35c92c2018
