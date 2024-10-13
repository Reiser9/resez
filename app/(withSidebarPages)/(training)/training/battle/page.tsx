'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { Swords, Battle as BattleIcon, Enter } from '@/shared/icons';
import { useBattle } from '@/features/battle';
import { BattleItem } from '@/entities/battle/ui';
import { useAppSelector } from '@/shared/hooks/useRedux';

import { InfoBlock } from '@/shared/ui/InfoBlock';
import { Text } from '@/shared/ui/Text';
import { NotContent } from '@/shared/ui/NotContent';
import { Button } from '@/shared/ui/Button';

const Battle = () => {
    const isAuth = useAppSelector((state) => state.user.isAuth);
    const { getPublicBattles } = useBattle();

    const { data, isPending, isError } = useQuery({
        queryKey: ['public_battles'],
        queryFn: getPublicBattles,
        refetchInterval: 5000,
        enabled: isAuth,
    });

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
                    <Text variant="h3">Битвы {!!data?.length && `(${data.length})`}</Text>
                </div>

                <div className={base.contentItems}>
                    {!isAuth ? (
                        <NotContent text="Для сражений в битве знатоков нужна авторизация" icon={<Enter />}>
                            <Button href="/login" auto variant="light">
                                Авторизоваться
                            </Button>
                        </NotContent>
                    ) : data?.length ? (
                        data.map((data) => <BattleItem key={data.id} data={data} />)
                    ) : (
                        <NotContent text="Пока нет активных сражений. Но вы можете создать своё прямо сейчас!">
                            <Button href="/training/battle/create" auto variant="light">
                                Создать битву
                            </Button>
                        </NotContent>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Battle;
