'use client';

import React from 'react';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { AuthWrapper } from '@/shared/wrappers/AuthWrapper';
import { CreatePageWrapper } from '@/shared/wrappers/CreatePageWrapper';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';

const BattleCreate = () => {
    return (
        <AuthWrapper>
            <CreatePageWrapper
                title="Создание битвы"
                button={
                    <Button auto levitation>
                        Создать
                    </Button>
                }
            >
                <div className={base.form}>
                    <Input title="Количество участников" type="number" />
                </div>
            </CreatePageWrapper>
        </AuthWrapper>
    );
};

export default BattleCreate;
