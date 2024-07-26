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

const CustomHtmlParser = dynamic(() => import('@/shared/ui/CustomHtmlParser/CustomHtmlParser'), {
    ssr: false,
    loading: () => <DynamicSkeleton />,
});

type Props = {
    data: SubjectTaskById;
    showAnswer?: boolean;
};

const TaskTestItem: React.FC<Props> = ({ data, showAnswer = false }) => {
    const { task, solution, answers, subjectTask } = data || {};

    const [warn, setWarn] = React.useState(false);
    const [warnText, setWarnText] = React.useState('');

    return (
        <>
            <div className={styles.taskTestItem}>
                <div className={base.titleInner}>
                    <div className={base.titleWrapper}>
                        <div className={base.circle32}>{subjectTask.number}</div>

                        <Text variant="h4">Задание</Text>
                    </div>

                    <IconButton small variant="warn" onClick={() => setWarn(true)}>
                        <Warn />
                    </IconButton>
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

                    {!!answers.length && <p className={styles.taskTestItemAnswer}>Ответ: {answers.join(' или ')}</p>}
                </Spoiler>
            </div>

            <Modal value={warn} setValue={setWarn} title="Жалоба на задание" size="small">
                <Input
                    value={warnText}
                    setValue={setWarnText}
                    variant="textarea"
                    title="Опишите проблему"
                    trackLength
                    lengthLimit={1000}
                />

                <Button>Отправить</Button>
            </Modal>
        </>
    );
};

export default TaskTestItem;
