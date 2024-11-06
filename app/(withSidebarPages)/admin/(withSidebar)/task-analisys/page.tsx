'use client';

import React from 'react';
import { Tooltip } from 'antd';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import { PrivateWrapper } from '@/shared/wrappers/PrivateWrapper';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { checkPermission } from '@/shared/utils/checkPermissions';
import { Filter, Plus } from '@/shared/icons';

import { Text } from '@/shared/ui/Text';
import { NotContent } from '@/shared/ui/NotContent';
import { Button, IconButton, ReloadButton } from '@/shared/ui/Button';

const AdminTaskAnalisys = () => {
    return (
        <PrivateWrapper permissions={[PERMISSIONS.TASKS]}>
            <div className={base.baseWrapperGap16}>
                <div className={base.titleInner}>
                    <div className={base.titleWrapper}>
                        <Text variant="h3">
                            Разбор заданий{' '}
                            {/* {!isError &&
                                !isPending &&
                                !!data?.pages[0]?.totalCount &&
                                `(${data?.pages[0]?.totalCount})`} */}
                        </Text>

                        {/* <ReloadButton onClick={resetRequest} disabled={isPending} /> */}
                    </div>

                    <div className={base.titleWrapper}>
                        {/* <IconButton small variant="light" onClick={() => setTasksFilter(true)}>
                            <Filter />
                        </IconButton> */}

                        <Tooltip title="Создать">
                            <IconButton small variant="light" href="/admin/task-analisys/create" circle>
                                <Plus />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>

                {/* {isPending ? (
                    <div className={base.contentItems}>
                        {[...Array(3)].map((_, id) => (
                            <TaskItemSkeleton key={id} />
                        ))}
                    </div>
                ) : isError ? (
                    <NotContent text="Ошибка при загрузке заданий" icon={<Cross />} danger />
                ) : data.pages[0]?.totalCount ? (
                    <div className={cn(base.baseWrapperGap16, base.aic)}>
                        <div className={base.contentItems}>
                            {data?.pages.map((task) =>
                                task?.tasks.map((data) => (
                                    <TaskItem
                                        key={data.id}
                                        data={data}
                                        href={`/admin/task/${data.id}`}
                                        edit={checkPermission(permissions || [], [PERMISSIONS.UPDATE_TASKS])}
                                        remove={checkPermission(permissions || [], [PERMISSIONS.DELETE_TASKS])}
                                        archiveCallback={() => archiveTask(data.id, revalidateRequest)}
                                        toggleVerify={() => toggleVerifyHandler(data.id)}
                                        verify={checkPermission(permissions || [], [PERMISSIONS.VERIFY_TASKS])}
                                    />
                                )),
                            )}
                        </div>

                        {!isError && hasNextPage && (
                            <Button
                                auto
                                onClick={fetchNextPage}
                                loading={isFetchingNextPage}
                                className={base.buttonShowMore}
                            >
                                Показать еще
                            </Button>
                        )}
                    </div>
                ) : (
                    <NotContent text="Заданий не найдено" />
                )} */}
            </div> 

            {/* <TasksFilter
                filterOpen={tasksFilter}
                setFilterOpen={setTasksFilter}
                subjectId={subjectId}
                themeId={subjectTaskId}
                subThemeId={subThemeId}
                userId={userId}
                isVerified={isVerified}
            /> */}
        </PrivateWrapper>
    );
};

export default AdminTaskAnalisys;
