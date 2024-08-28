'use client';

import React from 'react';
import cn from 'classnames';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { Tooltip } from 'antd';

import base from '@/shared/styles/base.module.scss';

import type { SubjectDTO, SubjectSubThemeDTO, SubjectTaskDTO } from '@/entities/subject';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { Cross, Filter, Plus } from '@/shared/icons';
import { checkPermission } from '@/shared/utils/checkPermissions';
import { useTask } from '@/features/task';
import TaskItem from '@/entities/task/ui/TaskItem';
import { useSubjects } from '@/features/subjects';
import { buildQueryString } from '@/shared/utils/buildQueryString';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { useUserPermissions, useUsers } from '@/features/user';
import { PrivateWrapper } from '@/shared/wrappers/PrivateWrapper';

import { Text } from '@/shared/ui/Text';
import { Button, IconButton, ReloadButton } from '@/shared/ui/Button';
import { NotContent } from '@/shared/ui/NotContent';
import { Select } from '@/shared/ui/Select';
import { Modal } from '@/shared/ui/Modal';
import { TaskItemSkeleton } from '@/shared/ui/Skeleton';
import { Badge } from '@/shared/ui/Badge';

const AdminTasks = () => {
    const [tasksFilter, setTasksFilter] = React.useState(false);

    const [subject, setSubject] = React.useState<string | null>(null);
    const [theme, setTheme] = React.useState<string | null>(null);
    const [subTheme, setSubTheme] = React.useState<string | null>(null);
    const [user, setUser] = React.useState<string | null>(null);
    const [verify, setVerify] = React.useState<string | null>(null);
    const [searchValue, setSearchValue] = React.useState('');

    const [subjects, setSubjects] = React.useState<SubjectDTO[]>([]);
    const [subjectsFilter, setSubjectsFilter] = React.useState<SubjectDTO[]>([]);
    const [themes, setThemes] = React.useState<SubjectTaskDTO[]>([]);
    const [themesFilter, setThemesFilter] = React.useState<SubjectTaskDTO[]>([]);
    const [subThemes, setSubThemes] = React.useState<SubjectSubThemeDTO[]>([]);
    const [subThemesFilter, setSubThemesFilter] = React.useState<SubjectSubThemeDTO[]>([]);
    const userSearchDebounce = useDebounce(searchValue, 500);

    const { getUserPermissions } = useUserPermissions();

    const {
        data: permissions,
        isLoading: permissionsIsLoading,
        error: permissionsError,
    } = useQuery({
        queryKey: ['user_permissions'],
        queryFn: getUserPermissions,
    });

    const searchParams = useSearchParams();
    const router = useRouter();
    const subjectId = searchParams.get('subject_id');
    const subjectTaskId = searchParams.get('subject_task_id');
    const subThemeId = searchParams.get('subTheme_id');
    const isVerified = searchParams.get('is_verified');
    const userId = searchParams.get('user_id');

    const queryClient = useQueryClient();
    const { getPagginationTasks, archiveTask, toggleVerify } = useTask();
    const { getPagginationSubjects, getSubjectThemes, getSubjectSubThemes } = useSubjects();
    const { getPaginationUsersShort } = useUsers();

    const revalidateRequest = () => {
        queryClient.invalidateQueries({
            queryKey: ['tasks', subjectId, subjectTaskId, subThemeId, userId, isVerified],
        });
    };

    const resetRequest = () => {
        queryClient.resetQueries({ queryKey: ['tasks', subjectId, subjectTaskId, subThemeId, userId, isVerified] });
    };

    const { data, isPending, isError, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['tasks', subjectId, subjectTaskId, subThemeId, userId, isVerified],
        queryFn: (pageParam) =>
            getPagginationTasks(
                pageParam.pageParam,
                subjectId || '',
                subjectTaskId || '',
                subThemeId || '',
                userId || '',
                isVerified || '',
            ),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = !lastPage?.isLast ? allPages?.length : undefined;

            return nextPage;
        },
    });

    const {
        data: subjectsData,
        isLoading: subjectsIsLoading,
        isError: subjectsError,
    } = useQuery({
        queryKey: ['subjects'],
        queryFn: () => getPagginationSubjects(0, 9999),
        enabled: checkPermission(permissions || [], [PERMISSIONS.SUBJECTS]),
    });

    const {
        data: themesData,
        isLoading: themesIsLoading,
        isError: themesError,
    } = useQuery({
        queryKey: ['themes', subject],
        queryFn: () => getSubjectThemes(String(subject)),
        enabled: !!subject && checkPermission(permissions || [], [PERMISSIONS.SUBJECTS]),
    });

    const {
        data: subThemesData,
        isLoading: subThemesIsLoading,
        isError: subThemesError,
    } = useQuery({
        queryKey: ['subthemes', theme],
        queryFn: () => getSubjectSubThemes(String(theme)),
        enabled: !!theme && checkPermission(permissions || [], [PERMISSIONS.SUBJECTS]),
    });

    const {
        data: users,
        isPending: usersIsLoading,
        isError: usersError,
    } = useQuery({
        queryKey: ['users_short_search', userSearchDebounce],
        queryFn: () => getPaginationUsersShort(0, userSearchDebounce),
        enabled: checkPermission(permissions || [], [PERMISSIONS.USERS]),
    });

    const toggleVerifyHandler = (id: number) => {
        toggleVerify(id, revalidateRequest);
    };

    const handleSearchSubject = (value: string) => {
        const filteredOptions = subjects.filter((subject) =>
            subject.subject.toLowerCase().includes(value.toLowerCase()),
        );

        setSubjectsFilter(filteredOptions);
    };

    const handleSearchThemes = (value: string) => {
        const filteredOptions = themes.filter((theme) => {
            const themeTemp = `${theme.number}. ${theme.theme}`;
            return themeTemp.toLowerCase().includes(value.toLowerCase());
        });

        setThemesFilter(filteredOptions);
    };

    const handleSearchSubThemes = (value: string) => {
        const filteredOptions = subThemes.filter((subTheme) =>
            subTheme.subTheme.toLowerCase().includes(value.toLowerCase()),
        );

        setSubThemesFilter(filteredOptions);
    };

    const resetFilter = () => {
        setSubject('');
        setTheme('');
        setSubTheme('');
        setUser('');
        setVerify('');
        setTasksFilter(false);
        router.replace('/admin/tasks');
    };

    const applyFilters = () => {
        const newUrl = buildQueryString({
            subject_id: subject,
            subject_task_id: theme,
            subTheme_id: subTheme,
            is_verified: verify,
            user_id: user,
        });
        router.replace(`?${newUrl}`);
        setTasksFilter(false);
    };

    React.useEffect(() => {
        if (subjectsData) {
            setSubjects(subjectsData.subjects);
            setSubjectsFilter(subjectsData.subjects);
        }
    }, [subjectsData]);

    React.useEffect(() => {
        if (themesData) {
            setThemes(themesData);
            setThemesFilter(themesData);
        }
    }, [themesData]);

    React.useEffect(() => {
        if (subThemesData) {
            setSubThemes(subThemesData);
            setSubThemesFilter(subThemesData);
        }
    }, [subThemesData]);

    React.useEffect(() => {
        if (subjectId) {
            setSubject(subjectId);
        }
    }, [subjectId]);

    React.useEffect(() => {
        if (subjectTaskId) {
            setTheme(subjectTaskId);
        }
    }, [subjectTaskId]);

    React.useEffect(() => {
        if (subThemeId) {
            setSubTheme(subThemeId);
        }
    }, [subThemeId]);

    React.useEffect(() => {
        if (isVerified) {
            setVerify(isVerified);
        }
    }, [isVerified]);

    React.useEffect(() => {
        if (userId) {
            setUser(userId);
        }
    }, [userId]);

    return (
        <PrivateWrapper permissions={[PERMISSIONS.TASKS]}>
            <div className={base.baseWrapperGap16}>
                <div className={base.titleInner}>
                    <div className={base.titleWrapper}>
                        <Text variant="h3">
                            Задания{' '}
                            {!isError &&
                                !isPending &&
                                !!data?.pages[0]?.totalCount &&
                                `(${data?.pages[0]?.totalCount})`}
                        </Text>

                        <ReloadButton onClick={resetRequest} disabled={isPending} />
                    </div>

                    <div className={base.titleWrapper}>
                        <IconButton small variant="light" onClick={() => setTasksFilter(true)}>
                            <Filter />
                        </IconButton>

                        {checkPermission(permissions || [], [PERMISSIONS.CREATE_TASKS]) && (
                            <Tooltip title="Создать">
                                <IconButton small variant="light" href="/admin/tasks/create" circle>
                                    <Plus />
                                </IconButton>
                            </Tooltip>
                        )}
                    </div>
                </div>

                {isPending ? (
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

                        {hasNextPage && (
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
                )}
            </div>

            <Modal value={tasksFilter} setValue={setTasksFilter} title="Фильтры" size="small">
                <Select
                    title="Предмет"
                    notContentText="Предметов не найдено"
                    loading={subjectsIsLoading}
                    value={subject}
                    onChange={(value) => {
                        setSubject(value);
                        setSubjectsFilter(subjects);
                        setTheme(null);
                        setSubTheme(null);
                    }}
                    clear
                    options={subjectsFilter?.map((data) => ({
                        label: data.subject,
                        value: String(data.id),
                    }))}
                    showSearch
                    onSearch={handleSearchSubject}
                    filterOption={false}
                />

                {subject && (
                    <Select
                        title="Задание"
                        notContentText="Заданий не найдено"
                        loading={themesIsLoading}
                        value={theme}
                        onChange={(value) => {
                            setTheme(value);
                            setThemesFilter(themes);
                            setSubTheme(null);
                        }}
                        clear
                        options={themesFilter?.map((data) => ({
                            label: `${data.number}. ${data.theme}`,
                            value: String(data.id),
                        }))}
                        showSearch
                        onSearch={handleSearchThemes}
                        filterOption={false}
                    />
                )}

                {theme && (
                    <Select
                        title="Тема"
                        notContentText="Тем не найдено"
                        loading={subThemesIsLoading}
                        value={subTheme}
                        onChange={(value) => {
                            setSubTheme(value);
                            setSubThemesFilter(subThemes);
                        }}
                        clear
                        options={subThemesFilter?.map((data) => ({
                            label: data.subTheme,
                            value: String(data.id),
                        }))}
                        showSearch
                        onSearch={handleSearchSubThemes}
                        filterOption={false}
                    />
                )}

                {checkPermission(permissions || [], [PERMISSIONS.USERS]) && (
                    <Select
                        title="Пользователь"
                        loading={usersIsLoading}
                        showSearch
                        notContentText="Пользователей не найдено"
                        onSearch={(value) => setSearchValue(value.trim())}
                        onChange={(value) => setUser(value)}
                        onClear={() => setSearchValue('')}
                        filterOption={false}
                        value={user}
                        clear
                        options={users?.users.map((data) => ({
                            label: data.nickname,
                            value: String(data.id),
                            id: `ID: ${data.id}`,
                            avatar: data.avatar,
                        }))}
                        optionRender={({ data }) => (
                            <div className={base.userSelectOption}>
                                <div className={base.titleWrapper}>
                                    <Badge image={data.avatar} text={data.label} size="small" />

                                    <Text variant="text2">{data.label}</Text>
                                </div>

                                <Text variant="text2" fontWeight={600}>
                                    {data.id}
                                </Text>
                            </div>
                        )}
                    />
                )}

                <Select
                    title="Проверенные"
                    onChange={(value) => setVerify(value)}
                    value={verify}
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

                <Button variant="light" color="danger" onClick={resetFilter}>
                    Сбросить
                </Button>

                <Button onClick={applyFilters}>Применить</Button>
            </Modal>
        </PrivateWrapper>
    );
};

export default AdminTasks;
