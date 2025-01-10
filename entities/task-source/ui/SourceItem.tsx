'use client';

import React from 'react';
import cn from 'classnames';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import type { Source } from '../model';

import { Text } from '@/shared/ui/Text';
import { TextPoint } from '@/shared/ui/TextPoint';
import { HoverMenu, MenuLink } from '@/shared/ui/HoverMenu';
import { IconButton } from '@/shared/ui/Button';
import { Delete, DotsHorizontal, Edit } from '@/shared/icons';
import { ConfirmModal } from '@/shared/ui/Modal';

type Props = {
    data: Source;
    edit?: boolean;
    remove?: boolean;
    removeCallback?: () => void;
};

const SourceItem: React.FC<Props> = ({ data, edit = false, remove = false, removeCallback = () => {} }) => {
    const { id, slug, source } = data || {};

    const [actionMenu, setActionMenu] = React.useState(false);
    const [confirmDelete, setConfirmDelete] = React.useState(false);

    return (
        <>
            <div className={cn(base.item3, styles.sourceItem)}>
                <div className={base.titleInner}>
                    <Text variant="h4">{source}</Text>

                    {(edit || remove) && (
                        <HoverMenu
                            button={
                                <IconButton small variant="light" onClick={() => setActionMenu((prev) => !prev)}>
                                    <DotsHorizontal />
                                </IconButton>
                            }
                            value={actionMenu}
                            setValue={setActionMenu}
                        >
                            {edit && (
                                <MenuLink href={`/admin/sources/edit/${id}`}>
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
                    )}
                </div>

                <TextPoint title="Ярлык источника" text={slug} />
            </div>

            <ConfirmModal
                value={confirmDelete}
                setValue={setConfirmDelete}
                text={`Вы действительно хотите удалить источник ${source}?`}
                callback={removeCallback}
            />
        </>
    );
};

export default SourceItem;
