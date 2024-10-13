'use client';

import React from 'react';
import cn from 'classnames';
import parse from 'html-react-parser';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import type { MatchItem, ScoreItem, ScoreItemLocal } from '@/entities/collection';
import { useCollections } from '@/features/collection';
import { useAppSelector } from '@/shared/hooks/useRedux';

import { Preloader } from '@/shared/ui/Preloader';
import { Text } from '@/shared/ui/Text';
import { BackButton, Button } from '@/shared/ui/Button';
import { LinkBlock } from '@/shared/ui/LinkBlock';
import { Badge } from '@/shared/ui/Badge';
import { Crown } from '@/shared/icons';
import LeaderboardItem from './LeaderboardItem';

const MemorySelection = () => {
    const { id } = useParams();
    const isAuth = useAppSelector((state) => state.user.isAuth);

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

    const [score, setScore] = React.useState<ScoreItemLocal | null>(null);
    const [scores, setScores] = React.useState<ScoreItem[] | null>(null);
    const [inLeadTable, setInLeadTable] = React.useState(false);
    const [scoresIsLoading, setScoresIsLoading] = React.useState(false);

    const { getMatchesCollection, sendMatchScore } = useCollections();

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

    const restartSelection = async () => {
        await refetch();
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

    const matchResult = async () => {
        setScoresIsLoading(true);
        const result = await sendMatchScore(+(time + extraSeconds).toFixed(1), String(id));
        setScoresIsLoading(false);

        if (!result) return;

        const { score, scores } = result;

        if (score.user && !!scores.filter((elem) => elem.user?.id === score.user?.id).length) {
            setInLeadTable(true);
        }

        setScore(score);
        setScores(scores);
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
            matchResult();
        }
    }, [correctedCardIds, data]);

    if (isLoading) {
        return <Preloader page />;
    }

    return (
        <div className={base.baseWrapperGap16}>
            <div className={base.titleInner}>
                <BackButton />

                {correctedCardIds.length !== data?.length && (
                    <Text fontWeight={600} color={isWrong ? 'error' : ''}>
                        {(time + extraSeconds).toFixed(1)} сек.
                    </Text>
                )}
            </div>

            {correctedCardIds.length !== data?.length ? (
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
            ) : scoresIsLoading ? (
                <Preloader page small />
            ) : (
                <div className={styles.selectionEndScreen}>
                    <Text variant="h4">Отличный результат!</Text>

                    <Text variant="h4">Затрачено: {(time + extraSeconds).toFixed(1)} сек.</Text>

                    <Text variant="h4">Ошибок: {extraSeconds}</Text>

                    <Button auto variant="light" onClick={restartSelection} loading={isFetching}>
                        Играть снова
                    </Button>

                    <div className={base.baseWrapperGap8}>
                        <Text variant="h3">Попробуйте также другой тип запоминания:</Text>

                        <div className={styles.testMoreContent}>
                            <LinkBlock replace title="Карточки" href={`cards`} className={base.item4}>
                                <Text variant="text2">С одной стороны термин, с другой определение</Text>
                            </LinkBlock>

                            <LinkBlock replace title="Тест" href={`test`} className={base.item4}>
                                <Text variant="text2">Запоминания в формате теста</Text>
                            </LinkBlock>

                            <LinkBlock replace title="Заучивание" href={`learn`} className={base.item4} disabled>
                                <Text variant="text2">Выучи то, что плохо запоминаешь</Text>
                            </LinkBlock>
                        </div>
                    </div>

                    {!!scores?.length && (
                        <div className={styles.selectionLeaderboard}>
                            <Text fontWeight={600}>Топ-10</Text>

                            {scores?.map((data) => (
                                <LeaderboardItem key={data.id} data={data} current={score?.user?.id === data?.user?.id} />
                            ))}

                            {!isAuth && (
                                <Text center color="error">
                                    Для сохранения результата требуется авторизация
                                </Text>
                            )}

                            {!inLeadTable && score && <LeaderboardItem data={score} current />}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MemorySelection;
