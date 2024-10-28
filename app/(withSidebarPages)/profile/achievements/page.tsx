'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { useAchievement } from '@/features/user';

import { Text } from '@/shared/ui/Text';
import { AchievementItem } from '@/shared/ui/AchievementItem';
import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';
import { Trophy } from '@/shared/icons';

const ProfileAchievements = () => {
    const { getProfileAchievements } = useAchievement();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['profile_achievements'],
        queryFn: getProfileAchievements,
    });

    if (isLoading) {
        return <Preloader small page />;
    }

    return (
        <div className={base.baseWrapperGap16}>
            <Text variant="h3">Достижения {data?.totalCount && `(${data.totalCount})`}</Text>

            {data?.achievements?.map((data, id) => (
                <div key={id} className={base.baseWrapperGap8}>
                    <Text variant="h4" fontWeight={600}>
                        {data.type} {!!data.elements.length && `(${data.elements.length})`}
                    </Text>

                    {!!data.elements.length ? (
                        <div className={styles.achievementContent}>
                            {data.elements.map((elem) => (
                                <AchievementItem key={elem.id} data={elem} />
                            ))}
                        </div>
                    ) : (
                        <NotContent text="Достижений данного типа нет" icon={<Trophy />} />
                    )}
                </div>
            ))}
        </div>
    );
};

export default ProfileAchievements;
