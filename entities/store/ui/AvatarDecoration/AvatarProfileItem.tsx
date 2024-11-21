'use client';

import React from 'react';
import cn from 'classnames';
import { Tooltip } from 'antd';
import { useQuery } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';
import styles from '../index.module.scss';

import type { AvatarDecorationProfileAndStore as AvatarDecorationType } from '../../model';
import { Added, Blind, Clapperboard, DotsHorizontal, Photo } from '@/shared/icons';
import useShortInfo from '@/features/user/data/useShortInfo';

import { Text } from '@/shared/ui/Text';
import { Badge } from '@/shared/ui/Badge';
import { HoverMenu, MenuLink } from '@/shared/ui/HoverMenu';
import { IconButton } from '@/shared/ui/Button';
import { AvatarDecoration } from '@/shared/ui/AvatarDecoration';

type Props = {
    data: AvatarDecorationType;
    useProduct?: () => void;
    resetProduct?: () => void;
};

const AvatarProfileItem: React.FC<Props> = ({ data, useProduct = () => {}, resetProduct = () => {} }) => {
    const { title, contentType, options, contentUrl, isActive } = data || {};

    const [actionMenu, setActionMenu] = React.useState(false);

    const { getShortInfo } = useShortInfo();

    const { data: user, isLoading: userIsLoading } = useQuery({
        queryKey: ['short_info'],
        queryFn: () => getShortInfo(),
    });

    const { avatar, nickname } = user?.user || {};

    return (
        <div
            className={cn(base.item3, styles.avatarItem, {
                [styles.active]: isActive,
            })}
        >
            <div className={styles.avatarItemContent}>
                <Badge image={avatar} text={nickname} style={{ width: 92, height: 92 }} />

                <AvatarDecoration
                    title={title}
                    contentUrl={contentUrl}
                    contentType={contentType}
                    options={options}
                    hoverAnimation
                />
            </div>

            <div className={styles.avatarItemTags}>
                {contentType === 'animation' ? (
                    <Tooltip destroyTooltipOnHide title="Анимация">
                        <span className={styles.avatarItemTag}>
                            <Clapperboard />
                        </span>
                    </Tooltip>
                ) : (
                    <Tooltip destroyTooltipOnHide title="Изображение">
                        <span className={styles.avatarItemTag}>
                            <Photo />
                        </span>
                    </Tooltip>
                )}
            </div>

            <div className={styles.avatarItemBottom}>
                <Text variant="h4" fontWeight={600}>
                    {title}
                </Text>

                <HoverMenu
                    button={
                        <IconButton small variant="light" onClick={() => setActionMenu((prev) => !prev)}>
                            <DotsHorizontal />
                        </IconButton>
                    }
                    value={actionMenu}
                    setValue={setActionMenu}
                >
                    {isActive ? (
                        <MenuLink onClick={resetProduct}>
                            <Blind />
                            Отключить
                        </MenuLink>
                    ) : (
                        <MenuLink onClick={useProduct}>
                            <Added />
                            Использовать
                        </MenuLink>
                    )}
                </HoverMenu>
            </div>
        </div>
    );
};

export default AvatarProfileItem;
