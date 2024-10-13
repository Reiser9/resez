'use client';

import React from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { useRouter } from 'next/navigation';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import type { RoleDTO } from '@/entities/role';
import { Delete, DotsHorizontal, Edit } from '@/shared/icons';

import { HoverMenu, MenuLink } from '@/shared/ui/HoverMenu';
import { IconButton } from '@/shared/ui/Button';
import { LoaderForItem } from '@/shared/ui/Preloader';
import { ConfirmModal } from '@/shared/ui/Modal';
import { TextPoint } from '@/shared/ui/TextPoint';

type Props = {
    data: RoleDTO;
    loading?: boolean;
    deleteRole?: () => void;
    edit?: boolean;
    remove?: boolean;
    children?: React.ReactNode;
};

const RoleItem: React.FC<Props> = ({
    data,
    loading = false,
    deleteRole = () => {},
    edit = false,
    remove = false,
    children,
}) => {
    const { id, role, permissionsCount, usersCount, textColor, backgroundColor } = data || {};

    const [actionMenu, setActionMenu] = React.useState(false);
    const [confirmDelete, setConfirmDelete] = React.useState(false);

    const router = useRouter();

    return (
        <>
            <div className={cn(base.item4, styles.roleItem)}>
                {role && (
                    <Link
                        href={`/admin/roles/${id}`}
                        prefetch={false}
                        className={styles.roleItemName}
                        style={{ background: backgroundColor, color: textColor }}
                    >
                        {role}
                    </Link>
                )}

                <TextPoint title="Используют" text={usersCount || 0} />

                <div className={styles.roleItemInfoInner}>
                    <TextPoint title="Привилегий" text={permissionsCount || 0} />

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
                                <MenuLink onClick={() => router.push(`/admin/roles/edit/${id}`)}>
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

                {children && children}

                {loading && <LoaderForItem />}
            </div>

            <ConfirmModal
                value={confirmDelete}
                setValue={setConfirmDelete}
                text={`Вы действительно хотите удалить роль ${role}?`}
                callback={deleteRole}
            />
        </>
    );
};

export default RoleItem;
