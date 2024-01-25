'use client';

import React from 'react';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { Text } from '@/shared/ui/Text';
import { ReloadButton } from '@/shared/ui/Button';
import { Lvl10, Lvl100, Lvl20, Lvl30, Lvl5, Lvl50, Lvl75, Task10 } from '@/shared/icons';
import { AchievementItem } from '@/shared/ui/AchievementItem';

const ProfileAchievements = () => {
    return (
        <div className={base.baseWrapperGap16}>
            <div className={base.titleInner}>
                <Text variant="h3">Достижения (23)</Text>

                <ReloadButton />
            </div>

            <div className={styles.achievementContent}>
                <AchievementItem
                    title="Первая пятерка"
                    progress={1}
                    endValue={5}
                    description="Достигните 5 уровна аккаунта"
                    icon={<Lvl5 />}
                    reward="Опыт - 25"
                    done
                />

                <AchievementItem
                    title="Первая пятерка"
                    progress={1}
                    endValue={5}
                    description="Достигните 10 уровна аккаунта"
                    icon={<Lvl10 />}
                    reward="Опыт - 25"
                    done
                />

                <AchievementItem
                    title="Первая пятерка"
                    progress={1}
                    endValue={5}
                    description="Достигните 20 уровна аккаунта"
                    icon={<Lvl20 />}
                    reward="Опыт - 25"
                    done
                />

                <AchievementItem
                    title="Первая пятерка"
                    progress={1}
                    endValue={5}
                    description="Достигните 30 уровна аккаунта"
                    icon={<Lvl30 />}
                    reward="Опыт - 25"
                    done
                />

                <AchievementItem
                    title="Первая пятерка"
                    progress={1}
                    endValue={5}
                    description="Достигните 50 уровна аккаунта"
                    icon={<Lvl50 />}
                    reward="Опыт - 25"
                    done
                />

                <AchievementItem
                    title="Первая пятерка"
                    progress={1}
                    endValue={5}
                    description="Достигните 75 уровна аккаунта"
                    icon={<Lvl75 />}
                    reward="Опыт - 25"
                    done
                />

                <AchievementItem
                    title="Первая пятерка"
                    progress={1}
                    endValue={5}
                    description="Достигните 100 уровна аккаунта"
                    icon={<Lvl100 />}
                    reward="Опыт - 25"
                    done
                />

                <AchievementItem
                    title="Первая десятка"
                    progress={10}
                    endValue={10}
                    description="Решите 10 заданий из любого раздела"
                    icon={<Task10 />}
                    reward="Опыт - 25"
                />
            </div>
        </div>
    );
};

export default ProfileAchievements;
