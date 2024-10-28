'use client';

import React from 'react';
import cn from 'classnames';
import { Tooltip } from 'antd';
import { useQuery } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';
import styles from '../index.module.scss';

import type { AvatarDecorationAdmin as AvatarDecorationType } from '../../model';
import { Clapperboard, Delete, DotsHorizontal, Edit, Notebook, Photo, ResCoin, Store } from '@/shared/icons';
import useShortInfo from '@/features/user/data/useShortInfo';
import { formatDate } from '@/shared/utils/formatDate';

import { HoverMenu, MenuLink } from '@/shared/ui/HoverMenu';
import { IconButton } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { Badge } from '@/shared/ui/Badge';
import { AvatarDecoration } from '@/shared/ui/AvatarDecoration';
import { ConfirmModal } from '@/shared/ui/Modal';

type Props = {
    data: AvatarDecorationType;
    edit?: boolean;
    publish?: boolean;
    remove?: boolean;
    togglePublish?: () => void;
    deleteCallback?: () => void;
};

const AvatarItem: React.FC<Props> = ({
    data,
    edit,
    publish,
    remove,
    togglePublish = () => {},
    deleteCallback = () => {},
}) => {
    const {
        id,
        title,
        contentType,
        options,
        contentUrl,
        isPublished,
        price,
        usersCount,
        createdAt,
        updatedAt,
        seasonStartDate,
        seasonEndDate,
        requiredAchievement,
        requiredSubscription,
        isFree,
    } = data || {};

    const [actionMenu, setActionMenu] = React.useState(false);
    const [confirmDelete, setConfirmDelete] = React.useState(false);

    const { getShortInfo } = useShortInfo();

    const { data: user } = useQuery({
        queryKey: ['short_info'],
        queryFn: () => getShortInfo(),
    });

    const { avatar, nickname } = user?.user || {};

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

                    {isPublished ? (
                        <Tooltip title="В магазине">
                            <span className={styles.avatarItemTag}>
                                <Store />
                            </span>
                        </Tooltip>
                    ) : (
                        <Tooltip title="В черновике">
                            <span className={styles.avatarItemTag}>
                                <Notebook />
                            </span>
                        </Tooltip>
                    )}

                    {(seasonStartDate || seasonEndDate) && (
                        <span className={styles.avatarItemTagText}>
                            {formatDate(seasonStartDate, 'D.MM')} - {formatDate(seasonEndDate, 'D.MM')}
                        </span>
                    )}

                    {updatedAt && (
                        <Tooltip title={`Обновлено - ${formatDate(updatedAt)}`}>
                            <span className={styles.avatarItemTag}>
                                <Edit />
                            </span>
                        </Tooltip>
                    )}

                    <Tooltip title="Пользователи используют">
                        <span className={styles.avatarItemTagText}>{usersCount}</span>
                    </Tooltip>
                </div>

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

                <Text variant="h4" fontWeight={600}>
                    {title}
                </Text>

                <Text variant="text2" fontWeight={600}>
                    {formatDate(createdAt)}
                </Text>

                <div className={styles.avatarItemBottom}>
                    <div className={base.baseWrapperGap0}>
                        {isFree ? (
                            <Text fontWeight={600}>Бесплатно</Text>
                        ) : (
                            <div className={styles.avatarItemPrice}>
                                {price}

                                <ResCoin />
                            </div>
                        )}

                        {requiredSubscription && <Text fontWeight={600}>По подписке</Text>}
                        {requiredAchievement && <Text fontWeight={600}>За достижение</Text>}
                        {(seasonStartDate || seasonEndDate) && <Text fontWeight={600}>Сезонная награда</Text>}
                    </div>

                    <HoverMenu
                        button={
                            <IconButton small variant="light" onClick={() => setActionMenu((prev) => !prev)}>
                                <DotsHorizontal />
                            </IconButton>
                        }
                        value={actionMenu}
                        setValue={setActionMenu}
                    >
                        {publish && isPublished ? (
                            <MenuLink onClick={togglePublish}>
                                <Notebook />В черновик
                            </MenuLink>
                        ) : (
                            <MenuLink onClick={togglePublish}>
                                <Store />
                                Опубликовать
                            </MenuLink>
                        )}

                        {edit && (
                            <MenuLink href={`/admin/store/edit/${id}`}>
                                <Edit />
                                Редактировать
                            </MenuLink>
                        )}

                        {remove && (
                            <MenuLink
                                danger
                                onClick={() => {
                                    setConfirmDelete(true);
                                    setActionMenu(false);
                                }}
                            >
                                <Delete />
                                Удалить
                            </MenuLink>
                        )}
                    </HoverMenu>
                </div>
            </div>

            <ConfirmModal value={confirmDelete} setValue={setConfirmDelete} callback={deleteCallback}>
                <Text>Вы действительно хотите удалить украшение для аватара {title}?</Text>

                <Text color="error" fontWeight={600}>
                    Данное украшение аватара имеют {usersCount} пользователей!
                </Text>
            </ConfirmModal>
        </>
    );
};

export default AvatarItem;
