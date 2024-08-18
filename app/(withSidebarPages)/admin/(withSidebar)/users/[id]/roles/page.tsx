'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import { useRoles } from '@/features/role';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';

const AdminUserByIdRoles = () => {
    const { id } = useParams();
    const { getPaginationRoles, assignRole } = useRoles();

    const { data, isPending, error } = useQuery({
        queryKey: ['roles'],
        queryFn: () => getPaginationRoles(0),
    });

    return <div className={base.baseWrapperGap16}>
        <div className={styles.rolesContent}>
            {data?.roles.map(data => <div key={data.id} className={styles.rolesItem}>
                <Text center>{data.role}</Text>

                <Button onClick={() => assignRole(String(id), data.id)}>Выдать роль</Button>
            </div>)}
        </div>
    </div>;
};

export default AdminUserByIdRoles;
