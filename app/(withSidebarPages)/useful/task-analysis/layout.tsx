import React from 'react';
import { Metadata } from 'next';

import base from '@/shared/styles/base.module.scss';

import TaskAnalysisSubjects from './ui/TaskAnalysisSubjects';

export const metadata: Metadata = {
    title: 'ResEz - Разбор заданий',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={base.baseWrapperGap16}>
            <TaskAnalysisSubjects />

            {children}
        </div>
    );
}
