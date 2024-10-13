'use client';

import React from 'react';
import Link from 'next/link';
import { Tooltip } from 'antd';
import dynamic from 'next/dynamic';
import cn from 'classnames';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import { IconButton } from '@/shared/ui/Button';
import { Swap } from '@/shared/icons';
import { Preloader } from '@/shared/ui/Preloader';
import { Text } from '@/shared/ui/Text';

const CustomHtmlParser = dynamic(() => import('@/shared/ui/CustomHtmlParser/CustomHtmlParser'), {
    ssr: false,
    loading: () => <Preloader small page />,
});

type Props = {
    data: any;
};

const TestQuestionItem: React.FC<Props> = ({ data }) => {
    const { id, number, theme, subTheme, task } = data || {};

    return (
        <div className={styles.testQuestionItem}>
            <div className={base.titleInnerNowrap}>
                <Link prefetch={false} href={`/task/${id}`} className={styles.taskItemWrapper}>
                    <span className={base.circle32}>{number}</span>

                    <Text variant="h4">Задание</Text>

                    {theme && <p className={styles.testQuestionTheme}>{theme}</p>}

                    {subTheme && <p className={styles.testQuestionTheme}>{subTheme}</p>}
                </Link>

                <Tooltip title="Заменить">
                    <IconButton small variant="light" disabled>
                        <Swap />
                    </IconButton>
                </Tooltip>
            </div>

            {task && (
                <div className={cn(base.format, styles.testQuestionTask)}>
                    <CustomHtmlParser html={task} />
                </div>
            )}
        </div>
    );
};

export default TestQuestionItem;
