import React from 'react';
import { Metadata } from 'next';

import pws from '@/shared/styles/pageWithSidebar.module.scss';

import { ContentWrapper } from '@/shared/wrappers/ContentWrapper';
import UserProfileWrapper from './UserProfileWrapper';

export const metadata: Metadata = {
    title: 'ResEz - Профиль',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ContentWrapper>
            <div className={pws.wrapper}>
                <div className={pws.contentFull}>
                    <UserProfileWrapper>{children}</UserProfileWrapper>
                </div>
            </div>
        </ContentWrapper>
    );
}
