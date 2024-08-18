'use client';

import React, { Key } from 'react';
import { Checkbox, Tree } from 'antd';
import { useRouter } from 'next/navigation';
import { Color } from 'antd/es/color-picker';
import { TreeProps } from 'antd/lib';
import { useQuery } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';

import { CONFIG } from '@/shared/consts/CONFIG';
import { convertHexToOpacityHex } from '@/shared/utils/convertHexToOpacityHex';
import { usePermissions, useRoles } from '@/features/role';
import type { Permissions } from '@/entities/role';
import RolePreview from '@/shared/ui/Preview/RolePreview/RolePreview';
import { CreatePageWrapper } from '@/shared/wrappers/CreatePageWrapper';
import { PrivateWrapper } from '@/shared/wrappers/PrivateWrapper';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';

import { Button } from '@/shared/ui/Button';
import { ColorPickerInput, Input } from '@/shared/ui/Input';
import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';
import { Cross } from '@/shared/icons';

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
    const { getAllPermissions } = usePermissions();
    const router = useRouter();

    const textHexString = React.useMemo(
        () => (typeof textColor === 'string' ? textColor : textColor.toHexString()),
        [textColor],
    );
    const backgroundHexString = React.useMemo(
        () => (typeof backgroundColor === 'string' ? backgroundColor : backgroundColor.toHexString()),
        [backgroundColor],
    );

    const [backgroundColorAuto, setBackgroundColorAuto] = React.useState(true);

    const [currentPermissions, setCurrentPermissions] = React.useState<TreePermission[]>([]);
    const [permission, setPermission] = React.useState<Key[]>([]);
    const [permissionHalf, setPermissionHalf] = React.useState<Key[]>([]);

    const {
        data: permissions,
        isLoading: permissionsIsLoading,
        error: permissionsError,
    } = useQuery({
        queryKey: ['permissions'],
        queryFn: getAllPermissions,
    });

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
        if (!permissions || permissions.length === 0) {
            return;
        }

        const formattedPermissions = formatArrayToTree(permissions);
        setCurrentPermissions(formattedPermissions);
    }, [permissions]);

    return (
        <PrivateWrapper permissions={[PERMISSIONS.CREATE_ROLES]}>
            <CreatePageWrapper
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
                        backgroundColor={
                            backgroundColorAuto ? convertHexToOpacityHex(textHexString) : backgroundHexString
                        }
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
                        {permissionsIsLoading ? (
                            <Preloader small page />
                        ) : permissionsError ? (
                            <NotContent text="Ошибка загрузки привилегий" danger icon={<Cross />} />
                        ) : (
                            <Tree
                                selectable={false}
                                checkable
                                defaultExpandAll
                                onCheck={onCheckPermission}
                                checkedKeys={permission}
                                treeData={currentPermissions}
                            />
                        )}
                    </div>
                </div>
            </CreatePageWrapper>
        </PrivateWrapper>
    );
};

export default AdminCreateRole;
