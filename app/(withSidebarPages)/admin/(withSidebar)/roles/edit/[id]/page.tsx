'use client';

import React, { Key } from 'react';
import { useParams } from 'next/navigation';
import { Checkbox, Tree } from 'antd';
import { Color } from 'antd/es/color-picker';
import { useRouter } from 'next/navigation';
import { TreeProps } from 'antd/lib';
import { useQuery } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';

import { Button } from '@/shared/ui/Button';
import { ColorPickerInput, Input } from '@/shared/ui/Input';
import { Preloader } from '@/shared/ui/Preloader';
import { usePermissions, useRoles } from '@/features/role';
import { CONFIG } from '@/shared/consts/CONFIG';
import { convertHexToOpacityHex } from '@/shared/utils/convertHexToOpacityHex';
import { TreePermission } from '../../create/page';
import { Permissions } from '@/entities/role';
import { RolePreview } from '@/shared/ui/Preview/RolePreview';
import { CreatePageWrapper } from '@/shared/wrappers/CreatePageWrapper';
import { NotContent } from '@/shared/ui/NotContent';
import { Cross } from '@/shared/icons';
import { PrivateWrapper } from '@/shared/wrappers/PrivateWrapper';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';

const AdminEditRole = () => {
    const { id } = useParams();
    const [name, setName] = React.useState('');

    const [textColor, setTextColor] = React.useState<string | Color>(CONFIG.BASE_COLOR);
    const [textColorFormatHex, setTextColorFormatHex] = React.useState<'hex' | 'rgb' | 'hsb' | undefined>('hex');

    const [backgroundColor, setBackgroundColor] = React.useState<string | Color>(CONFIG.BASE_COLOR_LIGHT);
    const [backgroundColorFormatHex, setBackgroundColorFormatHex] = React.useState<'hex' | 'rgb' | 'hsb' | undefined>(
        'hex',
    );

    const { editRole, getCurrentRole } = useRoles();
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

    const [backgroundColorAuto, setBackgroundColorAuto] = React.useState(false);

    const [currentPermissions, setCurrentPermissions] = React.useState<TreePermission[]>([]);
    const [permission, setPermission] = React.useState<Key[]>([]);
    const [permissionHalf, setPermissionHalf] = React.useState<Key[]>([]);

    const {
        data,
        isLoading: roleIsLoading,
        isError,
    } = useQuery({
        queryKey: ['role_by_id', id],
        queryFn: () => getCurrentRole(String(id)),
        enabled: !!id,
    });

    const {
        data: permissions,
        isLoading: permissionsIsLoading,
        isError: permissionsError,
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

    React.useEffect(() => {
        if (!permissions || permissions.length === 0) {
            return;
        }

        const formattedPermissions = formatArrayToTree(permissions);
        setCurrentPermissions(formattedPermissions);
    }, [permissions]);

    React.useEffect(() => {
        if (data) {
            const { role: roleName, textColor, backgroundColor, permissions } = data;

            setName(roleName);
            setTextColor(textColor);
            setBackgroundColor(backgroundColor);

            const perm = permissions.filter((data) => data.isActive).map((data) => data.id.toString());
            const permHalf = permissions.filter((data) => !data.isActive).map((data) => data.id.toString());
            setPermission(perm);
            setPermissionHalf(permHalf);
        }
    }, [data]);

    if (roleIsLoading || permissionsIsLoading) {
        return <Preloader page />;
    }

    if (isError) {
        return <NotContent text="Ошибка при загрузке данных" icon={<Cross />} danger />;
    }

    return (
        <PrivateWrapper permissions={[PERMISSIONS.UPDATE_ROLES]}>
            <CreatePageWrapper
                title="Редактирование роли"
                button={
                    <Button auto onClick={editRoleHandler} levitation>
                        Сохранить
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

                    {permissionsError ? (
                        <NotContent text="Ошибка загрузки прав доступа" danger icon={<Cross />} />
                    ) : (
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
                    )}
                </div>
            </CreatePageWrapper>
        </PrivateWrapper>
    );
};

export default AdminEditRole;
