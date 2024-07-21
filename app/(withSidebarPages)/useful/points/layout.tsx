import React from 'react';
import { Metadata } from 'next';

import base from '@/shared/styles/base.module.scss';

import SubjectsTabs from './SubjectsTabs';

export const metadata: Metadata = {
    title: 'ResEz - Шкала перевода баллов ЕГЭ',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={base.baseWrapperGap16}>
            <SubjectsTabs />

            {children}
        </div>
    );
}
