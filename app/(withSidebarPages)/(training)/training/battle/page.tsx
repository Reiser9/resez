'use client';

import React from 'react';
import cn from 'classnames';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { Swords, Battle as BattleIcon, Clock } from '@/shared/icons';

import { InfoBlock } from '@/shared/ui/InfoBlock';
import { Text } from '@/shared/ui/Text';
import { NotContent } from '@/shared/ui/NotContent';
import { Button } from '@/shared/ui/Button';
import { TextPoint } from '@/shared/ui/TextPoint';
import { Preloader } from '@/shared/ui/Preloader';
import { AvatarGroup } from '@/shared/ui/AvatarGroup';

const Battle = () => {
    return (
        <div className={base.baseWrapperGap16}>
            <InfoBlock
                icon={<Swords />}
                title="Битва знатоков"
                text="Сразитесь с другими участниками в интеллектуальных баталиях, решайте задания и зарабатывайте баллы. Повышайте свой рейтинг, докажите свое превосходство и станьте настоящим мастером знаний!"
                image={<BattleIcon />}
            />

            <div className={base.baseWrapperGap8}>
                <div className={base.titleInner}>
                    <Text variant="h3">Битвы (5)</Text>
                </div>

                <div className={base.contentItems}>
                    <div className={cn(base.item3, styles.battleItem)}>
                        <TextPoint title="Предметы:" text="Русский язык" />

                        <div className={base.baseWrapperGap8} style={{ margin: '1.2rem 0' }}>
                            <Preloader page small offIndent animationDuration={0.7} />

                            <Text variant="text2" color="main" center>
                                Ожидание участников
                            </Text>
                        </div>

                        <div className={base.titleInner}>
                            <div className={styles.battleItemUsers}>
                                <AvatarGroup
                                    elements={[
                                        {
                                            avatar: 'http://localhost:8080/api/static/avatars/1724231645300.jpg',
                                            nickname: 'Reiser95',
                                        },
                                        {
                                            avatar: 'http://localhost:8080/api/static/avatars/1724231645300.jpg',
                                            nickname: 'Reiser95',
                                        },
                                        {
                                            avatar: 'http://localhost:8080/api/static/avatars/1724231645300.jpg',
                                            nickname: 'Reiser95',
                                        },
                                        {
                                            avatar: 'http://localhost:8080/api/static/avatars/1724231645300.jpg',
                                            nickname: 'Reiser95',
                                        },
                                    ]}
                                />

                                <Text variant="text2" fontWeight={600}>
                                    2 / 3
                                </Text>
                            </div>

                            <div className={styles.battleItemTime}>
                                <Clock />
                                03:20
                            </div>
                        </div>

                        <Button variant="light" href="/battle/1">
                            Присоединиться
                        </Button>
                    </div>
                </div>

                <NotContent text="Пока нет активных сражений. Но вы можете создать своё прямо сейчас!">
                    <Button href="/training/battle/create" auto variant="light">
                        Создать битву
                    </Button>
                </NotContent>
            </div>
        </div>
    );
};

export default Battle;
