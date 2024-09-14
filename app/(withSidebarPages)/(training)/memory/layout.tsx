import React from 'react';
import { Metadata } from 'next';

import pws from '@/shared/styles/pageWithSidebar.module.scss';

import { ContentWrapper } from '@/shared/wrappers/ContentWrapper';

export const metadata: Metadata = {
    title: 'ResEz - Тренировка памяти',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ContentWrapper>
            <div className={pws.wrapper}>
                <div className={pws.contentFull}>{children}</div>
            </div>
        </ContentWrapper>
    );
}
