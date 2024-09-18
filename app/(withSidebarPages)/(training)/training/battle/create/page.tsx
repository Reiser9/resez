'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Checkbox } from 'antd';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { useBattle } from '@/features/battle';
import { AuthWrapper } from '@/shared/wrappers/AuthWrapper';
import { CreatePageWrapper } from '@/shared/wrappers/CreatePageWrapper';

import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';

const BattleCreate = () => {
    const [createBattleIsLoading, setCreateBattleIsLoading] = React.useState(false);

    const [usersCount, setUsersCount] = React.useState('');
    const [isPrivate, setIsPrivate] = React.useState(false);

    const router = useRouter();
    const { createBattle } = useBattle();

    const createBattleHandler = async () => {
        setCreateBattleIsLoading(true);
        const battleId = await createBattle(usersCount, isPrivate).finally(() => {
            setCreateBattleIsLoading(false);
        });

        if (!battleId) return;

        router.replace(`/battle/${battleId}`);
    };

    return (
        <AuthWrapper>
            <CreatePageWrapper
                title="Создание битвы"
                button={
                    <Button auto levitation onClick={createBattleHandler} loading={createBattleIsLoading}>
                        Создать
                    </Button>
                }
            >
                <div className={base.form}>
                    <Input title="Количество участников" type="number" value={usersCount} setValue={setUsersCount} />

                    <Checkbox checked={isPrivate} onChange={(e) => setIsPrivate(e.target.checked)}>
                        Приватная битва
                    </Checkbox>
                </div>
            </CreatePageWrapper>
        </AuthWrapper>
    );
};

export default BattleCreate;
