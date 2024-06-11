<<<<<<< HEAD
'use client';

import React from 'react';
import cn from 'classnames';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import Card from './Card';
import { BackButton, Button, IconButton } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { Check, Cross, Return } from '@/shared/icons';
import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';
import { useCollections } from '@/features/collection';
import { ProgressSteps } from '@/shared/ui/ProgressSteps';
import { LinkBlock } from '@/shared/ui/LinkBlock';

const MemoryCards = () => {
    const [currentCardNumber, setCurrentCardNumber] = React.useState(0);
    const [totalCorrect, setTotalCorrect] = React.useState(0);
    const [totalWrong, setTotalWrong] = React.useState(0);
    const [prevAnswer, setPrevAnswer] = React.useState<boolean | null>(null);
    const [isProcessPlaying, setIsProcessPlaying] = React.useState(false);

    const { id } = useParams();
    const { getPairsCollection } = useCollections();

    const { data, isLoading, isFetching, error, refetch } = useQuery({
        queryKey: ['collection_cards', id],
        queryFn: () => getPairsCollection(String(id)),
        enabled: !!id,
    });

    const wrongAnswer = () => {
        setCurrentCardNumber((prev) => prev + 1);
        setTotalWrong((prev) => prev + 1);
        setPrevAnswer(false);
    };

    const correctAnswer = () => {
        setCurrentCardNumber((prev) => prev + 1);
        setTotalCorrect((prev) => prev + 1);
        setPrevAnswer(true);
    };

    const restart = async () => {
        await refetch();

        setCurrentCardNumber(0);
        setTotalCorrect(0);
        setTotalWrong(0);
        setPrevAnswer(null);
        setIsProcessPlaying(true);
    };

    const returnPrevSlide = () => {
        if (prevAnswer) {
            setTotalCorrect((prev) => prev - 1);
        } else {
            setTotalWrong((prev) => prev - 1);
        }

        if (currentCardNumber > 0) {
            if (currentCardNumber === 1) {
                setPrevAnswer(null);
            }

            setCurrentCardNumber((prev) => prev - 1);
        }
    };

    React.useEffect(() => {
        if (currentCardNumber === data?.cards?.length) {
            setTimeout(() => setIsProcessPlaying(false), 200);
        } else {
            setIsProcessPlaying(true);
        }
    }, [currentCardNumber, data?.cards]);

    if (isLoading) {
        return <Preloader page small />;
    }

    return (
        <div className={cn(base.baseWrapperGap16, styles.typeCardsOuter)}>
            <div className={base.titleInner}>
                <BackButton />

                {!error && currentCardNumber !== data?.cards?.length && (
                    <ProgressSteps current={currentCardNumber + 1} all={data?.cards?.length} />
                )}
            </div>

            {error ? (
                <NotContent text="Ошибка загрузка карточек" icon={<Cross />} danger />
            ) : (
                <>
                    <div className={styles.typeCardsInner}>
                        {isProcessPlaying && (
                            <div className={styles.typeCardsContent}>
                                {data?.cards?.map((data, id) => (
                                    <Card
                                        key={data.id}
                                        data={data}
                                        active={currentCardNumber === id}
                                        prev={currentCardNumber === id + 1}
                                        correctCallback={correctAnswer}
                                        wrongCallback={wrongAnswer}
                                    />
                                ))}
                            </div>
                        )}

                        <div
                            className={cn(styles.typeCardsResult, {
                                [styles.active]: currentCardNumber === data?.cards?.length || isFetching,
                            })}
                        >
                            <Text variant="h3">Результат:</Text>

                            <div className={styles.typeCardsResultWrapper}>
                                <Text variant="h3" color="success">
                                    Правильно: {totalCorrect}
                                </Text>
                                <Text variant="h3" color="error">
                                    Неверно: {totalWrong}
                                </Text>

                                <Button auto variant="light" onClick={restart} loading={isFetching}>
                                    Начать заново
                                </Button>
                            </div>

                            <Text variant="h3">Попробуйте также другой тип запоминания:</Text>

                            <div className={styles.testMoreContent}>
                                <LinkBlock title="Тест" href={`test`} className={base.item4}>
                                    <Text variant="text2">Запоминания в формате теста</Text>
                                </LinkBlock>

                                <LinkBlock title="Заучивание" href={`learn`} className={base.item4} disabled>
                                    <Text variant="text2">Выучи то, что плохо запоминаешь</Text>
                                </LinkBlock>

                                <LinkBlock title="Подбор" href={`selection`} className={base.item4} disabled>
                                    <Text variant="text2">Выбирай пары определение - термин</Text>
                                </LinkBlock>
                            </div>
                        </div>
                    </div>

                    <div
                        className={cn(styles.typeCardsEvents, {
                            [styles.active]: isProcessPlaying,
                        })}
                    >
                        <IconButton small variant="danger" onClick={wrongAnswer}>
                            <Cross />
                        </IconButton>

                        <IconButton small onClick={returnPrevSlide} disabled={currentCardNumber <= 0}>
                            <Return />
                        </IconButton>

                        <IconButton small variant="success" onClick={correctAnswer}>
                            <Check />
                        </IconButton>
                    </div>
                </>
            )}
        </div>
    );
};

export default MemoryCards;
=======
'use client';

