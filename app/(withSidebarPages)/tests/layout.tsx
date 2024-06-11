<<<<<<< HEAD
import React from 'react';
import { Metadata } from 'next';

import pws from '@/shared/styles/pageWithSidebar.module.scss';

import { ContentWrapper } from '@/shared/wrappers/ContentWrapper';
import { InnerPageSidebar } from '@/shared/ui/InnerPageSidebar';
import { SidebarLink } from '@/shared/ui/SidebarLink';
import { AuthWrapper } from '@/shared/wrappers/AuthWrapper';

export const metadata: Metadata = {
    title: 'ResEz - Тесты',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthWrapper>
            <ContentWrapper>
                <div className={pws.wrapper}>
                    <div className={pws.content}>{children}</div>

                    <InnerPageSidebar>
                        <SidebarLink href="/tests" end>
                            Главная
                        </SidebarLink>
                        <SidebarLink href="/tests/my">Мои тесты</SidebarLink>
                    </InnerPageSidebar>
                </div>
            </ContentWrapper>
        </AuthWrapper>
    );
}
=======
import React from 'react';
import { Metadata } from 'next';

import pws from '@/shared/styles/pageWithSidebar.module.scss';

import { ContentWrapper } from '@/shared/wrappers/ContentWrapper';
import { InnerPageSidebar } from '@/shared/ui/InnerPageSidebar';
import { SidebarLink } from '@/shared/ui/SidebarLink';
import { AuthWrapper } from '@/shared/wrappers/AuthWrapper';

export const metadata: Metadata = {
    title: 'ResEz - Тесты',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthWrapper>
            <ContentWrapper>
                <div className={pws.wrapper}>
                    <div className={pws.content}>{children}</div>

                    <InnerPageSidebar>
                        <SidebarLink href="/tests" end>
                            Главная
                        </SidebarLink>
                        <SidebarLink href="/tests/my">Мои тесты</SidebarLink>
                    </InnerPageSidebar>
                </div>
            </ContentWrapper>
        </AuthWrapper>
    );
}
>>>>>>> c61da454dd30e7ca31637fe711cf5e35c92c2018
