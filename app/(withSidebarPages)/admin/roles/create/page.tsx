<<<<<<< HEAD
'use client';

import React, { Key } from 'react';
import { Checkbox, Tree } from 'antd';
import { useRouter } from 'next/navigation';
import { Color } from 'antd/es/color-picker';
import { TreeProps } from 'antd/lib';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { Text } from '@/shared/ui/Text';
import { ColorPickerInput, Input } from '@/shared/ui/Input';
import { BackButton, Button } from '@/shared/ui/Button';
import { CONFIG } from '@/shared/consts/CONFIG';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { Preloader } from '@/shared/ui/Preloader';
import { convertHexToOpacityHex } from '@/shared/utils/convertHexToOpacityHex';
import { usePermissions, useRoles } from '@/features/role';
import { Permissions } from '@/entities/role';
import RolePreview from '@/shared/ui/Preview/RolePreview/RolePreview';
import CreatePageDefault from '@/shared/wrappers/CreatePageWrapper/CreatePageWrapper';

export type TreePermission = {
    title: string;
    key: string;
    children: TreePermission[];
};

const AdminCreateRole = () => {
    const [name, setName] = React.useState<string>('');

    const [textColor, setTextColor] = React.useState<string | Color>(CONFIG.BASE_COLOR);
    const [textColorFormatHex, setTextColorFormatHex] = React.useState<'hex' | 'rgb' | 'hsb' | undefined>('hex');

    const [backgroundColor, setBackgroundColor] = React.useState<string | Color>(CONFIG.BASE_COLOR_LIGHT);
    const [backgroundColorFormatHex, setBackgroundColorFormatHex] = React.useState<'hex' | 'rgb' | 'hsb' | undefined>(
        'hex',
    );

    const { isLoading, createRole } = useRoles();
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

    const [backgroundColorAuto, setBackgroundColorAuto] = React.useState<boolean>(true);

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

    const createRoleHandler = () => {
        const backbroundTextColor = backgroundColorAuto ? convertHexToOpacityHex(textHexString) : backgroundHexString;

        const data = {
            role: name,
            permissions: [...permission, ...permissionHalf],
            textColor: textHexString,
            backgroundColor: backbroundTextColor,
        };

        createRole(data, () => router.push('/admin/roles'));
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

    if (permissionsIsLoading) {
        return <Preloader page />;
    }

    return (
        <CreatePageDefault
            title="Создание роли"
            button={
                <Button auto onClick={createRoleHandler} loading={isLoading} levitation>
                    Создать
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

export default AdminCreateRole;
=======
'use client';

import React, { Key } from 'react';
import { Checkbox, Tree } from 'antd';
import { useRouter } from 'next/navigation';
import { Color } from 'antd/es/color-picker';
import { TreeProps } from 'antd/lib';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { Text } from '@/shared/ui/Text';
import { ColorPickerInput, Input } from '@/shared/ui/Input';
import { BackButton, Button } from '@/shared/ui/Button';
import { CONFIG } from '@/shared/consts/CONFIG';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { Preloader } from '@/shared/ui/Preloader';
import { convertHexToOpacityHex } from '@/shared/utils/convertHexToOpacityHex';
import { usePermissions, useRoles } from '@/features/role';
import { Permissions } from '@/entities/role';
import RolePreview from '@/shared/ui/Preview/RolePreview/RolePreview';
import CreatePageDefault from '@/shared/wrappers/CreatePageWrapper/CreatePageWrapper';

export type TreePermission = {
    title: string;
    key: string;
    children: TreePermission[];
};

const AdminCreateRole = () => {
    const [name, setName] = React.useState<string>('');

    const [textColor, setTextColor] = React.useState<string | Color>(CONFIG.BASE_COLOR);
    const [textColorFormatHex, setTextColorFormatHex] = React.useState<'hex' | 'rgb' | 'hsb' | undefined>('hex');

    const [backgroundColor, setBackgroundColor] = React.useState<string | Color>(CONFIG.BASE_COLOR_LIGHT);
    const [backgroundColorFormatHex, setBackgroundColorFormatHex] = React.useState<'hex' | 'rgb' | 'hsb' | undefined>(
        'hex',
    );

    const { isLoading, createRole } = useRoles();
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

    const [backgroundColorAuto, setBackgroundColorAuto] = React.useState<boolean>(true);

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

    const createRoleHandler = () => {
        const backbroundTextColor = backgroundColorAuto ? convertHexToOpacityHex(textHexString) : backgroundHexString;

        const data = {
            role: name,
            permissions: [...permission, ...permissionHalf],
            textColor: textHexString,
            backgroundColor: backbroundTextColor,
        };

        createRole(data, () => router.push('/admin/roles'));
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

    if (permissionsIsLoading) {
        return <Preloader page />;
    }

    return (
        <CreatePageDefault
            title="Создание роли"
            button={
                <Button auto onClick={createRoleHandler} loading={isLoading} levitation>
                    Создать
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

export default AdminCreateRole;
>>>>>>> c61da454dd30e7ca31637fe711cf5e35c92c2018
