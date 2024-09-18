'use client';

import React from 'react';
import cn from 'classnames';
import { useParams, useRouter } from 'next/navigation';
import { Tooltip } from 'antd';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import type { Battle, BattleInfo, BattleUserInfo } from '@/entities/battle';
import { Clock, Crown, Plus, Task, Tests, User } from '@/shared/icons';
import useBattleSocket from '@/shared/hooks/useBattleSocket';
import useAlert from '@/shared/hooks/useAlert';

import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
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

    const { isPrivate, playersCount } = battleInfo || {};

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
                setBattleUsers(battle.users);
            });

            battleSocket.on('user-joined', ({ user }: { user: BattleUserInfo }) => {
                setBattleUsers((prev) => [...prev, user]);
            });

            battleSocket.on('user-leaved', ({ user }: { user: BattleUserInfo }) => {
                setBattleUsers((prev) => prev.filter((data) => data.id !== user.id));
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

            return () => {
                battleSocket.off('battle-joined');
                battleSocket.off('battle-full');
                battleSocket.off('incorrect-battle-id');
                battleSocket.off('battle-not-found');
                battleSocket.off('user-not-found');
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
                    <Text variant="h3">Битва #{id}</Text>

                    <Button auto variant="light" small>
                        Запустить
                    </Button>
                </div>

                <div className={base.baseWrapperGap8}>
                    <Text variant="h4" fontWeight={600}>
                        Информация:
                    </Text>

                    <div className={base.contentItems}>
                        <div className={cn(base.item4, styles.battleInfoItem)}>
                            <div className={styles.battleInfoIconInner}>
                                <Tests />
                            </div>

                            <div className={styles.battleInfoTextInner}>
                                <Text variant="text2" color="grey">
                                    Предмет:
                                </Text>
                                <Text>Математика</Text>
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

                        {[...Array((playersCount || 0) - battleUsers.length)].map((_, id) => (
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
