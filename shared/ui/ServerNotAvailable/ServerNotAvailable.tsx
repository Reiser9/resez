import React from 'react';

import { FullPageWrapper } from '@/shared/wrappers/FullPageWrapper';
import { Server } from '@/shared/icons/picture/Server';
import useReload from '@/shared/hooks/useReload';

import { Button } from '../Button';

const ServerNotAvailable = () => {
    const { isLoadingReload, reload } = useReload();

    return (
        <FullPageWrapper
            icon={<Server />}
            code="<span>5</span>00"
            text="Сервер временно недоступен, вернитесь на сайт позже."
        >
            <Button auto variant="outline" style={{ minWidth: 170 }} loading={isLoadingReload} onClick={reload}>
                Перезагрузить
            </Button>
        </FullPageWrapper>
    );
};

export default ServerNotAvailable;
