import React from 'react';
import { Metadata } from 'next';

import pws from '@/shared/styles/pageWithSidebar.module.scss';
import base from '@/shared/styles/base.module.scss';

import { ContentWrapper } from '@/shared/wrappers/ContentWrapper';
import { InnerPageSidebar } from '@/shared/ui/InnerPageSidebar';
import { SidebarLink } from '@/shared/ui/SidebarLink';
import SubjectsTabs from '../useful/points/SubjectsTabs';
import { InfoBlock } from '@/shared/ui/InfoBlock';
import { Stack, TypesTest } from '@/shared/icons';

export const metadata: Metadata = {
    title: 'ResEz - Тесты',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ContentWrapper>
            <div className={pws.wrapper}>
                <div className={pws.content}>
                    <div className={base.baseWrapperGap16}>
                        <SubjectsTabs baseUrl="/tests/subject/" />

                        <InfoBlock
                            icon={<Stack />}
                            title="Решайте вариант из заданных заданий"
                            text="Пройдите тест, выбирая задания из предложенных вариантов. Узнайте свой уровень знаний, решая тесты по выбранному предмету. Начните свой путь к успеху уже сегодня!"
                            image={<TypesTest />}
                        />

                        {children}
                    </div>
                </div>

                <InnerPageSidebar>
                    <SidebarLink href="/tests" end>
                        Главная
                    </SidebarLink>
                    {/* <SidebarLink href="/tests/my">Мои тесты</SidebarLink> */}
                </InnerPageSidebar>
            </div>
        </ContentWrapper>
    );
}
