import React from 'react';

import pws from '@/shared/styles/pageWithSidebar.module.scss';

import { ContentWrapper } from '@/shared/wrappers/ContentWrapper';
import { InnerPageSidebar } from '@/shared/ui/InnerPageSidebar';
import { SidebarLink } from '@/shared/ui/SidebarLink';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ContentWrapper>
            <div className={pws.wrapper}>
                <div className={pws.content}>{children}</div>

                <InnerPageSidebar>
                    <SidebarLink href="/profile" end>
                        Профиль
                    </SidebarLink>
                    <SidebarLink href="/profile/safety">Безопасность</SidebarLink>
                </InnerPageSidebar>
            </div>
        </ContentWrapper>
    );
}
