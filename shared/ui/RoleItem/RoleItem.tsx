'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import cn from 'classnames';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';
import { TextPoint } from '../TextPoint';
import { HoverMenu, MenuLink } from '../HoverMenu';
import { IconButton } from '../Button';
import { Delete, DotsHorizontal, Edit } from '@/shared/icons';
import { LoaderForItem } from '../Preloader';
import { ConfirmModal } from '../Modal';
import { RoleDTO } from '@/entities/role';

type Props = {
    data: RoleDTO;
    loading?: boolean;
    deleteRole?: () => void;
    edit?: boolean;
    remove?: boolean;
};

const RoleItem: React.FC<Props> = ({ data, loading = false, deleteRole = () => {}, edit = false, remove = false }) => {
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