import React from 'react';
import cn from 'classnames';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import Card from './Card';
import { BackButton, Button, IconButton } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { Check, Cross, Return } from '@/shared/icons';
import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';
import { useCollections } from '@/features/collection';
import { ProgressSteps } from '@/shared/ui/ProgressSteps';
import { LinkBlock } from '@/shared/ui/LinkBlock';
import { ConfettiBlock } from '@/shared/ui/Confetti';

const MemoryCards = () => {
    const [currentCardNumber, setCurrentCardNumber] = React.useState(0);
    const [totalCorrect, setTotalCorrect] = React.useState(0);
    const [totalWrong, setTotalWrong] = React.useState(0);
    const [prevAnswer, setPrevAnswer] = React.useState<boolean | null>(null);
    const [isProcessPlaying, setIsProcessPlaying] = React.useState(false);

    const { id } = useParams();
    const { getPairsCollection } = useCollections();

    const { data, isLoading, isFetching, error, refetch } = useQuery({
        queryKey: ['collection_cards', id],
        queryFn: () => getPairsCollection(String(id)),
        enabled: !!id,
    });

    const wrongAnswer = () => {
        setCurrentCardNumber((prev) => prev + 1);
        setTotalWrong((prev) => prev + 1);
        setPrevAnswer(false);
    };

    const correctAnswer = () => {
        setCurrentCardNumber((prev) => prev + 1);
        setTotalCorrect((prev) => prev + 1);
        setPrevAnswer(true);
    };

    const restart = async () => {
        await refetch();

        setCurrentCardNumber(0);
        setTotalCorrect(0);
        setTotalWrong(0);
        setPrevAnswer(null);
        setIsProcessPlaying(true);
    };

    const returnPrevSlide = () => {
        if (prevAnswer) {
            setTotalCorrect((prev) => prev - 1);
        } else {
            setTotalWrong((prev) => prev - 1);
        }

        if (currentCardNumber > 0) {
            if (currentCardNumber === 1) {
                setPrevAnswer(null);
            }

            setCurrentCardNumber((prev) => prev - 1);
        }
    };

    React.useEffect(() => {
        if (currentCardNumber === data?.cards?.length) {
            setTimeout(() => setIsProcessPlaying(false), 200);
        } else {
            setIsProcessPlaying(true);
        }
    }, [currentCardNumber, data?.cards]);

    if (isLoading) {
        return <Preloader page small />;
    }

    return (
        <div className={cn(base.baseWrapperGap16, styles.typeCardsOuter)}>
            {currentCardNumber === data?.cards?.length && <ConfettiBlock />}

            <div className={base.titleInner}>
                <BackButton />

                {!error && currentCardNumber !== data?.cards?.length && (
                    <ProgressSteps current={currentCardNumber + 1} all={data?.cards?.length} />
                )}
            </div>

            {error ? (
                <NotContent text="Ошибка загрузка карточек" icon={<Cross />} danger />
            ) : (
                <>
                    <div className={styles.typeCardsInner}>
                        {isProcessPlaying && <div className={styles.typeCardsContent}>
                            {data?.cards?.map((data, id) => (
                                <Card
                                    key={data.id}
                                    data={data}
                                    active={currentCardNumber === id}
                                    prev={currentCardNumber === id + 1}
                                    correctCallback={correctAnswer}
                                    wrongCallback={wrongAnswer}
                                />
                            ))}
                        </div>}

                        <div
                            className={cn(styles.typeCardsResult, {
                                [styles.active]: currentCardNumber === data?.cards?.length || isFetching,
                            })}
                        >
                            <Text variant="h3">Результат:</Text>

                            <div className={styles.typeCardsResultWrapper}>
                                <Text variant="h3" color='success'>Правильно: {totalCorrect}</Text>
                                <Text variant="h3" color='error'>Неверно: {totalWrong}</Text>

                                <Button auto variant="light" onClick={restart} loading={isFetching}>
                                    Начать заново
                                </Button>
                            </div>

                            <Text variant='h3'>Попробуйте также другой тип запоминания:</Text>

                            <div className={styles.testMoreContent}>
                                <LinkBlock title="Тест" href={`test`} className={base.item4}>
                                    <Text variant="text2">Запоминания в формате теста</Text>
                                </LinkBlock>

                                <LinkBlock title="Заучивание" href={`learn`} className={base.item4} disabled>
                                    <Text variant="text2">Выучи то, что плохо запоминаешь</Text>
                                </LinkBlock>

                                <LinkBlock title="Подбор" href={`selection`} className={base.item4} disabled>
                                    <Text variant="text2">Выбирай пары определение - термин</Text>
                                </LinkBlock>
                            </div>
                        </div>
                    </div>

                    <div
                        className={cn(styles.typeCardsEvents, {
                            [styles.active]: isProcessPlaying,
                        })}
                    >
                        <IconButton small variant='danger' onClick={wrongAnswer}>
                            <Cross />
                        </IconButton>

                        <IconButton small onClick={returnPrevSlide} disabled={currentCardNumber <= 0}>
                            <Return />
                        </IconButton>

                        <IconButton small variant='success' onClick={correctAnswer}>
                            <Check />
                        </IconButton>
                    </div>
                </>
            )}
        </div>
    );
};

export default MemoryCards;
>>>>>>> c61da454dd30e7ca31637fe711cf5e35c92c2018
