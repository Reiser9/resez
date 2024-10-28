import React from 'react';
import { Checkbox } from 'antd';
import { useRouter } from 'next/navigation';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { checkPermission } from '@/shared/utils/checkPermissions';
import { buildQueryString } from '@/shared/utils/buildQueryString';
import { useUserPermissions } from '@/features/user';
import { useRoles } from '@/features/role';
import { useDebounce } from '@/shared/hooks/useDebounce';

import { Modal } from '@/shared/ui/Modal';
import { Select } from '@/shared/ui/Select';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';

type Props = {
    filterOpen: boolean;
    setFilterOpen: (value: boolean) => void;
    online: string | null;
    blocked: string | null;
    verified: string | null;
    isHasRole: string | null;
    role: string | null;
};

const UsersFilter: React.FC<Props> = ({ filterOpen, setFilterOpen, online, blocked, verified, isHasRole, role }) => {
    const router = useRouter();

    const { getUserPermissions } = useUserPermissions();
    const { getPaginationRoles } = useRoles();

    const [roleSearchValue, setRoleSearchValue] = React.useState('');
    const roleSearchDebounce = useDebounce(roleSearchValue, 500);

    const [onlyOnline, setOnlyOnline] = React.useState(false);
    const [isBlocked, setIsBlocked] = React.useState<string | null>(null);
    const [isVerify, setIsVerify] = React.useState<string | null>(null);
    const [hasRole, setHasRole] = React.useState(false);
    const [roleId, setRoleId] = React.useState<string | null>(null);

    const { data: permissions } = useQuery({
        queryKey: ['user_permissions'],
        queryFn: getUserPermissions,
    });

    const {
        data: roles,
        isPending: rolesIsLoading,
        isError: rolesIsErrror,
    } = useInfiniteQuery({
        queryKey: ['roles', roleSearchDebounce],
        queryFn: (param) => getPaginationRoles(param.pageParam, roleSearchDebounce),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = !lastPage?.isLast ? allPages.length : undefined;

            return nextPage;
        },
        enabled: checkPermission(permissions || [], [PERMISSIONS.ROLES]),
    });

    const resetFilter = () => {
        setOnlyOnline(false);
        setIsBlocked(null);
        setIsVerify(null);
        setHasRole(false);
        setRoleId(null);
        router.replace('/admin/users');
        setFilterOpen(false);
    };

    const applyFilters = () => {
        const newUrl = buildQueryString({
            online: onlyOnline || '',
            blocked: isBlocked,
            verified: isVerify,
            has_role: hasRole || '',
            role: hasRole ? roleId : '',
        });
        router.replace(`?${newUrl}`);
        setFilterOpen(false);
    };

    React.useEffect(() => {
        if (online && online === 'true') {
            setOnlyOnline(!!online);
        }
    }, [online]);

    React.useEffect(() => {
        if (blocked) {
            setIsBlocked(blocked);
        }
    }, [blocked]);

    React.useEffect(() => {
        if (verified) {
            setIsVerify(verified);
        }
    }, [verified]);

    React.useEffect(() => {
        if (isHasRole && isHasRole === 'true') {
            setHasRole(!!isHasRole);
        }
    }, [isHasRole]);

    React.useEffect(() => {
        if (role) {
            setRoleId(role);
        }
    }, [role]);

    return (
        <Modal value={filterOpen} setValue={setFilterOpen} title="Фильтры" size="small">
            <Checkbox checked={onlyOnline} onChange={(e) => setOnlyOnline(e.target.checked)}>
                Только онлайн пользователи
            </Checkbox>

            <Select
                title="Заблокирован"
                onChange={(value) => setIsBlocked(value)}
                value={isBlocked}
                clear
                options={[
                    {
                        label: 'Да',
                        value: 'true',
                    },
                    {
                        label: 'Нет',
                        value: 'false',
                    },
                ]}
            />

            <Select
                title="Верифицирован"
                onChange={(value) => setIsVerify(value)}
                value={isVerify}
                clear
                options={[
                    {
                        label: 'Да',
                        value: 'true',
                    },
                    {
                        label: 'Нет',
                        value: 'false',
                    },
                ]}
            />

            <Checkbox checked={hasRole} onChange={(e) => setHasRole(e.target.checked)}>
                Имеет роль
            </Checkbox>

            {checkPermission(permissions || [], [PERMISSIONS.ROLES]) && hasRole && (
                <Select
                    title="Роль"
                    onChange={(value) => setRoleId(value)}
                    onSearch={(value) => setRoleSearchValue(value.trim())}
                    value={roleId}
                    filterOption={false}
                    onClear={() => setRoleSearchValue('')}
                    showSearch
                    clear
                    loading={rolesIsLoading}
                    error={rolesIsErrror}
                    options={roles?.pages[0]?.roles.map((data) => ({
                        label: data.role,
                        value: String(data.id),
                        textColor: data.textColor,
                    }))}
                    optionRender={({ data }) => (
                        <Text style={{ color: data.textColor }} variant="text2">
                            {data.label}
                        </Text>
                    )}
                />
            )}

            <Button variant="light" color="danger" onClick={resetFilter}>
                Сбросить
            </Button>

            <Button onClick={applyFilters}>Применить</Button>
        </Modal>
    );
};

export default UsersFilter;
