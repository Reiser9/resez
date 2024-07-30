'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import cn from 'classnames';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import { Input } from '@/shared/ui/Input';
import { DynamicSkeleton } from '@/shared/ui/Skeleton';
import { Text } from '@/shared/ui/Text';
import { Modal } from '@/shared/ui/Modal';
import { Button, IconButton } from '@/shared/ui/Button';
import { Warn } from '@/shared/icons';
import { TestTask } from '@/entities/test';

const CustomHtmlParser = dynamic(() => import('@/shared/ui/CustomHtmlParser/CustomHtmlParser'), {
    ssr: false,
    loading: () => <DynamicSkeleton />,
});

type Props = {
    data: TestTask;
    taskWithLink?: boolean;
    setValue: (id: number, value: string) => void;
};

const TaskTestItemWithAnswer: React.FC<Props> = ({ data, setValue }) => {
    const { id, isDetailedAnswer, number, task, subTheme, theme } = data || {};

    const [warn, setWarn] = React.useState(false);
    const [warnText, setWarnText] = React.useState('');

    return (
        <>
            <div className={styles.taskTestItem}>
                <div className={base.titleInner}>
                    <div className={base.titleWrapper}>
                        <div className={base.circle32}>{number}</div>

                        <Link href={`/task/${id}`}>
                            <Text variant="h4">Задание</Text>
                        </Link>
                    </div>

                    {/* <IconButton small variant="warn" onClick={() => setWarn(true)}>
                        <Warn />
                    </IconButton> */}
                </div>

                {task && (
                    <div className={base.format}>
                        <CustomHtmlParser html={task} />
                    </div>
                )}

                {isDetailedAnswer ? (
                    <p className={styles.taskTestItemDetailed}>
                        Задание проверяется самостоятельно, решите данное задание в тетради и на следующей странице вы
                        сможете проверить его
                    </p>
                ) : (
                    <div className={cn(base.baseWrapperGap4, styles.testTaskItemAnswer)}>
                        <p className={styles.answerTitle}>Ответ:</p>

                        <Input setValue={(e) => setValue(id, String(e))} color="white" />
                    </div>
                )}
            </div>

            {/* <Modal value={warn} setValue={setWarn} title="Жалоба на задание" size="small">
                <Input
                    value={warnText}
                    setValue={setWarnText}
                    variant="textarea"
                    title="Опишите проблему"
                    trackLength
                    lengthLimit={1000}
                />

                <Button>Отправить</Button>
            </Modal> */}
        </>
    );
};

export default TaskTestItemWithAnswer;
