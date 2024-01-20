import React from 'react';

import pws from '@/shared/styles/pageWithSidebar.module.scss';

import { ContentWrapper } from '@/shared/wrappers/ContentWrapper';
import { InnerPageSidebar } from '@/shared/ui/InnerPageSidebar';
import { SidebarLink } from '@/shared/ui/SidebarLink';
import { AuthWrapper } from '@/shared/wrappers/AuthWrapper';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthWrapper>
            <ContentWrapper>
                <div className={pws.wrapper}>
                    <div className={pws.content}>{children}</div>

                    <InnerPageSidebar>
                        <SidebarLink href="/profile" end>
                            Профиль
                        </SidebarLink>
                        <SidebarLink href="/profile/appearance">Внешний вид</SidebarLink>
                        <SidebarLink href="/profile/data">Личные данные</SidebarLink>
                        <SidebarLink href="/profile/safety">Безопасность</SidebarLink>
                        <SidebarLink href="/profile/achievements">Достижения</SidebarLink>
                        <SidebarLink href="/profile/settings">Настройки</SidebarLink>
                    </InnerPageSidebar>
                </div>
            </ContentWrapper>
        </AuthWrapper>
    );
}
