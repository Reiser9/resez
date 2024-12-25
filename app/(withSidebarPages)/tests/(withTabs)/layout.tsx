import React from 'react';

import SubjectsTabs from '../../useful/points/SubjectsTabs';
import { InfoBlock } from '@/shared/ui/InfoBlock';
import { Stack, TypesTest } from '@/shared/icons';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <SubjectsTabs baseUrl="/tests/subject/" />

            <InfoBlock
                icon={<Stack />}
                title="Решайте вариант из заданных заданий"
                text="Пройдите тест, выбирая задания из предложенных вариантов. Узнайте свой уровень знаний, решая тесты по выбранному предмету. Начните свой путь к успеху уже сегодня!"
                image={<TypesTest />}
            />

            {children}
        </>
    );
}
