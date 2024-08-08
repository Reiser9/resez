'use client';

import React from 'react';
import cn from 'classnames';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';

import base from '@/shared/styles/base.module.scss';

import { Text } from '@/shared/ui/Text';
import { Button, IconButton, ReloadButton } from '@/shared/ui/Button';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { Tooltip } from 'antd';
import { Cross, Filter, Plus } from '@/shared/icons';
import { checkPermission } from '@/shared/utils/checkPermissions';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { NotContent } from '@/shared/ui/NotContent';
import { useTask } from '@/features/task';
import TaskItem from '@/entities/task/ui/TaskItem';
import { TaskItemSkeleton } from '@/shared/ui/Skeleton';
import { Select } from '@/shared/ui/Select';
import { Modal } from '@/shared/ui/Modal';
import { useSubjects } from '@/features/subjects';
import { SubjectDTO, SubjectSubThemeDTO, SubjectTaskDTO } from '@/entities/subject';
import { buildQueryString } from '@/shared/utils/buildQueryString';

const AdminTests = () => {
    const [tasksFilter, setTasksFilter] = React.useState(false);

    const [subject, setSubject] = React.useState<string | null>(null);
    const [theme, setTheme] = React.useState<string | null>(null);
    const [subTheme, setSubTheme] = React.useState<string | null>(null);
    const [user, setUser] = React.useState<string | null>(null);
    const [verify, setVerify] = React.useState<string | null>(null);
    const [userSelectOpen, setUserSelectOpen] = React.useState(false);
    const [userOptions, setUserOptions] = React.useState([]);
    const [userSearchValue, setUserSearchValue] = React.useState('');

    const [subjects, setSubjects] = React.useState<SubjectDTO[]>([]);
    const [subjectsFilter, setSubjectsFilter] = React.useState<SubjectDTO[]>([]);
    const [themes, setThemes] = React.useState<SubjectTaskDTO[]>([]);
    const [themesFilter, setThemesFilter] = React.useState<SubjectTaskDTO[]>([]);
    const [subThemes, setSubThemes] = React.useState<SubjectSubThemeDTO[]>([]);
    const [subThemesFilter, setSubThemesFilter] = React.useState<SubjectSubThemeDTO[]>([]);

    const permissions = useAppSelector((state) => state.user.user?.permissions);

    const searchParams = useSearchParams();
    const router = useRouter();
    const subjectId = searchParams.get('subject_id');
    const subjectTaskId = searchParams.get('subject_task_id');
    const subThemeId = searchParams.get('subTheme_id');
    const isVerified = searchParams.get('is_verified');

    const queryClient = useQueryClient();
    const { getPagginationTasks, archiveTask, toggleVerify } = useTask();
    const { getPagginationSubjects, getSubjectThemes, getSubjectSubThemes } = useSubjects();

    const revalidateRequest = () => {
        queryClient.invalidateQueries({ queryKey: ['tasks', subjectId, subjectTaskId, subThemeId, isVerified] });
    };

    const resetRequest = () => {
        queryClient.resetQueries({ queryKey: ['tasks', subjectId, subjectTaskId, subThemeId, isVerified] });
    };

    const { data, isPending, error, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['tasks', subjectId, subjectTaskId, subThemeId, isVerified],
        queryFn: (pageParam) =>
            getPagginationTasks(
                pageParam.pageParam,
                subjectId || '',
                subjectTaskId || '',
                subThemeId || '',
                '',
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
        error: subjectsError,
    } = useQuery({
        queryKey: ['subjects'],
        queryFn: () => getPagginationSubjects(0, 9999),
    });

    const {
        data: themesData,
        isLoading: themesIsLoading,
        error: themesError,
    } = useQuery({
        queryKey: ['themes', subject],
        queryFn: () => getSubjectThemes(String(subject)),
        enabled: !!subject,
    });

    const {
        data: subThemesData,
        isLoading: subThemesIsLoading,
        error: subThemesError,
    } = useQuery({
        queryKey: ['subthemes', theme],
        queryFn: () => getSubjectSubThemes(String(theme)),
        enabled: !!theme,
    });

    const toggleVerifyHandler = (id: number) => {
        toggleVerify(id, revalidateRequest);
    };

    const searchUsersHandler = () => {
        setUserOptions([]);
        // searchUsers(userSearchValue, true).then(users => {
        //     if(!users){
        //         return;
        //     }

        //     setUserOptions(users.users);
        // });
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
            // user_id: userId,
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

    return (
        <>
            <div className={base.baseWrapperGap16}>
                <div className={base.titleInner}>
                    <div className={base.titleWrapper}>
                        <Text variant="h3">
                            Задания{' '}
                            {!error && !isPending && !!data?.pages[0]?.totalCount && `(${data?.pages[0]?.totalCount})`}
                        </Text>

                        <ReloadButton onClick={resetRequest} disabled={isPending} />
                    </div>

                    <div className={base.titleWrapper}>
                        <IconButton small variant="light" onClick={() => setTasksFilter(true)}>
                            <Filter />
                        </IconButton>

                        {checkPermission(permissions, [PERMISSIONS.CREATE_TASKS]) && (
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
                ) : error ? (
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
                                        // loading={subjectIsLoading.includes(data.id)}
                                        edit={checkPermission(permissions, [PERMISSIONS.UPDATE_SUBJECTS])}
                                        remove={checkPermission(permissions, [PERMISSIONS.DELETE_SUBJECTS])}
                                        archiveCallback={() => archiveTask(data.id, revalidateRequest)}
                                        toggleVerify={() => toggleVerifyHandler(data.id)}
                                        verify={checkPermission(permissions, [PERMISSIONS.VERIFY_TASKS])}
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
                    options={subjectsFilter?.map((data) => {
                        return {
                            label: data.subject,
                            value: String(data.id),
                        };
                    })}
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
                        options={themesFilter?.map((data) => {
                            return {
                                label: `${data.number}. ${data.theme}`,
                                value: String(data.id),
                            };
                        })}
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
                        options={subThemesFilter?.map((data) => {
                            return {
                                label: data.subTheme,
                                value: String(data.id),
                            };
                        })}
                        showSearch
                        onSearch={handleSearchSubThemes}
                        filterOption={false}
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

                {/* <Select
                    title="Пользователь"
                    // loading={searchUsersLoading}
                    showSearch
                    notContentText="Пользователей не найдено"
                    onSearch={(value) => setUserSearchValue(value.trim())}
                    // onDropdownVisibleChange={dropdownUsers}
                    onChange={(value) => setUser(value)}
                    filterOption={false}
                    value={user}
                    clear
                    options={userOptions.map((data) => {
                        return {
                            label: data.nickname,
                            value: data.id,
                        };
                    })}
                /> */}

                <Button variant="light" color="danger" onClick={resetFilter}>
                    Сбросить
                </Button>

                <Button onClick={applyFilters}>Применить</Button>
            </Modal>
        </>
    );
};

export default AdminTests;
