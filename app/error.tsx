'use client';

import React from 'react';

import { Button } from '@/shared/ui/Button';
import { FullPageWrapper } from '@/shared/wrappers/FullPageWrapper';
import { NotFoundIcon } from '@/shared/icons';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'ResEz - Ошибка',
};

type Props = {
    error: Error;
    reset: () => void;
};

const ErrorPage: React.FC<Props> = ({ error, reset }) => {
    return (
        <FullPageWrapper icon={<NotFoundIcon />} code="Упс.." text={`${error.message || 'К сожалению, произошла ошибка'}`}>
            <Button auto variant="outline" onClick={reset} style={{ minWidth: 160 }}>
                Перезагрузить
            </Button>
        </FullPageWrapper>
    );
};

export default ErrorPage;
