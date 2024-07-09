import React from 'react';
import { Metadata } from 'next';

import base from '@/shared/styles/base.module.scss';
import pws from '@/shared/styles/pageWithSidebar.module.scss';

import { ContentWrapper } from '@/shared/wrappers/ContentWrapper';
import { AuthWrapper } from '@/shared/wrappers/AuthWrapper';
import PersonalizationProfileTabs from './PersonalizationProfileTabs';

export const metadata: Metadata = {
    title: 'ResEz - Персонализация',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthWrapper>
            <ContentWrapper>
                <div className={pws.wrapper}>
                    <div className={pws.contentFull}>
                        <div className={base.baseWrapperGap16}>
                            <PersonalizationProfileTabs />

                            {children}
                        </div>
                    </div>
                </div>
            </ContentWrapper>
        </AuthWrapper>
    );
}
