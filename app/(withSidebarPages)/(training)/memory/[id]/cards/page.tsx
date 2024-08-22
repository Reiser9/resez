'use client';

import React from 'react';
import cn from 'classnames';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import type { Pair } from '@/entities/collection';
import Card from './Card';
import { Check, Cross, Return } from '@/shared/icons';
import { useCollections } from '@/features/collection';

import { BackButton, Button, IconButton } from '@/shared/ui/Button';
import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';
import { ProgressSteps } from '@/shared/ui/ProgressSteps';
import { LinkBlock } from '@/shared/ui/LinkBlock';
import { Text } from '@/shared/ui/Text';

const cardsPerPage = 10;
const buffer = 2;

const MemoryCards = () => {
    const [currentCardNumber, setCurrentCardNumber] = React.useState(0);
    const [totalCorrect, setTotalCorrect] = React.useState(0);
    const [totalWrong, setTotalWrong] = React.useState(0);
    const [prevAnswer, setPrevAnswer] = React.useState<boolean | null>(null);
    const [isProcessPlaying, setIsProcessPlaying] = React.useState(false);
    const [resultBlock, setResultBlock] = React.useState(false);

    const [visibleCards, setVisibleCards] = React.useState<Pair[]>();

    const { id } = useParams();
    const { getPairsCollection } = useCollections();

    const { data, isLoading, isFetching, isError, refetch } = useQuery({
        queryKey: ['collection_cards', id],
        queryFn: () => getPairsCollection(String(id)),
        enabled: !!id,
    });

    const wrongAnswer = () => {
        if ((data?.cards?.length || 0) <= currentCardNumber) {
            return;
        }

        setCurrentCardNumber((prev) => prev + 1);
        setTotalWrong((prev) => prev + 1);
        setPrevAnswer(false);
    };

    const correctAnswer = () => {
        if ((data?.cards?.length || 0) <= currentCardNumber) {
            return;
        }

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
        setResultBlock(false);
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
            setTimeout(() => setResultBlock(true), 400);
        } else {
            setIsProcessPlaying(true);
        }
    }, [currentCardNumber, data?.cards]);

    React.useEffect(() => {
        if (!data || !data.cards) {
            return;
        }

        const start = Math.max(currentCardNumber - buffer, 0);
        const end = Math.min(currentCardNumber + cardsPerPage - buffer, data.cards.length);
        setVisibleCards(data.cards.slice(start, end));
    }, [currentCardNumber, data]);

    React.useEffect(() => {
        if (data && data.cards) {
            setVisibleCards(data.cards.slice(0, cardsPerPage));
        }
    }, [data]);

    if (isLoading) {
        return <Preloader page small />;
    }

    return (
        <div className={cn(base.baseWrapperGap16, styles.typeCardsOuter)}>
            <div className={base.titleInner}>
                <BackButton />

                {!isError && currentCardNumber !== data?.cards?.length && (
                    <ProgressSteps current={currentCardNumber + 1} all={data?.cards?.length} />
                )}
            </div>

            {isError ? (
                <NotContent text="Ошибка при загрузке карточек" icon={<Cross />} danger />
            ) : (
                <>
                    <div className={styles.typeCardsInner}>
                        {isProcessPlaying && (
                            <div className={styles.typeCardsContent}>
                                {visibleCards?.map((el, id) => (
                                    <Card
                                        key={el.id}
                                        data={el}
                                        active={(currentCardNumber > buffer ? buffer : currentCardNumber) === id}
                                        prev={(currentCardNumber > buffer ? buffer : currentCardNumber) === id + 1}
                                        correctCallback={correctAnswer}
                                        wrongCallback={wrongAnswer}
                                    />
                                ))}
                            </div>
                        )}

                        <div
                            className={cn(styles.typeCardsResult, {
                                [styles.active]: currentCardNumber === data?.cards?.length || isFetching,
                                [styles.show]: resultBlock,
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
                                <LinkBlock replace title="Тест" href={`test`} className={base.item4}>
                                    <Text variant="text2">Запоминания в формате теста</Text>
                                </LinkBlock>

                                <LinkBlock replace title="Заучивание" href={`learn`} className={base.item4} disabled>
                                    <Text variant="text2">Выучи то, что плохо запоминаешь</Text>
                                </LinkBlock>

                                <LinkBlock replace title="Подбор" href={`selection`} className={base.item4} disabled>
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
