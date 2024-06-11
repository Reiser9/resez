import React from 'react';
import { Metadata } from 'next';

import pws from '@/shared/styles/pageWithSidebar.module.scss';

import { ContentWrapper } from '@/shared/wrappers/ContentWrapper';
import { AuthWrapper } from '@/shared/wrappers/AuthWrapper';

export const metadata: Metadata = {
    title: 'ResEz - Профиль'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthWrapper>
            <ContentWrapper>
                <div className={pws.wrapper}>
                    <div className={pws.contentFull}>{children}</div>
                </div>
            </ContentWrapper>
        </AuthWrapper>
    );
}
