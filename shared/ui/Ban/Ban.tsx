import React from 'react';

import { Button } from '@/shared/ui/Button';
import { FullPageWrapper } from '@/shared/wrappers/FullPageWrapper';
import { Blocked } from '@/shared/icons';
import { useLogout } from '@/features/user';

const Ban = () => {
    const { isLoading, logout } = useLogout();

    return (
        <FullPageWrapper icon={<Blocked />} code="4<span>0</span>3" text="Ваша учетная запись заблокирована.">
            <Button auto variant="outline" style={{ marginTop: 24, minWidth: 160 }} onClick={() => logout()} loading={isLoading}>
                Выйти
            </Button>
        </FullPageWrapper>
    );
};

export default Ban;
