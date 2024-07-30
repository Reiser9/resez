'use client';

import React from 'react';
import cn from 'classnames';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { Tooltip } from 'antd';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import { ProductDTO } from '../model';
import { Text } from '@/shared/ui/Text';

import { Badge } from '@/shared/ui/Badge';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { Added, Check, Clapperboard, DotsHorizontal, Photo, ResCoin } from '@/shared/icons';
import { HoverMenu, MenuLink } from '@/shared/ui/HoverMenu';
import { IconButton } from '@/shared/ui/Button';
import { ConfirmModal } from '@/shared/ui/Modal';

type Props = {
    data: ProductDTO;
    addProductToProfile: () => void;
};

const AvatarStoreItem: React.FC<Props> = ({ data, addProductToProfile }) => {
    const { title, contentType, options, contentUrl, isCollected, price } = data || {};
    const { width, x, y } = options || {};

    const [actionMenu, setActionMenu] = React.useState(false);

    const { user } = useAppSelector((state) => state.user);
    const { avatar, nickname } = user || {};

    const playerRef = React.useRef<LottieRefCurrentProps>(null);
    const [animationData, setAnimationData] = React.useState<any | null>(null);
    const [isHovered, setIsHovered] = React.useState(false);
    const [isPlaying, setIsPlaying] = React.useState(false);

    const [confirmBuyModal, setConfirmBuyModal] = React.useState(false);

    React.useEffect(() => {
        const fetchAnimationData = async () => {
            try {
                const response = await fetch(contentUrl);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAnimationData(data);
            } catch (error) {
                console.error('Error fetching animation data:', error);
            }
        };

        if (contentType === 'animation') {
            fetchAnimationData();
        }
    }, [contentUrl, contentType]);

    React.useEffect(() => {
        if (isHovered && playerRef.current && !isPlaying) {
            setIsPlaying(true);
            playerRef.current.goToAndStop(0, true);
            playerRef.current.play();
        }
    }, [isHovered, animationData, isPlaying]);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleComplete = () => {
        if (playerRef.current) {
            playerRef.current.goToAndStop(0, true);
        }
        setIsPlaying(false);
    };

    return (
        <>
            <div className={cn(base.item3, styles.avatarItem)}>
                <div className={styles.avatarItemTags}>
                    {contentType === 'animation' ? (
                        <Tooltip title="Анимация">
                            <span className={styles.avatarItemTag}>
                                <Clapperboard />
                            </span>
                        </Tooltip>
                    ) : (
                        <Tooltip title="Изображение">
                            <span className={styles.avatarItemTag}>
                                <Photo />
                            </span>
                        </Tooltip>
                    )}
                </div>

                <div className={styles.avatarItemContent}>
                    {isCollected && (
                        <div className={styles.avatarItemCollected}>
                            <Check />
                        </div>
                    )}

                    <Badge image={avatar} text={nickname} style={{ width: 92, height: 92 }} />

                    <div
                        className={styles.avatarItemAvatarWrapper}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        {contentType === 'animation' ? (
                            <Lottie
                                animationData={animationData}
                                autoplay={false}
                                loop={false}
                                className={base.avatarDecoration}
                                style={{ width: width, top: y, left: x }}
                                lottieRef={playerRef}
                                onComplete={handleComplete}
                            />
                        ) : (
                            <>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={contentUrl}
                                    alt={title}
                                    className={base.avatarDecoration}
                                    style={{ width: width, top: y, left: x }}
                                />
                            </>
                        )}
                    </div>
                </div>

                <Text variant="h4" fontWeight={600}>
                    {title}
                </Text>

                <div className={styles.avatarItemBottom}>
                    {price ? (
                        <div className={styles.avatarItemPrice}>
                            {price}

                            <ResCoin />
                        </div>
                    ) : (
                        <Text fontWeight={600}>Бесплатно</Text>
                    )}

                    <HoverMenu
                        button={
                            <IconButton small variant="light" onClick={() => setActionMenu((prev) => !prev)}>
                                <DotsHorizontal />
                            </IconButton>
                        }
                        value={actionMenu}
                        setValue={setActionMenu}
                    >
                        {isCollected ? (
                            <MenuLink disabled>
                                <Check />
                                Добавлено
                            </MenuLink>
                        ) : price ? (
                            <MenuLink
                                onClick={() => {
                                    setActionMenu(false);
                                    setConfirmBuyModal(true);
                                }}
                            >
                                <Added />
                                Купить
                            </MenuLink>
                        ) : (
                            <MenuLink onClick={addProductToProfile}>
                                <Added />
                                Добавить
                            </MenuLink>
                        )}
                    </HoverMenu>
                </div>
            </div>

            {!!price && (
                <ConfirmModal
                    text={`Вы действительно хотите купить ${title} за ${price} ResCoin?`}
                    value={confirmBuyModal}
                    setValue={setConfirmBuyModal}
                    callback={addProductToProfile}
                />
            )}
        </>
    );
};

export default AvatarStoreItem;
