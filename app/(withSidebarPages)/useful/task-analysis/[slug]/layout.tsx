import React from 'react';
import { Metadata } from 'next';

import TaskAnalysisTasks from '../ui/TaskAnalysisTasks';

export const metadata: Metadata = {
    title: 'ResEz - Разбор заданий',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <TaskAnalysisTasks />

            {children}
        </>
    );
}
