'use client';

import React from 'react';
import cn from 'classnames';
import parse from 'html-react-parser';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import type { MatchItem } from '@/entities/collection';
import { useCollections } from '@/features/collection';

import { Preloader } from '@/shared/ui/Preloader';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';

const MemorySelection = () => {
    const { id } = useParams();

    const [time, setTime] = React.useState(0);
    const [isActive, setIsActive] = React.useState(false);
    const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

    // const [startScreen, setStartScreen] = React.useState(true);
    const [extraSeconds, setExtraSeconds] = React.useState(0);
    const [firstSelectedCardId, setFirstSelectedCardId] = React.useState<string | null>(null);
    const [secondSelectedCardId, setSecondSelectedCardId] = React.useState<string | null>(null);
    const [isWrong, setIsWrong] = React.useState(false);
    const [isCorrect, setIsCorrect] = React.useState(false);
    const [correctedCardIds, setCorrectedCardIds] = React.useState<string[]>([]);

    const { getMatchesCollection } = useCollections();

    const { data, isLoading, isFetching, isError, refetch } = useQuery({
        queryKey: ['collection_match', id],
        queryFn: () => getMatchesCollection(String(id)),
        enabled: !!id,
    });

    const selectCard = (card: MatchItem) => {
        if (firstSelectedCardId) {
            if (firstSelectedCardId === card.id) {
                return setFirstSelectedCardId(null);
            }

            setSecondSelectedCardId(card.id);
            if (firstSelectedCardId === card.answerId) {
                setIsCorrect(true);
                setCorrectedCardIds((prev) => [...prev, firstSelectedCardId, card.id]);
            } else {
                setIsWrong(true);
                setExtraSeconds((prev) => prev + 1);
            }

            setTimeout(() => {
                setSecondSelectedCardId(null);
                setFirstSelectedCardId(null);
                setIsCorrect(false);
                setIsWrong(false);
            }, 300);
            return;
        }

        setFirstSelectedCardId(card.id);
    };

    const restartSelection = () => {
        refetch();
        setCorrectedCardIds([]);
        setExtraSeconds(0);
        resetTimer();
    };

    const startTimer = () => {
        if (!isActive) {
            setIsActive(true);
            intervalRef.current = setInterval(() => {
                setTime((prevTime) => prevTime + 0.1);
            }, 100);
        }
    };

    const pauseTimer = () => {
        if (isActive) {
            setIsActive(false);
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }
    };

    const resetTimer = () => {
        startTimer();
        setTime(0);
    };

    React.useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    React.useEffect(() => {
        startTimer();
    }, []);

    React.useEffect(() => {
        if (correctedCardIds.length === data?.length) {
            pauseTimer();
        }
    }, [correctedCardIds, data]);

    if (isLoading) {
        return <Preloader page />;
    }

    return (
        <div className={base.baseWrapperGap16}>
            {correctedCardIds.length !== data?.length ? (
                <>
                    <Text fontWeight={600} center color={isWrong ? 'error' : ''}>
                        {(time + extraSeconds).toFixed(1)} сек.
                    </Text>

                    <div
                        className={cn(styles.selection, {
                            [styles.wrong]: isWrong,
                            [styles.correct]: isCorrect,
                        })}
                    >
                        {data?.map((data) => (
                            <div key={data.id} className={styles.selectionItemWrapper}>
                                <div
                                    className={cn(styles.selectionItem, {
                                        [styles.selected]:
                                            firstSelectedCardId === data.id || secondSelectedCardId === data.id,
                                        [styles.corrected]: correctedCardIds.includes(data.id),
                                    })}
                                    onClick={() => selectCard(data)}
                                >
                                    <div className={styles.selectionItemTextInner}>
                                        <div className={styles.selectionItemText}>{parse(data.text)}</div>
                                    </div>

                                    {data.picture && (
                                        <Image
                                            src={data.picture}
                                            alt="image"
                                            fill
                                            className={cn(styles.selectionItemImage, {
                                                [styles.opacity]: data.text,
                                            })}
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className={styles.selectionEndScreen}>
                    <Text variant="h4">Отличный результат!</Text>

                    <Text variant="h4">Затрачено: {(time + extraSeconds).toFixed(1)} сек.</Text>

                    <Button auto variant="light" onClick={restartSelection} loading={isFetching}>
                        Играть снова
                    </Button>
                </div>
            )}
        </div>
    );
};

export default MemorySelection;
