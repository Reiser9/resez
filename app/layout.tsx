import type { Metadata, Viewport } from 'next';
import { Nunito } from 'next/font/google';
import { ConfigProvider } from 'antd';
import { SkeletonTheme } from 'react-loading-skeleton';
import ruRU from 'antd/locale/ru_RU';

import './globals.scss';
import 'react-loading-skeleton/dist/skeleton.css';

import { ReactQueryProvider, ReduxProvider } from '@/shared/providers';
import { EventProvider, ThemeProvider, SidebarProvider, ScrollProvider } from '@/shared/context';
import { NotifiesWrapper } from '@/shared/wrappers/NotifiesWrapper';
import { InitialWrapper } from '@/shared/wrappers/InitialWrapper';
import { CONFIG } from '@/shared/consts/CONFIG';
import ErrorBoundary from '@/shared/wrappers/ErrorBoundary';

const nunito = Nunito({
    subsets: ['cyrillic'],
    weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-nunito',
});

export const metadata: Metadata = {
    title: 'ResEz',
    description: 'ResEz - Подготовки к ЕГЭ и учебе',
};

export const viewport: Viewport = {
    initialScale: 1,
    width: 'device-width',
    maximumScale: 1,
    userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru">
            <body className={nunito.variable}>
                {/* <ErrorBoundary> */}
                    <ReduxProvider>
                        <ReactQueryProvider>
                            <ThemeProvider>
                                <EventProvider>
                                    <SidebarProvider>
                                        <ScrollProvider>
                                            <NotifiesWrapper>
                                                <SkeletonTheme
                                                    baseColor="var(--input)"
                                                    highlightColor="var(--inputDarken)"
                                                >
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
                                                        <InitialWrapper>{children}</InitialWrapper>
                                                    </ConfigProvider>
                                                </SkeletonTheme>
                                            </NotifiesWrapper>
                                        </ScrollProvider>
                                    </SidebarProvider>
                                </EventProvider>
                            </ThemeProvider>
                        </ReactQueryProvider>
                    </ReduxProvider>
                {/* </ErrorBoundary> */}
            </body>
        </html>
    );
}
