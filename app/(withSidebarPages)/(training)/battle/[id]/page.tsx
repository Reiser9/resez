'use client';

import React from 'react';
import cn from 'classnames';
import { useParams, useRouter } from 'next/navigation';
import { Tooltip } from 'antd';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import type { Battle, BattleInfo, BattleUserInfo } from '@/entities/battle';
import { Clock, Crown, Lock, Plus, Task, Tests, User } from '@/shared/icons';
import useBattleSocket from '@/shared/hooks/useBattleSocket';
import useAlert from '@/shared/hooks/useAlert';

import { Text } from '@/shared/ui/Text';
import { BackButton, Button } from '@/shared/ui/Button';
import { Preloader } from '@/shared/ui/Preloader';
import { Badge } from '@/shared/ui/Badge';
import { TextPoint } from '@/shared/ui/TextPoint';
import { Modal } from '@/shared/ui/Modal';
import { CopyLink } from '@/shared/ui/CopyLink';
import { UserItem } from '@/entities/battle/ui';

const BattleViewPage = () => {
    const { id } = useParams();
    const { socket: battleSocket, isConnected } = useBattleSocket();
    const { alertNotify } = useAlert();
    const router = useRouter();

    const [battleIsLoading, setBattleIsLoading] = React.useState(true);
    const [inviteModal, setInviteModal] = React.useState(false);
    const [battleInfo, setBattleInfo] = React.useState<BattleInfo>();
    const [battleUsers, setBattleUsers] = React.useState<BattleUserInfo[]>([]);
    const [isReady, setIsReady] = React.useState(false);

    const { isPrivate, playersCount } = battleInfo || {};

    const toggleReady = () => {
        if (battleSocket) {
            battleSocket.emit('toggle-ready');
            setIsReady((prev) => !prev);
        }
    };

    React.useEffect(() => {
        if (battleSocket && isConnected && id) {
            battleSocket.emit('join', id);
        }

        return () => {
            battleSocket?.emit('leave');
        };
    }, [battleSocket, isConnected, id]);

    React.useEffect(() => {
        if (battleSocket) {
            battleSocket.on('battle-joined', (battle: Battle) => {
                setBattleIsLoading(false);
                setBattleInfo(battle.battle);
                setBattleUsers(battle.battle.users);
            });

            battleSocket.on('user-joined', ({ user }: { user: BattleUserInfo }) => {
                setBattleUsers((prev) => (prev ? [...prev, user] : prev));
            });

            battleSocket.on('user-leaved', ({ user }: { user: BattleUserInfo }) => {
                setBattleUsers((prev) => prev?.filter((data) => data.id !== user.id));
            });

            battleSocket.on('battle-full', () => {
                router.replace('/training/battle');
                return alertNotify('Ошибка', 'Количество участников битвы переполнено', 'error');
            });

            battleSocket.on('battle-not-found', () => {
                router.replace('/training/battle');
                return alertNotify('Ошибка', 'Битва не найдена', 'error');
            });

            battleSocket.on('user-not-found', () => {
                // router.replace('/training/battle');
                return alertNotify('Ошибка', 'Пользователь не найден', 'error');
            });

            battleSocket.on('already-in-battle', () => {
                return alertNotify('Ошибка', 'Пользователь уже в батле', 'error');
            });

            battleSocket.on('user-toggle-ready', ({ user }: { user: BattleUserInfo }) => {
                setBattleUsers((prev) => prev.map((item) => (item.id === user.id ? { ...item, ...user } : item)));
            });

            return () => {
                battleSocket.off('battle-joined');
                battleSocket.off('battle-full');
                battleSocket.off('incorrect-battle-id');
                battleSocket.off('battle-not-found');
                battleSocket.off('user-not-found');
                battleSocket.off('already-in-battle');
                battleSocket.off('user-toggle-ready');
            };
        }
    }, [battleSocket]);

    if (battleIsLoading) {
        return <Preloader page />;
    }

    return (
        <>
            <div className={base.baseWrapperGap24}>
                <div className={base.titleInnerNowrap}>
                    <div className={base.titleWrapper}>
                        <BackButton confirmExit />

                        <Text variant="h3">Битва #{id}</Text>
                    </div>

                    {isReady ? (
                        <Button auto variant="light" color="danger" small onClick={toggleReady}>
                            Отменить
                        </Button>
                    ) : (
                        <Button auto variant="light" small onClick={toggleReady}>
                            Запустить
                        </Button>
                    )}
                </div>

                <div className={base.baseWrapperGap8}>
                    <Text variant="h4" fontWeight={600}>
                        Информация:
                    </Text>

                    <div className={base.contentItems}>
                        <div className={cn(base.item4, styles.battleInfoItem)}>
                            <div className={styles.battleInfoIconInner}>
                                <Lock />
                            </div>

                            <div className={styles.battleInfoTextInner}>
                                <Text variant="text2" color="grey">
                                    Доступ:
                                </Text>
                                <Text>{isPrivate ? "Приватный" : "Публичный"}</Text>
                            </div>
                        </div>

                        <div className={cn(base.item4, styles.battleInfoItem)}>
                            <div className={styles.battleInfoIconInner}>
                                <User />
                            </div>

                            <div className={styles.battleInfoTextInner}>
                                <Text variant="text2" color="grey">
                                    Участников:
                                </Text>
                                <Text>{playersCount}</Text>
                            </div>
                        </div>

                        <div className={cn(base.item4, styles.battleInfoItem)}>
                            <div className={styles.battleInfoIconInner}>
                                <Task />
                            </div>

                            <div className={styles.battleInfoTextInner}>
                                <Text variant="text2" color="grey">
                                    Заданий:
                                </Text>
                                <Text>12</Text>
                            </div>
                        </div>

                        <div className={cn(base.item4, styles.battleInfoItem)}>
                            <div className={styles.battleInfoIconInner}>
                                <Clock />
                            </div>

                            <div className={styles.battleInfoTextInner}>
                                <Text variant="text2" color="grey">
                                    Времени на решение:
                                </Text>
                                <Text>00:24:00</Text>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={base.baseWrapperGap8}>
                    <Text variant="h4" fontWeight={600}>
                        Участники:
                    </Text>

                    <div className={base.contentItems}>
                        {battleUsers?.map((data) => (
                            <UserItem key={data.id} data={data} />
                        ))}

                        {/* <div className={cn(base.item4, styles.battleInvitingItem)}>
                            <div className={base.titleWrapper}>
                                <Badge text="Forgetyk" />

                                <Text>forgetyk</Text>
                            </div>

                            <div className={base.baseWrapperGap8} style={{ margin: '.8rem 0' }}>
                                <Preloader page small offIndent />

                                <Text variant="text2" color="main" center>
                                    Приглашение отправлено
                                </Text>
                            </div>

                            <Button variant="empty" color="danger" small>
                                Отменить
                            </Button>
                        </div> */}

                        {[...Array(Math.max(0, (playersCount || 0) - (battleUsers?.length || 0)))].map((_, id) => (
                            <div
                                key={id}
                                className={cn(base.item4, styles.battleInviteItem)}
                                onClick={() => setInviteModal(true)}
                            >
                                <Plus />

                                <Text variant="text2">Пригласить</Text>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={base.baseWrapperGap8}>
                    <Text variant="h4" fontWeight={600}>
                        Битва:
                    </Text>

                    <div className={base.baseWrapperGap8} style={{ margin: '.6rem 0' }}>
                        <Preloader page small offIndent />

                        <Text variant="text2" color="main" center>
                            Ожидание участников
                        </Text>
                    </div>
                </div>
            </div>

            <Modal title="Пригласить" value={inviteModal} setValue={setInviteModal}>
                <CopyLink link="123" />
            </Modal>
        </>
    );
};

export default BattleViewPage;
