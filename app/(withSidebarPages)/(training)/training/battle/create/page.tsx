'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Checkbox } from 'antd';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Dayjs } from 'dayjs';

import base from '@/shared/styles/base.module.scss';

import { useBattle } from '@/features/battle';
import { AuthWrapper } from '@/shared/wrappers/AuthWrapper';
import { CreatePageWrapper } from '@/shared/wrappers/CreatePageWrapper';
import { useCollections } from '@/features/collection';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { useDebounce } from '@/shared/hooks/useDebounce';

import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Select } from '@/shared/ui/Select';
import { TimePicker } from '@/shared/ui/TimePicker';
import { CollectionOption } from '@/shared/ui/OptionComponents';

const BattleCreate = () => {
    const isAuth = useAppSelector((state) => state.user.isAuth);
    const [createBattleIsLoading, setCreateBattleIsLoading] = React.useState(false);

    const [collectionId, setCollectionId] = React.useState<number | null>(null);
    const [usersCount, setUsersCount] = React.useState('');
    const [tasksCount, setTasksCount] = React.useState('');
    const [isPrivate, setIsPrivate] = React.useState(false);
    const [time, setTime] = React.useState<Dayjs | null>(null);

    const [searchValue, setSearchValue] = React.useState('');
    const debounceSearch = useDebounce(searchValue, 500);

    const router = useRouter();
    const { createBattle } = useBattle();
    const { getPaginationCollections } = useCollections();

    const { data, isPending, isError } = useInfiniteQuery({
        queryKey: ['collections', debounceSearch],
        queryFn: (param) => getPaginationCollections(param.pageParam, debounceSearch),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = !lastPage?.isLast ? allPages.length : undefined;

            return nextPage;
        },
        enabled: isAuth,
    });

    const createBattleHandler = async () => {
        setCreateBattleIsLoading(true);
        const battleId = await createBattle(usersCount, isPrivate).finally(() => {
            setCreateBattleIsLoading(false);
        });

        if (!battleId) return;

        router.replace(`/battle/${battleId}`);
    };

    return (
        <AuthWrapper>
            <CreatePageWrapper
                title="Создание битвы"
                button={
                    <Button auto levitation onClick={createBattleHandler} loading={createBattleIsLoading}>
                        Создать
                    </Button>
                }
            >
                <div className={base.form}>
                    <Select
                        title="Коллекция"
                        notContentText="Коллекций не найдено"
                        loading={isPending}
                        error={isError}
                        value={collectionId}
                        onChange={(value) => setCollectionId(value)}
                        options={data?.pages[0]?.collections.map((data) => ({
                            label: data.collection,
                            value: data.id,
                            pairs: data.pairsCount,
                        }))}
                        optionRender={({ data }) => {
                            const { label, pairs } = data || {};

                            return <CollectionOption name={label} pairs={pairs} />;
                        }}
                        showSearch
                        onSearch={(value) => setSearchValue(value)}
                        filterOption={false}
                    />

                    <Input title="Количество заданий" type="number" value={tasksCount} setValue={setTasksCount} />

                    <Input title="Количество участников" type="number" value={usersCount} setValue={setUsersCount} />

                    <TimePicker
                        title="Время на решение (часы:минуты:секунды)"
                        value={time}
                        setValue={setTime}
                        showNow={false}
                        format="HH:mm:ss"
                    />

                    <Checkbox checked={isPrivate} onChange={(e) => setIsPrivate(e.target.checked)}>
                        Приватная битва
                    </Checkbox>
                </div>
            </CreatePageWrapper>
        </AuthWrapper>
    );
};

export default BattleCreate;
