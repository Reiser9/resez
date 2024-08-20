'use client';

import React from 'react';

import { FullPageWrapper } from '@/shared/wrappers/FullPageWrapper';
import { Blocked } from '@/shared/icons';
import { useLogout } from '@/features/user';
import { useAppSelector } from '@/shared/hooks/useRedux';

import { Text } from '../Text';
import { Button } from '@/shared/ui/Button';

const Ban = () => {
    const { isLoading, logout } = useLogout();
    const blockReason = useAppSelector((state) => state.user.user?.blockReason);

    return (
        <FullPageWrapper icon={<Blocked />} code="4<span>0</span>3" text="Ваша учетная запись заблокирована.">
            {blockReason && (
                <Text variant="h4" style={{ margin: '-1.6rem 0 2rem 0', textAlign: 'center' }}>
                    Причина: {blockReason || 'Не указана'}
                </Text>
            )}

            <Button auto variant="outline" style={{ minWidth: 160 }} onClick={() => logout()} loading={isLoading}>
                Выйти
            </Button>
        </FullPageWrapper>
    );
};

export default Ban;
