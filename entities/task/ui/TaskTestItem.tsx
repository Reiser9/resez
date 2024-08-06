'use client';

import React from 'react';
import dynamic from 'next/dynamic';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import { Spoiler } from '@/shared/ui/Spoiler';
import { Input } from '@/shared/ui/Input';
import { DynamicSkeleton } from '@/shared/ui/Skeleton';
import { Text } from '@/shared/ui/Text';
import { Modal } from '@/shared/ui/Modal';
import { Button, IconButton } from '@/shared/ui/Button';
import { SubjectTaskById } from '../model';
import { Warn } from '@/shared/icons';
import Link from 'next/link';

const CustomHtmlParser = dynamic(() => import('@/shared/ui/CustomHtmlParser/CustomHtmlParser'), {
    ssr: false,
    loading: () => <DynamicSkeleton />,
});

type Props = {
    data: SubjectTaskById;
    showAnswer?: boolean;
    taskWithLink?: boolean;
};

const TaskTestItem: React.FC<Props> = ({ data, showAnswer = false, taskWithLink = false }) => {
    const { task, solution, answers, subjectTask, id, source, subTheme, subject } = data || {};

    const [warn, setWarn] = React.useState(false);
    const [warnText, setWarnText] = React.useState('');

    const taskInfoContent = () => {
        return (
            <>
                <span className={base.circle32}>{subjectTask?.number ?? '?'}</span>

                <Text variant="h4">{subject.subject}</Text>

                {subjectTask?.theme && <p className={styles.taskTheme}>{subjectTask.theme}</p>}

                {subTheme?.subTheme && <p className={styles.taskTheme}>{subTheme.subTheme}</p>}
            </>
        );
    };

    return (
        <>
            <div className={styles.taskTestItem}>
                <div className={base.titleInner}>
                    {taskWithLink ? (
                        <Link href={`/task/${id}`} className={base.titleWrapper}>
                            {taskInfoContent()}
                        </Link>
                    ) : (
                        <div className={base.titleWrapper}>{taskInfoContent()}</div>
                    )}

                    {/* <IconButton small variant="warn" onClick={() => setWarn(true)}>
                        <Warn />
                    </IconButton> */}
                </div>

                {task && (
                    <div className={base.format}>
                        <CustomHtmlParser html={task} />
                    </div>
                )}

                <Spoiler title="Решение" defaultOpen={showAnswer} theme="white">
                    {solution && (
                        <div className={base.format}>
                            <CustomHtmlParser html={solution} />
                        </div>
                    )}

                    {!!answers?.length && <p className={styles.taskTestItemAnswer}>Ответ: {answers.join(' или ')}</p>}
                </Spoiler>

                {source && <Text fontWeight={600}>Источник: {source}</Text>}
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

export default TaskTestItem;
