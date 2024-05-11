import React from 'react';
import { Metadata } from 'next';
import cn from 'classnames';

import styles from './index.module.scss';
import pws from '@/shared/styles/pageWithSidebar.module.scss';

import { ContentWrapper } from '@/shared/wrappers/ContentWrapper';
import { AuthWrapper } from '@/shared/wrappers/AuthWrapper';

export const metadata: Metadata = {
    title: 'ResEz - Месседжер',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthWrapper>
            <ContentWrapper>
                <div className={pws.wrapper}>
                    <div className={cn(pws.contentFull, styles.messangerWrapper)}>{children}</div>
                </div>
            </ContentWrapper>
        </AuthWrapper>
    );
}
