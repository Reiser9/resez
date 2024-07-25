'use client';

import React from 'react';
import Link from 'next/link';
import cn from 'classnames';

import styles from './index.module.scss';

import { Code, Console, Fire, Lifebuoy, Message, Store, Telegram, Tests, Training, Vk, Youtube } from '@/shared/icons';
import { SidebarLink } from '@/shared/ui/SidebarLink';
import { Button } from '@/shared/ui/Button';
import { useSidebarContext } from '@/shared/context/SidebarProvider';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { checkPermission } from '@/shared/utils/checkPermissions';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';

const Sidebar = () => {
    const sidebarRef = React.useRef<HTMLDivElement>(null);
    const { showSidebar, setShowSidebar } = useSidebarContext();
    const permissions = useAppSelector((state) => state.user.user?.permissions);

    const outsideSidebarClick = (e: MouseEvent) => {
        if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
            setShowSidebar(false);
        }
    };

    const closeSidebar = () => {
        setShowSidebar(false);
    };

    React.useEffect(() => {
        window.addEventListener('click', outsideSidebarClick);

        return () => {
            window.removeEventListener('click', outsideSidebarClick);
        };
    }, []);

    return (
        <aside
            className={cn(styles.sidebar, {
                [styles.active]: showSidebar,
            })}
            ref={sidebarRef}
        >
            <div className={styles.sidebarMenu}>
                <SidebarLink href="/training" onClick={closeSidebar}>
                    <Training />
                    Тренинг
                </SidebarLink>

                <SidebarLink href="/tests" onClick={closeSidebar}>
                    <Tests />
                    Тесты
                </SidebarLink>

                <SidebarLink href="/messenger" onClick={closeSidebar}>
                    <Message />
                    Мессенджер
                </SidebarLink>

                <SidebarLink href="/useful" onClick={closeSidebar}>
                    <Fire />
                    Полезное
                </SidebarLink>

                <SidebarLink href="/store" onClick={closeSidebar}>
                    <Store />
                    Магазин
                </SidebarLink>

                {checkPermission(permissions, [PERMISSIONS.ADMIN]) && (
                    <SidebarLink href="/admin" onClick={closeSidebar}>
                        <Code />
                        Админка
                    </SidebarLink>
                )}

                {/* <SidebarLink href="/config">
                    <Console />
                    Конфигурация
                </SidebarLink> */}
            </div>

            <div className={styles.sidebarFooter}>
                {/* <Button variant="light" disabled href="/support">
                    <Lifebuoy className={styles.sidebarFooterButtonIcon} />

                    <span className={styles.sidebarFooterButtonText}>Обратная связь</span>
                </Button> */}

                <div className={styles.sidebarFooterSocials}>
                    <a
                        href={process.env.NEXT_PUBLIC_VK_LINK}
                        target="_blanc"
                        className={styles.sidebarFooterSocial}
                        title="Группа vk"
                    >
                        <Vk />
                    </a>

                    <a
                        href={process.env.NEXT_PUBLIC_TELEGRAM_LINK}
                        target="_blanc"
                        className={styles.sidebarFooterSocial}
                        title="Телеграм"
                    >
                        <Telegram />
                    </a>

                    <a
                        href={process.env.NEXT_PUBLIC_YOUTUBE_LINK}
                        target="_blanc"
                        className={styles.sidebarFooterSocial}
                        title="Ютуб"
                    >
                        <Youtube />
                    </a>
                </div>

                <Link href="/docs/rules" className={styles.sidebarFooterLink}>
                    Правила проекта
                </Link>

                <Link href="/docs/publicoffer" className={styles.sidebarFooterLink}>
                    Публичная оферта
                </Link>

                <a href="https://github.com/NikitaMasl" target="_blanc" className={styles.sidebarFooterLinkSupport}>
                    support by Nikita Maslov
                </a>
            </div>
        </aside>
    );
};

export default Sidebar;
