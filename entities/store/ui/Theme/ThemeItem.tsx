'use client';

import React from 'react';
import cn from 'classnames';
import { Tooltip } from 'antd';

import base from '@/shared/styles/base.module.scss';
import styles from '../index.module.scss';

import type { ThemeAdmin } from '../../model';
import { Delete, DotsHorizontal, Edit, Notebook, ResCoin, Store } from '@/shared/icons';

import { HoverMenu, MenuLink } from '@/shared/ui/HoverMenu';
import { IconButton } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { formatDate } from '@/shared/utils/formatDate';
import { ConfirmModal } from '@/shared/ui/Modal';

type Props = {
    data: ThemeAdmin;
    edit?: boolean;
    publish?: boolean;
    remove?: boolean;
    togglePublish?: () => void;
    deleteCallback?: () => void;
};

const ThemeItem: React.FC<Props> = ({
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
        light,
        primary,
        isPublished,
        price,
        createdAt,
        requiredAchievement,
        requiredSubscription,
        seasonEndDate,
        seasonStartDate,
        updatedAt,
        usersCount,
        isFree,
    } = data || {};

    const [actionMenu, setActionMenu] = React.useState(false);
    const [confirmDelete, setConfirmDelete] = React.useState(false);

    return (
        <>
            <div className={cn(base.item3, styles.avatarItem)}>
                <div className={styles.avatarItemTags}>
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

                <div className={styles.avatarItemContent} style={{ background: light }}>
                    <div style={{ background: primary, width: '100px', height: '100px', borderRadius: '50%' }}></div>
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
                <Text>Вы действительно хотите удалить тему {title}?</Text>

                <Text color="error" fontWeight={600}>
                    Данную тему имеют {usersCount} пользователей!
                </Text>
            </ConfirmModal>
        </>
    );
};

export default ThemeItem;
