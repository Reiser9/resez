'use client';

import React from 'react';
import { Checkbox } from 'antd';
import cn from 'classnames';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import { Text } from '@/shared/ui/Text';
import { IconButton } from '@/shared/ui/Button';
import { Minus, Plus } from '@/shared/icons';
import { Spoiler } from '@/shared/ui/Spoiler';
import { Input } from '@/shared/ui/Input';
import { SubjectTaskCreate } from '@/entities/subject';

type Props = {
    data: SubjectTaskCreate;
    // setSubThemes: any;
    // setCountTasks: any;
};

const GenerateTestItem: React.FC<Props> = ({ data }) => {
    const { number, id, subThemes, theme, tasksCount } = data || {};

    const [countTask, setCountTask] = React.useState(0);

    const decrementCount = () => {
        setCountTask((prev) => (prev <= 0 ? prev : Number(prev) - 1));
    };

    const incrementCount = () => {
        setCountTask((prev) => (prev >= tasksCount ? prev : Number(prev) + 1));
    };

    const changeCountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value === '') {
            return setCountTask(0);
        }

        if (Number(value) > tasksCount) {
            setCountTask(tasksCount);
        } else {
            setCountTask(Number(value));
        }
    };

    const chechedSubThemesHandler = (subThemeId: number) => {
        // setSubThemes(id, subThemeId);
    };

    React.useEffect(() => {
        // setCountTasks(id, countTask);
    }, [countTask]);

    return (
        <div
            className={cn(styles.generateFormItem, {
                [styles.disabled]: tasksCount === 0,
            })}
        >
            <div className={base.titleInner}>
                <Text variant="h4">{number} задание</Text>

                <div className={styles.generateFormItemCounter}>
                    <IconButton small variant="light" onClick={decrementCount} disabled={Number(countTask) === 0}>
                        <Minus />
                    </IconButton>

                    {/* <Input
                        className={styles.generateFormItemCount}
                        type="number"
                        value={String(countTask)}
                        setValue={setCountTask}
                    /> */}

                    <IconButton
                        small
                        variant="light"
                        onClick={incrementCount}
                        disabled={Number(countTask) === tasksCount}
                    >
                        <Plus />
                    </IconButton>
                </div>
            </div>

            <Spoiler title={`${theme} (${tasksCount})`} theme="white">
                <div className={styles.generateFormSubThemes}>
                    {subThemes?.map((data) => (
                        <Checkbox key={data.id} defaultChecked onChange={() => chechedSubThemesHandler(data.id)}>
                            {data.subTheme} ({data.tasksCount})
                        </Checkbox>
                    ))}
                </div>
            </Spoiler>
        </div>
    );
};

export default GenerateTestItem;
