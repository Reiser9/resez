import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';

import './globals.scss';

import { EventAnimation } from '@/shared/ui/EventAnimation';
import { ChangeThemeAnimate } from '@/shared/ui/ChangeThemeAnimate';
import { ReactQueryProvider, ReduxProvider } from '@/shared/providers';
import { EventProvider, ThemeProvider, SidebarProvider } from '@/shared/context';
import { NotifiesWrapper } from '@/shared/wrappers/NotifiesWrapper';
import { InitialWrapper } from '@/shared/wrappers/InitialWrapper';
import { CONFIG } from '@/shared/consts/CONFIG';

const nunito = Nunito({
    subsets: ['cyrillic'],
    weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-nunito',
});

export const metadata: Metadata = {
    title: 'ResEz',
    description: 'ResEz - Подготовки к ЕГЭ и учебе',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru">
            <body className={nunito.variable}>
                <ReduxProvider>
                    <ReactQueryProvider>
                        <InitialWrapper>
                            <ThemeProvider>
                                <EventProvider>
                                    <SidebarProvider>
                                        <NotifiesWrapper>
                                            <ConfigProvider
                                                locale={ruRU}
                                                theme={{
                                                    token: {
                                                        // Поменять #007cee на динамический цвет
                                                        colorPrimary: CONFIG.BASE_COLOR,
                                                        fontFamily: 'var(--font-nunito)',
                                                    },
                                                }}
                                            >
                                                <EventAnimation />
                                                <ChangeThemeAnimate />

                                                {children}
                                            </ConfigProvider>
                                        </NotifiesWrapper>
                                    </SidebarProvider>
                                </EventProvider>
                            </ThemeProvider>
                        </InitialWrapper>
                    </ReactQueryProvider>
                </ReduxProvider>
            </body>
        </html>
    );
}
