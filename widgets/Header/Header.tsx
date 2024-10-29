'use client';

import React from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { Switch } from 'antd';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import styles from './index.module.scss';

import {
    ArrowBottom,
    Cross,
    Enter,
    Exit,
    Menu,
    Moon,
    Notify,
    ResCoin,
    ResezPremium,
    Snowflake,
    Ticket,
    Trophy,
    User,
} from '@/shared/icons';
import { useEventContext } from '@/shared/context/EventProvider';
import { useThemeContext } from '@/shared/context/ThemeProvider';
import { useSidebarContext } from '@/shared/context/SidebarProvider';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { useLogout } from '@/features/user';
import { getHolidayEvent } from '@/shared/utils/getHolidayEvent';
import { useNotify } from '@/features/notify';
import { usePromocode } from '@/features/promocode';
import useShortInfo from '@/features/user/data/useShortInfo';

import { ConfirmModal, Modal } from '@/shared/ui/Modal';
import { Logo } from '@/shared/ui/Logo';
import { HoverMenu } from '@/shared/ui/HoverMenu';
import { Text } from '@/shared/ui/Text';
import { Badge } from '@/shared/ui/Badge';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { PromocodeReward } from '@/entities/promocode';
import Image from 'next/image';

type Props = {
    empty?: boolean;
};

