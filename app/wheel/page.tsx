'use client';

import React from 'react';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { Text } from '@/shared/ui/Text';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { Badge } from '@/shared/ui/Badge';
import { ResCoin } from '@/shared/icons';
import { NotContent } from '@/shared/ui/NotContent';

interface Player {
    id: number;
    name: string;
    bet: string;
}

const wheelAnimationDuration = 4000;
const wheelEndGameStay = 5000;
const wheelColors = [
    '#007cee',
    '#ff8080',
    '#73FBD3',
    '#F0DCCA',
    '#6F9283',
    '#EA526F',
    '#FF8A5B',
    '#FCDE9C',
    '#C4D6B0',
    '#ECC30B',
    '#84BCDA',
    '#A29C9B',
    '#B8B8FF',
    '#F8F7FF',
    '#9381FF',
    '#E2711D',
    '#849324',
    '#262626',
];

const WheelPage = () => {
    const [players, setPlayers] = React.useState<Player[]>([]);
    const [name, setName] = React.useState('');
    const [bet, setBet] = React.useState('');
    const [rotation, setRotation] = React.useState(0);
    const [winner, setWinner] = React.useState<Player | null>(null);
    const [timer, setTimer] = React.useState<number | null>(null);
    const [isLocked, setIsLocked] = React.useState(false);
    const timerRef = React.useRef<NodeJS.Timeout | null>(null);

    const totalBet = players.reduce((sum, player) => sum + +player.bet, 0);

    const addPlayer = () => {
        if (isLocked) return;
        if (name.trim() && +bet > 0) {
            setPlayers((prev) => [...prev, { id: prev.length + 1, name, bet }]);
            setName('');
            setBet('');

            // Сбрасываем таймер при добавлении игрока
            if (players.length >= 1) {
                resetTimer();
            }
        }
    };

    // Вращение колеса
    const spinWheel = () => {
        if (isLocked || players.length < 2) return;
        setIsLocked(true);

        const random = Math.random();
        let cumulativeChance = 0;

        const winnerPlayer = players.find((player) => {
            cumulativeChance += +player.bet / totalBet;
            return random < cumulativeChance;
        });

        if (winnerPlayer) {
            const winnerIndex = players.indexOf(winnerPlayer);
            const sectorAngle = 360 / players.length;
            const randomOffset = Math.random() * sectorAngle - sectorAngle / 2;

            const targetRotation = 360 * 5 - cumulativeChance * 360 + randomOffset;

            setRotation(targetRotation);

            setTimeout(() => {
                setWinner(winnerPlayer);

                setTimeout(() => {
                    resetGame();
                }, wheelEndGameStay);
            }, wheelAnimationDuration);
        }
    };

    // Сброс и запуск таймера
    const resetTimer = () => {
        clearInterval(timerRef.current!);
        setTimer(10);

        timerRef.current = setInterval(() => {
            setTimer((prev) => {
                if (prev !== null && prev > 0) {
                    return prev - 1;
                } else {
                    clearInterval(timerRef.current!);
                    spinWheel(); // Вращаем колесо по истечении времени
                    return null;
                }
            });
        }, 1000);
    };

    const resetGame = () => {
        setPlayers([]);
        setTimer(null);
        setWinner(null);
        setRotation(0);
        setIsLocked(false);
    };

    // Таймер запускается, если >= 2 игрока
    React.useEffect(() => {
        if (players.length >= 2 && !isLocked) {
            resetTimer();
        } else {
            setTimer(null);
            clearInterval(timerRef.current!);
        }
        return () => clearInterval(timerRef.current!);
    }, [players, isLocked]);

    // Расчет углов секторов для игроков
    const calculateAngles = () => {
        if (players.length === 0) {
            return [
                {
                    startAngle: 0,
                    endAngle: 360,
                    player: { name: 'Ожидание игроков', bet: 0, id: 0 },
                },
            ];
        }

        let startAngle = 0;
        return players.map((player) => {
            const angle = (+player.bet / totalBet) * 360;
            const sector = {
                startAngle,
                endAngle: startAngle + angle,
                player,
            };
            startAngle += angle;
            return sector;
        });
    };

    return (
        <div className={styles.wheelPage}>
            <div className={styles.wheelCircleInner}>
                <svg
                    viewBox="0 0 200 200"
                    style={{
                        transform: `rotate(${rotation}deg)`,
                        transition: isLocked ? `transform ${wheelAnimationDuration / 1000}s ease-in-out` : 'none',
                    }}
                    className={styles.wheelCircle}
                >
                    {calculateAngles().map((sector, index) => {
                        const { startAngle, endAngle, player } = sector;

                        if (startAngle === 0 && endAngle === 360) {
                            return <circle key={player.id} cx="100" cy="100" r="100" fill="var(--main)" />;
                        }

                        const start = {
                            x: 100 + 100 * Math.cos((Math.PI * startAngle) / 180),
                            y: 100 + 100 * Math.sin((Math.PI * startAngle) / 180),
                        };
                        const end = {
                            x: 100 + 100 * Math.cos((Math.PI * endAngle) / 180),
                            y: 100 + 100 * Math.sin((Math.PI * endAngle) / 180),
                        };
                        const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

                        return (
                            <path
                                key={player.id}
                                d={`M100,100 L${start.x},${start.y} A100,100 0 ${largeArcFlag} 1 ${end.x},${end.y} Z`}
                                fill={wheelColors[index % wheelColors.length]}
                            />
                        );
                    })}

                    <circle cx="100" cy="100" r="90" fill="var(--white)" />
                </svg>

                <div className={styles.wheelCursor}></div>

                <div className={styles.wheelTextInner}>
                    {players.length >= 2 && timer !== null && (
                        <>
                            <Text variant="h4">Начало через</Text>

                            <Text variant="h3">{timer} сек</Text>
                        </>
                    )}

                    {winner && <Text variant="h3">Победитель: {winner.name}!</Text>}

                    <Text variant="h4">Общая ставка: {totalBet}</Text>
                </div>
            </div>

            {winner && (
                <div className={styles.wheelPlayersInner}>
                    <Text variant="text" fontWeight={600}>
                        Победитель:
                    </Text>

                    <div className={styles.wheelPlayers}>
                        <div className={styles.wheelPlayer}>
                            <div className={base.titleWrapper}>
                                <Badge text={winner.name} />

                                <Text>{winner.name}</Text>
                            </div>

                            <div className={styles.wheelPlayerChance}>
                                <div className={styles.wheelPlayerChanceItem}>
                                    <span
                                        className={styles.wheelPlayerChanceColor}
                                        style={{ background: wheelColors[(winner.id - 1) % wheelColors.length] }}
                                    ></span>
                                    {((+winner.bet / totalBet) * 100).toFixed(2)}%
                                </div>

                                <div className={styles.wheelPlayerBet}>
                                    <ResCoin />
                                    {winner.bet}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className={styles.wheelPlayersInner}>
                <Text variant="text" fontWeight={600}>
                    Участники{!!players.length && ` (${players.length})`}:
                </Text>

                {players.length ? (
                    <div className={styles.wheelPlayers}>
                        {players.map((player, index) => {
                            const chance = ((+player.bet / totalBet) * 100).toFixed(2);

                            return (
                                <div key={player.id} className={styles.wheelPlayer}>
                                    <div className={base.titleWrapper}>
                                        <Badge text={player.name} />

                                        <Text>{player.name}</Text>
                                    </div>

                                    <div className={styles.wheelPlayerChance}>
                                        <div className={styles.wheelPlayerChanceItem}>
                                            <span
                                                className={styles.wheelPlayerChanceColor}
                                                style={{ background: wheelColors[index % wheelColors.length] }}
                                            ></span>
                                            {chance}%
                                        </div>

                                        <div className={styles.wheelPlayerBet}>
                                            <ResCoin />
                                            {player.bet}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <NotContent text="Участников нет, станьте первым" />
                )}
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
                <Input type="text" placeholder="Имя игрока" value={name} setValue={setName} disabled={isLocked} />
                <Input type="number" placeholder="Ставка" value={bet} setValue={setBet} disabled={isLocked} />
                <Button onClick={addPlayer} disabled={isLocked}>
                    Добавить игрока
                </Button>
            </div>
        </div>
    );
};

export default WheelPage;
