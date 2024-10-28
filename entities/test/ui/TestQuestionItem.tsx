'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import cn from 'classnames';
import { Tooltip } from 'antd';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import type { TestTask } from '../model';
import { Swap } from '@/shared/icons';

import { IconButton } from '@/shared/ui/Button';
import { Preloader } from '@/shared/ui/Preloader';
import { Text } from '@/shared/ui/Text';
import { Modal } from '@/shared/ui/Modal';

const CustomHtmlParser = dynamic(() => import('@/shared/ui/CustomHtmlParser/CustomHtmlParser'), {
    ssr: false,
    loading: () => <Preloader small page />,
});

type Props = {
    data: TestTask;
    edit?: boolean;
    swapCallback?: () => void;
};

const TestQuestionItem: React.FC<Props> = ({ data, edit = false, swapCallback = () => {} }) => {
    const { id, subjectTask, task, subTheme } = data || {};
    const { subTheme: subThemeTask } = subTheme || {};
    const { theme, number } = subjectTask || {};

    return (
        <div className={styles.testQuestionItem}>
            <div className={base.titleInnerNowrap}>
                <Link prefetch={false} href={`/task/${id}`} className={styles.taskItemWrapper}>
                    <span className={base.circle32}>{number}</span>

                    <Text variant="h4">Задание</Text>

                    {theme && <p className={styles.testQuestionTheme}>{theme}</p>}

                    {subTheme && <p className={styles.testQuestionTheme}>{subThemeTask}</p>}
                </Link>

                {edit && (
                    <Tooltip title="Заменить">
                        <IconButton small variant="light" onClick={swapCallback}>
                            <Swap />
                        </IconButton>
                    </Tooltip>
                )}
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
