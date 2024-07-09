import React from 'react';

import base from '@/shared/styles/base.module.scss';
import PersonalizationTabs from './PersonalizationTabs';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return <div className={base.baseWrapperGap16}>
        <PersonalizationTabs />

        {children}
    </div>;
}
