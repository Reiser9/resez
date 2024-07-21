import React from 'react';

import base from '@/shared/styles/base.module.scss';

import SubjectsTabs from '../../useful/points/SubjectsTabs';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={base.baseWrapperGap16}>
            <SubjectsTabs baseUrl="/tests/subject/" />

            {children}
        </div>
    );
}
