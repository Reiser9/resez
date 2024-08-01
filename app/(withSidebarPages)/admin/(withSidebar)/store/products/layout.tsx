import React from 'react';

import base from '@/shared/styles/base.module.scss';

import StoreTabs from '../StoreTabs';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={base.baseWrapperGap16}>
            <StoreTabs />

            {children}
        </div>
    );
}