const Header: React.FC<Props> = ({ empty = false }) => {
    const [profileMenu, setProfileMenu] = React.useState(false);
    const [confirmLogout, setConfirmLogout] = React.useState(false);
    const [promocodeModal, setPromocodeModal] = React.useState(false);
    const [promocode, setPromocode] = React.useState('');
    const [rewardModal, setRewardModal] = React.useState(false);
    const [reward, setReward] = React.useState<PromocodeReward | null>(null);

    const { coins, xp } = reward || {};

    const profileMenuRef = React.useRef<HTMLDivElement>(null);

    const holidayEventName = getHolidayEvent().name;
    const { showParticles, toggleShowParticles } = useEventContext();
    const { theme, toggleTheme } = useThemeContext();
    const { showSidebar, setShowSidebar } = useSidebarContext();
    const { isLoading, logout } = useLogout();
    const { getUnreadNotifies } = useNotify();
    const { getShortInfo } = useShortInfo();
    const { activatePromocode } = usePromocode();
    const queryClient = useQueryClient();
    const isAuth = useAppSelector((state) => state.user.isAuth);

    const invalidateShortInfo = () => {
        queryClient.invalidateQueries({ queryKey: ['short_info'] });
    };

    const { data: unreadNotifiesCount } = useQuery({
        queryKey: ['notify_count'],
        queryFn: () => getUnreadNotifies(),
        enabled: isAuth,
    });

    const { data: user } = useQuery({
        queryKey: ['short_info'],
        queryFn: () => getShortInfo(),
        enabled: isAuth,
    });

    const { avatar, levelInfo, nickname, balance, subscription } = user?.user || {};
    const { level } = levelInfo || {};
    const { icon, subscription: subscriptionName } = subscription || {};

    const closeProfileMenu = () => {
        setProfileMenu(false);
    };

    const menuHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        closeProfileMenu();
        setShowSidebar(!showSidebar);
    };

    const logoutHandler = () => {
        logout();
        closeProfileMenu();
    };

    const toggleMenuProfile = () => {
        setProfileMenu((prev) => !prev);
    };

    const activatePromocodeHandler = async () => {
        const reward = await activatePromocode(promocode, () => {
            setPromocodeModal(false);
            setPromocode('');
            invalidateShortInfo();
        });

        if (!reward) return;

        setRewardModal(true);
        setReward(reward);
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
                                            <div className={styles.headerAvatarWrapper}>
                                                <Badge
                                                    isUserAvatar
                                                    image={avatar}
                                                    text={nickname}
                                                    dot={!!unreadNotifiesCount}
                                                />

                                                {!!subscription && icon && (
                                                    <div className={styles.headerSubscriptionLogo}>
                                                        <Image
                                                            src={icon}
                                                            alt={`${subscriptionName}`}
                                                            width={20}
                                                            height={20}
                                                        />
                                                    </div>
                                                )}
                                            </div>

                                            <Text className={styles.headerProfileNick}>{nickname}</Text>
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
                                            <Badge isUserAvatar image={avatar} text={nickname} />

                                            <div className={styles.headerProfileMenuNameInner}>
                                                <Text textClassName={styles.headerProfileMenuName}>{nickname}</Text>

                                                <Text variant="text2" textClassName={styles.headerProfileMenuStatus}>
                                                    Новичок
                                                </Text>
                                            </div>
                                        </div>

                                        <div className={styles.headerProfileLvl}>{level}</div>
                                    </div>

                                    <div className={styles.headerBalance}>
                                        <Text fontWeight={600}>Баланс</Text>

                                        <div className={styles.headerBalanceWrapper}>
                                            <Text fontWeight={600}>{balance}</Text>

                                            <ResCoin />
                                        </div>
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
                                        href="/notify"
                                        className={styles.headerProfileMenuLink}
                                        onClick={closeProfileMenu}
                                    >
                                        <Notify />
                                        Уведомления
                                        {!!unreadNotifiesCount && (
                                            <span className={styles.headerProfileNotifyCount}>
                                                {unreadNotifiesCount > 9 ? '9+' : unreadNotifiesCount}
                                            </span>
                                        )}
                                    </Link>

                                    <div
                                        className={styles.headerProfileMenuLink}
                                        onClick={() => {
                                            closeProfileMenu();
                                            setPromocodeModal(true);
                                        }}
                                    >
                                        <Ticket />
                                        Промокод
                                    </div>

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

                            {holidayEventName === 'newyear' && (
                                <div className={styles.headerProfileMenuLink} onClick={toggleShowParticles}>
                                    <Snowflake />
                                    Снег
                                    <Switch size="small" checked={showParticles} className={styles.headerThemeLabel} />
                                </div>
                            )}

                            {isAuth && (
                                <div
                                    className={cn(styles.headerProfileMenuLink, styles.delete)}
                                    onClick={() => {
                                        closeProfileMenu();
                                        setConfirmLogout(true);
                                    }}
                                >
                                    <Exit />
                                    Выход
                                </div>
                            )}
                        </HoverMenu>
                    </div>
                )}
            </header>

            {!empty && (
                <>
                    <ConfirmModal
                        value={confirmLogout}
                        setValue={setConfirmLogout}
                        text="Вы действительно хотите выйти?"
                        rejectText="Отмена"
                        confirmText="Выйти"
                        callback={logoutHandler}
                        loading={isLoading}
                    ></ConfirmModal>

                    <Modal value={promocodeModal} setValue={setPromocodeModal} title="Активация промокода">
                        <Input
                            value={promocode}
                            setValue={setPromocode}
                            title="Промокод"
                            trackLength
                            lengthLimit={20}
                        />

                        <Text variant="text2">
                            В нашей группе{' '}
                            <a href={process.env.NEXT_PUBLIC_VK_LINK} target="_blank">
                                ВКонтакте
                            </a>{' '}
                            и канале{' '}
                            <a href={process.env.NEXT_PUBLIC_TELEGRAM_LINK} target="_blank">
                                Telegram
                            </a>{' '}
                            регулярно появляются новые промокоды, которые помогут вам получить скидки и другие приятные
                            бонусы. Мы всегда стараемся радовать наших подписчиков эксклюзивными предложениями, поэтому
                            следите за обновлениями, чтобы не упустить выгодные возможности!
                        </Text>

                        <Button onClick={activatePromocodeHandler} disabled={!promocode}>
                            Активировать
                        </Button>
                    </Modal>

                    <Modal value={rewardModal} setValue={setRewardModal} title="Промокод успешно активирован">
                        <div className={styles.rewardPromoWrapper}>
                            <Text variant="h4">Награда за активацию:</Text>

                            <div className={styles.rewardPromo}>
                                {!!coins && <Text fontWeight={600}>ResCoin: {coins}</Text>}

                                {!!xp && <Text fontWeight={600}>Опыт: {xp}</Text>}

                                {!coins && !xp && <Text fontWeight={600}>Промокод не включает в себя награды</Text>}
                            </div>

                            <Button auto onClick={() => setRewardModal(false)}>
                                Понятно
                            </Button>
                        </div>
                    </Modal>
                </>
            )}
        </>
    );
};

export default Header;
