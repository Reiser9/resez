<<<<<<< HEAD
'use client';

import React, { Key } from 'react';
import { useParams } from 'next/navigation';
import { Checkbox, Tree } from 'antd';
import { Color } from 'antd/es/color-picker';
import { useRouter } from 'next/navigation';
import { TreeProps } from 'antd/lib';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import { BackButton, Button, IconButton } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { ColorPickerInput, Input } from '@/shared/ui/Input';
import { Preloader } from '@/shared/ui/Preloader';
import { usePermissions, useRoles } from '@/features/role';
import { CONFIG } from '@/shared/consts/CONFIG';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { convertHexToOpacityHex } from '@/shared/utils/convertHexToOpacityHex';
import { TreePermission } from '../../create/page';
import { Permissions } from '@/entities/role';
import RolePreview from '@/shared/ui/Preview/RolePreview/RolePreview';
import { Plus } from '@/shared/icons';
import CreatePageDefault from '@/shared/wrappers/CreatePageWrapper/CreatePageWrapper';

const AdminEditRole = () => {
    const { id } = useParams();
    const [name, setName] = React.useState<string>('');

    const [textColor, setTextColor] = React.useState<string | Color>(CONFIG.BASE_COLOR);
    const [textColorFormatHex, setTextColorFormatHex] = React.useState<'hex' | 'rgb' | 'hsb' | undefined>('hex');

    const [backgroundColor, setBackgroundColor] = React.useState<string | Color>(CONFIG.BASE_COLOR_LIGHT);
    const [backgroundColorFormatHex, setBackgroundColorFormatHex] = React.useState<'hex' | 'rgb' | 'hsb' | undefined>(
        'hex',
    );

    const { isLoading, roleIsLoading, editRole, getCurrentRole } = useRoles();
    const { isLoading: permissionsIsLoading, getAllPermissions } = usePermissions();
    const { permissions } = useAppSelector((state) => state.role);
    const router = useRouter();

    const textHexString = React.useMemo(
        () => (typeof textColor === 'string' ? textColor : textColor.toHexString()),
        [textColor],
    );
    const backgroundHexString = React.useMemo(
        () => (typeof backgroundColor === 'string' ? backgroundColor : backgroundColor.toHexString()),
        [backgroundColor],
    );

    const [backgroundColorAuto, setBackgroundColorAuto] = React.useState<boolean>(false);

    const [currentPermissions, setCurrentPermissions] = React.useState<TreePermission[]>([]);
    const [permission, setPermission] = React.useState<Key[]>([]);
    const [permissionHalf, setPermissionHalf] = React.useState<Key[]>([]);

    const onCheckPermission: TreeProps['onCheck'] = (value, elem) => {
        if (!('checked' in value)) {
            setPermission(value);
        }

        if (elem.halfCheckedKeys) {
            setPermissionHalf(elem.halfCheckedKeys);
        }
    };

    const formatArrayToTree = (arr: Permissions[]): TreePermission[] =>
        arr.map((item: Permissions) => ({
            title: item.permission,
            key: item.id.toString(),
            children: formatArrayToTree(item.childrens) ?? [],
        }));

    const editRoleHandler = () => {
        const backbroundTextColor = backgroundColorAuto ? convertHexToOpacityHex(textHexString) : backgroundHexString;

        const data = {
            role: name,
            permissions: [...permission, ...permissionHalf],
            textColor: textHexString,
            backgroundColor: backbroundTextColor,
        };

        editRole(id as string, data, () => router.push('/admin/roles'));
    };

    const getCurrentRoleHandler = async (id: string | number) => {
        const role = await getCurrentRole(id);

        if (!role) {
            return router.push('/admin/roles');
        }

        const { role: roleName, textColor, backgroundColor, permissions } = role;

        setName(roleName);
        setTextColor(textColor);
        setBackgroundColor(backgroundColor);

        const perm = permissions.filter((data) => data.isActive).map((data) => data.id.toString());
        const permHalf = permissions.filter((data) => !data.isActive).map((data) => data.id.toString());
        setPermission(perm);
        setPermissionHalf(permHalf);
    };

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

    if (roleIsLoading || permissionsIsLoading) {
        return <Preloader page />;
    }

    return (
        <CreatePageDefault
            title="Редактирование роли"
            button={
                <Button auto onClick={editRoleHandler} loading={isLoading} levitation>
                    Сохранить
                </Button>
            }
        >
            <div className={base.form}>
                <RolePreview
                    name={name}
                    textColor={textHexString}
                    backgroundColor={backgroundColorAuto ? convertHexToOpacityHex(textHexString) : backgroundHexString}
                />

                <Input
                    value={name}
                    setValue={setName}
                    title="Название роли"
                    placeholder="Админ, модератор, хелпер.."
                    trackLength
                    lengthLimit={30}
                />

                <ColorPickerInput
                    title="Выберите цвет текста"
                    hexString={textHexString}
                    value={textColor}
                    format={textColorFormatHex}
                    onFormatChange={setTextColorFormatHex}
                    onChangeComplete={(color) => setTextColor(color)}
                />

                <Checkbox checked={backgroundColorAuto} onChange={(e) => setBackgroundColorAuto(e.target.checked)}>
                    Сгенировать фоновый цвет автоматически
                </Checkbox>

                {!backgroundColorAuto && (
                    <ColorPickerInput
                        title="Выберите цвет фона"
                        hexString={backgroundHexString}
                        value={backgroundColor}
                        format={backgroundColorFormatHex}
                        onFormatChange={setBackgroundColorFormatHex}
                        onChangeComplete={(color) => setBackgroundColor(color)}
                    />
                )}

                <div style={{ width: '100%', display: 'flex' }}>
                    <Tree
                        selectable={false}
                        checkable
                        defaultExpandAll
                        onCheck={onCheckPermission}
                        checkedKeys={permission}
                        treeData={currentPermissions}
                    />
                </div>
            </div>
        </CreatePageDefault>
    );
};

