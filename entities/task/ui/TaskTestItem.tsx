'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import type { SubjectTaskById } from '../model';
import { Archive, Check, DotsHorizontal, Edit, Notebook, Warn } from '@/shared/icons';

import { Spoiler } from '@/shared/ui/Spoiler';
import { Button, IconButton } from '@/shared/ui/Button';
import { Modal } from '@/shared/ui/Modal';
import { Text } from '@/shared/ui/Text';
import { DynamicSkeleton } from '@/shared/ui/Skeleton';
import { Input } from '@/shared/ui/Input';
import { HoverMenu, MenuLink } from '@/shared/ui/HoverMenu';

const CustomHtmlParser = dynamic(() => import('@/shared/ui/CustomHtmlParser/CustomHtmlParser'), {
    ssr: false,
    loading: () => <DynamicSkeleton />,
});

type Props = {
    data: SubjectTaskById;
    showAnswer?: boolean;
    taskWithLink?: boolean;
    edit?: boolean;
    remove?: boolean;
    removeCallback?: () => void;
    verify?: boolean;
};

const TaskTestItem: React.FC<Props> = ({
    data,
    showAnswer = false,
    taskWithLink = false,
    edit = false,
    remove = false,
    removeCallback = () => {},
    verify = false,
}) => {
    const { task, solution, subjectTask, id, source, subTheme, subject, isVerified, answers } = data || {};

    const [warn, setWarn] = React.useState(false);
    const [warnText, setWarnText] = React.useState('');

    const [actionMenu, setActionMenu] = React.useState(false);

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
                <div className={base.titleInnerNowrap}>
                    {taskWithLink ? (
                        <Link prefetch={false} href={`/task/${id}`} className={styles.taskItemWrapper}>
                            {taskInfoContent()}
                        </Link>
                    ) : (
                        <div className={styles.taskItemWrapper}>{taskInfoContent()}</div>
                    )}

                    {/* <IconButton small variant="warn" onClick={() => setWarn(true)}>
                        <Warn />
                    </IconButton> */}

                    {(edit || remove) && (
                        <HoverMenu
                            value={actionMenu}
                            setValue={setActionMenu}
                            button={
                                <IconButton small variant="light" onClick={() => setActionMenu((prev) => !prev)}>
                                    <DotsHorizontal />
                                </IconButton>
                            }
                        >
                            {/* {verify && (
                                <MenuLink>
                                    {isVerified ? (
                                        <>
                                            <Notebook />В черновик
                                        </>
                                    ) : (
                                        <>
                                            <Check />
                                            Верифицировать
                                        </>
                                    )}
                                </MenuLink>
                            )} */}

                            {edit && (
                                <MenuLink href={`/admin/tasks/edit/${id}`}>
                                    <Edit />
                                    Редактировать
                                </MenuLink>
                            )}

                            {/* {remove && (
                                <MenuLink onClick={removeCallback} danger>
                                    <Archive />В архив
                                </MenuLink>
                            )} */}
                        </HoverMenu>
                    )}
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
