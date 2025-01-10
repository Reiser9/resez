'use client';

import React from 'react';
import { Tooltip } from 'antd';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';

import { checkPermission } from '@/shared/utils/checkPermissions';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { Cross, Plus } from '@/shared/icons';
import { useUserPermissions } from '@/features/user';
import { useTaskSource } from '@/features/task-source';
import { SourceItem } from '@/entities/task-source/ui';

import { PrivateWrapper } from '@/shared/wrappers/PrivateWrapper';
import { NotContent } from '@/shared/ui/NotContent';
import { IconButton, ReloadButton } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { Preloader } from '@/shared/ui/Preloader';

const AdminSources = () => {
    const { getUserPermissions } = useUserPermissions();

    const { data: permissions } = useQuery({
        queryKey: ['user_permissions'],
        queryFn: getUserPermissions,
    });

    const queryClient = useQueryClient();
    const { getSources, deleteSource } = useTaskSource();

    const revalidateSources = () => {
        queryClient.invalidateQueries({ queryKey: ['sources'] });
    };

    const resetRequest = () => {
        queryClient.resetQueries({ queryKey: ['sources'] });
    };

    const { data, isPending, isError } = useQuery({
        queryKey: ['sources'],
        queryFn: getSources,
    });

    return (
        <PrivateWrapper permissions={[PERMISSIONS.TASKS]}>
            <div className={base.baseWrapperGap16}>
                <div className={base.titleInner}>
                    <div className={base.titleWrapper}>
                        <Text variant="h3">
                            Источники {!isError && !isPending && !!data?.length && `(${data.length})`}
                        </Text>

                        <ReloadButton onClick={resetRequest} disabled={isPending} />
                    </div>

                    {checkPermission(permissions || [], [PERMISSIONS.TASKS]) && (
                        <Tooltip destroyTooltipOnHide title="Создать">
                            <IconButton href="sources/create" variant="light" small circle>
                                <Plus />
                            </IconButton>
                        </Tooltip>
                    )}
                </div>

                {isPending ? (
                    <Preloader small page />
                ) : isError ? (
                    <NotContent text="Произошла ошибка при загрузке данных" icon={<Cross />} danger />
                ) : data?.length ? (
                    <div className={base.contentItems}>
                        {data.map((source) => (
                            <SourceItem
                                key={source.id}
                                data={source}
                                edit={checkPermission(permissions || [], [PERMISSIONS.TASKS])}
                                remove={checkPermission(permissions || [], [PERMISSIONS.TASKS])}
                                removeCallback={() => deleteSource(source.id, revalidateSources)}
                            />
                        ))}
                    </div>
                ) : (
                    <NotContent text="Источников не найдено" />
                )}
            </div>
        </PrivateWrapper>
    );
};

export default AdminSources;