export default AdminEditRole;
=======
'use client';

import React, { Key } from 'react';
import { useParams } from 'next/navigation';
import { Checkbox, Tree } from 'antd';
import { Color } from 'antd/es/color-picker';
import { useRouter } from 'next/navigation';
import { TreeProps } from 'antd/lib';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import { BackButton, Button, IconButton } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { ColorPickerInput, Input } from '@/shared/ui/Input';
import { Preloader } from '@/shared/ui/Preloader';
import { usePermissions, useRoles } from '@/features/role';
import { CONFIG } from '@/shared/consts/CONFIG';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { convertHexToOpacityHex } from '@/shared/utils/convertHexToOpacityHex';
import { TreePermission } from '../../create/page';
import { Permissions } from '@/entities/role';
import RolePreview from '@/shared/ui/Preview/RolePreview/RolePreview';
import { Plus } from '@/shared/icons';
import CreatePageDefault from '@/shared/wrappers/CreatePageWrapper/CreatePageWrapper';

const AdminEditRole = () => {
    const { id } = useParams();
    const [name, setName] = React.useState<string>('');

    const [textColor, setTextColor] = React.useState<string | Color>(CONFIG.BASE_COLOR);
    const [textColorFormatHex, setTextColorFormatHex] = React.useState<'hex' | 'rgb' | 'hsb' | undefined>('hex');

    const [backgroundColor, setBackgroundColor] = React.useState<string | Color>(CONFIG.BASE_COLOR_LIGHT);
    const [backgroundColorFormatHex, setBackgroundColorFormatHex] = React.useState<'hex' | 'rgb' | 'hsb' | undefined>(
        'hex',
    );

    const { isLoading, roleIsLoading, editRole, getCurrentRole } = useRoles();
    const { isLoading: permissionsIsLoading, getAllPermissions } = usePermissions();
    const { permissions } = useAppSelector((state) => state.role);
    const router = useRouter();

    const textHexString = React.useMemo(
        () => (typeof textColor === 'string' ? textColor : textColor.toHexString()),
        [textColor],
    );
    const backgroundHexString = React.useMemo(
        () => (typeof backgroundColor === 'string' ? backgroundColor : backgroundColor.toHexString()),
        [backgroundColor],
    );

    const [backgroundColorAuto, setBackgroundColorAuto] = React.useState<boolean>(false);

    const [currentPermissions, setCurrentPermissions] = React.useState<TreePermission[]>([]);
    const [permission, setPermission] = React.useState<Key[]>([]);
    const [permissionHalf, setPermissionHalf] = React.useState<Key[]>([]);

    const onCheckPermission: TreeProps['onCheck'] = (value, elem) => {
        if (!('checked' in value)) {
            setPermission(value);
        }

        if (elem.halfCheckedKeys) {
            setPermissionHalf(elem.halfCheckedKeys);
        }
    };

    const formatArrayToTree = (arr: Permissions[]): TreePermission[] =>
        arr.map((item: Permissions) => ({
            title: item.permission,
            key: item.id.toString(),
            children: formatArrayToTree(item.childrens) ?? [],
        }));

    const editRoleHandler = () => {
        const backbroundTextColor = backgroundColorAuto ? convertHexToOpacityHex(textHexString) : backgroundHexString;

        const data = {
            role: name,
            permissions: [...permission, ...permissionHalf],
            textColor: textHexString,
            backgroundColor: backbroundTextColor,
        };

        editRole(id as string, data, () => router.push('/admin/roles'));
    };

    const getCurrentRoleHandler = async (id: string | number) => {
        const role = await getCurrentRole(id);

        if (!role) {
            return router.push('/admin/roles');
        }

        const { role: roleName, textColor, backgroundColor, permissions } = role;

        setName(roleName);
        setTextColor(textColor);
        setBackgroundColor(backgroundColor);

        const perm = permissions.filter((data) => data.isActive).map((data) => data.id.toString());
        const permHalf = permissions.filter((data) => !data.isActive).map((data) => data.id.toString());
        setPermission(perm);
        setPermissionHalf(permHalf);
    };

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

    if (roleIsLoading || permissionsIsLoading) {
        return <Preloader page />;
    }

    return (
        <CreatePageDefault
            title="Редактирование роли"
            button={
                <Button auto onClick={editRoleHandler} loading={isLoading} levitation>
                    Сохранить
                </Button>
            }
        >
            <div className={base.form}>
                <RolePreview
                    name={name}
                    textColor={textHexString}
                    backgroundColor={backgroundColorAuto ? convertHexToOpacityHex(textHexString) : backgroundHexString}
                />

                <Input
                    value={name}
                    setValue={setName}
                    title="Название роли"
                    placeholder="Админ, модератор, хелпер.."
                    trackLength
                    lengthLimit={30}
                />

                <ColorPickerInput
                    title="Выберите цвет текста"
                    hexString={textHexString}
                    value={textColor}
                    format={textColorFormatHex}
                    onFormatChange={setTextColorFormatHex}
                    onChangeComplete={(color) => setTextColor(color)}
                />

                <Checkbox checked={backgroundColorAuto} onChange={(e) => setBackgroundColorAuto(e.target.checked)}>
                    Сгенировать фоновый цвет автоматически
                </Checkbox>

                {!backgroundColorAuto && (
                    <ColorPickerInput
                        title="Выберите цвет фона"
                        hexString={backgroundHexString}
                        value={backgroundColor}
                        format={backgroundColorFormatHex}
                        onFormatChange={setBackgroundColorFormatHex}
                        onChangeComplete={(color) => setBackgroundColor(color)}
                    />
                )}

                <div style={{ width: '100%', display: 'flex' }}>
                    <Tree
                        selectable={false}
                        checkable
                        defaultExpandAll
                        onCheck={onCheckPermission}
                        checkedKeys={permission}
                        treeData={currentPermissions}
                    />
                </div>
            </div>
        </CreatePageDefault>
    );
};

export default AdminEditRole;
>>>>>>> c61da454dd30e7ca31637fe711cf5e35c92c2018
