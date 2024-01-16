'use client';

import React from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { Switch } from 'antd';

import styles from './index.module.scss';

import { ArrowBottom, Cross, Enter, Exit, Menu, Moon, Notify, Snowflake, Trophy, User } from '@/shared/icons';
import { Badge } from '@/shared/ui/Badge';
import { Text } from '@/shared/ui/Text';
import { HoverMenu } from '@/shared/ui/HoverMenu';
import { Logo } from '@/shared/ui/Logo';
import { useEventContext } from '@/shared/context/EventProvider';
import { useThemeContext } from '@/shared/context/ThemeProvider';
import { useSidebarContext } from '@/shared/context/SidebarProvider';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { useLogout } from '@/features/user';
import { ConfirmModal } from '@/shared/ui/Modal';

type Props = {
    empty?: boolean;
};

const Header: React.FC<Props> = ({ empty = false }) => {
    const [profileMenu, setProfileMenu] = React.useState<boolean>(false);
    const [confirmLogout, setConfirmLogout] = React.useState<boolean>(false);

    const profileMenuRef = React.useRef<HTMLDivElement>(null);

    const { showParticles, toggleShowParticles } = useEventContext();
    const { theme, toggleTheme } = useThemeContext();
    const { showSidebar, setShowSidebar } = useSidebarContext();
    const { isLoading, logout } = useLogout();
    const { isAuth, user } = useAppSelector((state) => state.user);

    const closeProfileMenu = () => {
        setProfileMenu(false);
    };

    const menuHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        closeProfileMenu();
        setShowSidebar(!showSidebar);
    };

    const logoutHandler = (successCallback = () => {}) => {
        logout(() => successCallback());
        closeProfileMenu();
    };

    const toggleMenuProfile = () => {
        setProfileMenu((prev) => !prev);
    };

    return (
        <>
            <header className={styles.header}>
                <div className={styles.headerLogoWrapper}>
                    {!empty && (
                        <div className={styles.menuIconInner} onClick={menuHandler}>
                            <Menu
                                className={cn(styles.menuIcon, {
                                    [styles.active]: !showSidebar,
                                })}
                            />
                            <Cross
                                className={cn(styles.crossIcon, {
                                    [styles.active]: showSidebar,
                                })}
                            />
                        </div>
                    )}

                    <Logo />
                </div>

                {!empty && (
                    <div className={styles.headerProfileInner} ref={profileMenuRef}>
                        <HoverMenu
                            button={
                                <div className={styles.headerProfileWrap} onClick={toggleMenuProfile}>
                                    {isAuth ? (
                                        <>
                                            <Badge image={user?.avatar} text={user?.nickname} dot={false} />{' '}
                                            {/*Уведомление*/}
                                            <Text className={styles.headerProfileNick}>{user?.nickname}</Text>
                                        </>
                                    ) : (
                                        <Badge icon={<Enter />} />
                                    )}

                                    <ArrowBottom
                                        className={cn(styles.headerProfileArrow, {
                                            [styles.active]: profileMenu,
                                        })}
                                    />
                                </div>
                            }
                            value={profileMenu}
                            setValue={setProfileMenu}
                            big
                        >
                            {isAuth ? (
                                <>
                                    <div className={styles.headerProfileMenuInfo}>
                                        <div className={styles.headerProfileMenuData}>
                                            <Badge image={user?.avatar} text={user?.nickname} />

                                            <div className={styles.headerProfileMenuNameInner}>
                                                <Text textClassName={styles.headerProfileMenuName}>
                                                    {user?.nickname}
                                                </Text>

                                                <Text variant="text2" textClassName={styles.headerProfileMenuStatus}>
                                                    Новичок
                                                </Text>
                                            </div>
                                        </div>

                                        <div className={styles.headerProfileLvl}>{user?.level}</div>
                                    </div>

                                    <Link
                                        href="/profile"
                                        className={styles.headerProfileMenuLink}
                                        onClick={closeProfileMenu}
                                    >
                                        <User />
                                        Профиль
                                    </Link>

                                    <Link
                                        href="/notifies"
                                        className={styles.headerProfileMenuLink}
                                        onClick={closeProfileMenu}
                                    >
                                        <Notify />
                                        Уведомления
                                        <span className={styles.headerProfileNotifyCount}>2</span>
                                    </Link>

                                    <Link
                                        href="/profile/achievements"
                                        className={styles.headerProfileMenuLink}
                                        onClick={closeProfileMenu}
                                    >
                                        <Trophy />
                                        Достижения
                                    </Link>
                                </>
                            ) : (
                                <Link href="/login" className={styles.headerProfileMenuLink} onClick={closeProfileMenu}>
                                    <User />
                                    Войти
                                </Link>
                            )}

                            <div className={styles.headerProfileMenuLink} onClick={toggleTheme}>
                                <Moon />
                                Темная тема
                                <Switch size="small" checked={theme === 'dark'} className={styles.headerThemeLabel} />
                            </div>

                            <div className={styles.headerProfileMenuLink} onClick={toggleShowParticles}>
                                <Snowflake />
                                Снег
                                <Switch size="small" checked={showParticles} className={styles.headerThemeLabel} />
                            </div>

                            {isAuth && (
                                <div
                                    className={`${styles.headerProfileMenuLink} ${styles.delete}`}
                                    onClick={() => setConfirmLogout(true)}
                                >
                                    <Exit />
                                    Выход
                                </div>
                            )}
                        </HoverMenu>
                    </div>
                )}
            </header>

            <ConfirmModal
                value={confirmLogout}
                setValue={setConfirmLogout}
                text="Вы действительно хотите выйти?"
                rejectText="Отмена"
                confirmText="Выйти"
                callback={logoutHandler}
                loading={isLoading}
            ></ConfirmModal>
        </>
    );
};

export default Header;
