'use client';

import React from 'react';
import cn from 'classnames';
import { useParams } from 'next/navigation';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { Clock, Task, Tests, User } from '@/shared/icons';

import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { Preloader } from '@/shared/ui/Preloader';

const BattleViewPage = () => {
    const { id } = useParams();

    return (
        <div className={base.baseWrapperGap24}>
            <div className={base.titleInner}>
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
                            <Text>4</Text>
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
    );
};

export default BattleViewPage;
