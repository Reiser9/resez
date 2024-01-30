'use client';

import React, { Key } from 'react';
import { useParams, useRouter } from 'next/navigation';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { usePermissions, useRoles } from '@/features/role';
import { Preloader } from '@/shared/ui/Preloader';
import { BackButton, IconButton } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { Tree } from 'antd';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { TreePermission } from '../create/page';
import { Permissions } from '@/entities/role';
import { HoverMenu, MenuLink } from '@/shared/ui/HoverMenu';
import { Delete, DotsHorizontal, Edit } from '@/shared/icons';
import { ConfirmModal } from '@/shared/ui/Modal';

const AdminRolePage = () => {
    const { id } = useParams();
    const [name, setName] = React.useState<string>('');

    const [currentPermissions, setCurrentPermissions] = React.useState<TreePermission[]>([]);
    const [permission, setPermission] = React.useState<Key[]>([]);

    const [actionMenu, setActionMenu] = React.useState<boolean>(false);
    const [confirmDelete, setConfirmDelete] = React.useState<boolean>(false);

    const { permissions } = useAppSelector((state) => state.role);
    const { isLoading, getAllPermissions } = usePermissions();
    const { roleIsLoading, rolesIsLoading, getCurrentRole, deleteRole } = useRoles();
    const router = useRouter();

    const getCurrentRoleHandler = async (id: string | number) => {
        const role = await getCurrentRole(id);

        if (!role) {
            return router.push('/admin/roles');
        }

        const { role: roleName, permissions } = role;

        setName(roleName);

        const perm = permissions.filter((data) => data.isActive).map((data) => data.id.toString());
        setPermission(perm);
    };

    const formatArrayToTree = (arr: Permissions[]): TreePermission[] =>
        arr.map((item: Permissions) => ({
            title: item.permission,
            key: item.id.toString(),
            children: formatArrayToTree(item.childrens) ?? [],
        }));

    React.useEffect(() => {
        getAllPermissions();
    }, []);

    React.useEffect(() => {
        if (!permissions || permissions.length === 0) {
            return;
        }

        const formattedPermissions = formatArrayToTree(permissions);
        setCurrentPermissions(formattedPermissions);
    }, [permissions]);

    React.useEffect(() => {
        if (id) {
            getCurrentRoleHandler(id as string);
        }
    }, [id]);

    if (roleIsLoading || isLoading) {
        return <Preloader page />;
    }

    return (
        <>
            <div className={base.baseWrapperGap16}>
                <div className={base.titleInner}>
                    <div className={base.titleWrapper}>
                        <BackButton />

                        <Text variant="h3">{name}</Text>
                    </div>

                    <HoverMenu
                        value={actionMenu}
                        setValue={setActionMenu}
                        button={
                            <IconButton small variant="light" onClick={() => setActionMenu(true)}>
                                <DotsHorizontal />
                            </IconButton>
                        }
                    >
                        <MenuLink onClick={() => router.push(`edit/${id}`)}>
                            <Edit />
                            Редактировать
                        </MenuLink>

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
                    </HoverMenu>
                </div>

                <div className={styles.roleContent}>
                    <div className={styles.roleInfo}>
                        <div style={{ width: '100%', display: 'flex' }}>
                            <Tree
                                selectable={false}
                                checkable
                                defaultExpandAll
                                checkedKeys={permission}
                                treeData={currentPermissions}
                                disabled
                            />
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmModal
                value={confirmDelete}
                setValue={setConfirmDelete}
                text="Вы действительно хотите удалить роль?"
                callback={() => deleteRole(id as string, () => router.push("/admin/roles"))}
                loading={rolesIsLoading.includes(id as string)}
            />
        </>
    );
};

export default AdminRolePage;
