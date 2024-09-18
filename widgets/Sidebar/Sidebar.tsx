'use client';

import React from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { useQuery } from '@tanstack/react-query';

import styles from './index.module.scss';

import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { Code, Fire, Lifebuoy, Message, Store, Telegram, Tests, Training, Vk, Youtube } from '@/shared/icons';
import { SidebarLink } from '@/shared/ui/SidebarLink';
import { useSidebarContext } from '@/shared/context/SidebarProvider';
import { checkPermission } from '@/shared/utils/checkPermissions';
import { useWarn } from '@/features/admin';
import useAlert from '@/shared/hooks/useAlert';
import { useUserPermissions } from '@/features/user';
import { useAppSelector } from '@/shared/hooks/useRedux';

import { Input } from '@/shared/ui/Input';
import { Text } from '@/shared/ui/Text';
import { Modal } from '@/shared/ui/Modal';
import { Button } from '@/shared/ui/Button';

const Sidebar = () => {
    const [modalSupport, setModalSupport] = React.useState(false);
    const [supportText, setSupportText] = React.useState('');

    const sidebarRef = React.useRef<HTMLDivElement>(null);

    const { getUserPermissions } = useUserPermissions();
    const isAuth = useAppSelector((state) => state.user.isAuth);

    const {
        data: permissions,
        isLoading: permissionsIsLoading,
        isError: permissionsError,
    } = useQuery({
        queryKey: ['user_permissions'],
        queryFn: getUserPermissions,
        enabled: isAuth,
    });
    const { showSidebar, setShowSidebar } = useSidebarContext();

    const { createWarn } = useWarn();
    const { alertNotify } = useAlert();

    const closeSidebar = () => {
        setShowSidebar(false);
    };

    const createWarnHandler = () => {
        if (!supportText) {
            return alertNotify('Предупреждение', 'Текст обязателен к заполнению', 'warn');
        }

        createWarn(supportText, () => {
            setModalSupport(false);
            setSupportText('');
        });
    };

    React.useEffect(() => {
        const outsideSidebarClick = (e: MouseEvent) => {
            if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
                closeSidebar();
            }
        };

        window.addEventListener('click', outsideSidebarClick);

        return () => {
            window.removeEventListener('click', outsideSidebarClick);
        };
    }, []);

    return (
        <>
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

                    {checkPermission(permissions || [], [PERMISSIONS.ADMIN]) && (
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
                    <Button
                        variant="light"
                        onClick={() => {
                            closeSidebar();
                            setModalSupport(true);
                        }}
                    >
                        <Lifebuoy className={styles.sidebarFooterButtonIcon} />

                        <span className={styles.sidebarFooterButtonText}>Обратная связь</span>
                    </Button>

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

                    <Link href="/docs/rules" className={styles.sidebarFooterLink} onClick={closeSidebar}>
                        Правила проекта
                    </Link>

                    <Link href="/docs/publicoffer" className={styles.sidebarFooterLink} onClick={closeSidebar}>
                        Публичная оферта
                    </Link>

                    <a href="https://github.com/NikitaMasl" target="_blanc" className={styles.sidebarFooterLinkSupport}>
                        support by Nikita Maslov
                    </a>
                </div>
            </aside>

            <Modal value={modalSupport} setValue={setModalSupport} title="Обратная связь">
                <Text variant="text2" fontWeight={600}>
                    Пожалуйста, опишите в форме ниже свою проблему, идею или пожелание. Мы с удовольствием рассмотрим
                    каждое обращение и обязательно уведомим вас о результате.
                </Text>

                <Input
                    value={supportText}
                    setValue={setSupportText}
                    variant="textarea"
                    trackLength
                    lengthLimit={1500}
                />

                <Button onClick={createWarnHandler}>Отправить</Button>
            </Modal>
        </>
    );
};

export default Sidebar;
