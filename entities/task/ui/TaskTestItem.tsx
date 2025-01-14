'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import type { SubjectTaskById } from '../model';
import { Archive, Check, Comment, Cross, DotsHorizontal, Edit, Notebook, Send, Warn } from '@/shared/icons';

import { Spoiler } from '@/shared/ui/Spoiler';
import { Button, IconButton } from '@/shared/ui/Button';
import { Modal } from '@/shared/ui/Modal';
import { Text } from '@/shared/ui/Text';
import { DynamicSkeleton } from '@/shared/ui/Skeleton';
import { Input } from '@/shared/ui/Input';
import { HoverMenu, MenuLink } from '@/shared/ui/HoverMenu';
import { NotContent } from '@/shared/ui/NotContent';
import { useTaskComment } from '@/features/task';
import useAlert from '@/shared/hooks/useAlert';
import { Preloader } from '@/shared/ui/Preloader';
import TaskCommentItem from './TaskCommentItem';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { useShortInfo } from '@/features/user';
import useInfiniteScroll from '@/shared/hooks/useInfiniteScroll';

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
    const isAuth = useAppSelector((state) => state.user.isAuth);

    const { task, solution, subjectTask, id, sourceRelation, subTheme, subject, isVerified, answers, commentsCount } =
        data || {};
    const { isDetailedAnswer } = subjectTask || {};
    const { slug, source } = sourceRelation || {};

    const [warn, setWarn] = React.useState(false);
    const [warnText, setWarnText] = React.useState('');

    const [actionMenu, setActionMenu] = React.useState(false);
    const [taskModal, setTaskModal] = React.useState(false);
    const [commentText, setCommentText] = React.useState('');
    const [replyMessageId, setReplyMessageId] = React.useState<number>();
    const commentInputRef = React.useRef<HTMLInputElement | null>(null);

    const [isEditedComment, setIsEditedComment] = React.useState(false);
    const [editedCommentId, setEditedCommentId] = React.useState<number | null>(null);

    const searchParams = useSearchParams();
    const taskComments = searchParams.get('task_comments');

    const router = useRouter();
    const queryClient = useQueryClient();
    const { alertNotify } = useAlert();
    const { sendComment, getPagginationTaskComments, editTaskComment, removeTaskComment } = useTaskComment();
    const { getShortInfo } = useShortInfo();

    const revalidateComments = () => {
        queryClient.invalidateQueries({ queryKey: ['task_comment_by_id', id] });
    };

    const { data: userInfo } = useQuery({
        queryKey: ['short_info'],
        queryFn: () => getShortInfo(),
        enabled: isAuth,
    });

    const { id: userId } = userInfo?.user || {};

    const createCommentMutation = useMutation({
        mutationFn: async () => {
            if (!id || !isAuth) return;

            if (!commentText) {
                return alertNotify('Предупреждение', 'Комментарий не может быть пустым', 'warn');
            }

            sendComment(
                id,
                commentText,
                () => {
                    setCommentText('');
                    revalidateComments();
                },
                replyMessageId,
            );
        },
    });

    const replyComment = (commentId: number, replyNickname: string) => {
        setReplyMessageId(commentId);
        setCommentText(`${replyNickname}, `);
        commentInputRef.current?.focus();
    };

    const openCommentModal = () => {
        setTaskModal(true);
        router.replace(`?task_comments=${id}`);
    };

    const closeCommentModal = () => {
        router.replace('?');
    };

    const editComment = (commentText: string, id: number) => {
        if (!commentText) return;

        setEditedCommentId(id);
        setIsEditedComment(true);
        setCommentText(commentText);
        commentInputRef.current?.focus();
    };

    const saveEditedCommentMutation = useMutation({
        mutationFn: async () => {
            if (!editedCommentId || !commentText) return;

            editTaskComment(editedCommentId, commentText, () => {
                setCommentText('');
                revalidateComments();
                setEditedCommentId(null);
                setIsEditedComment(false);
            });
        },
    });

    const {
        data: comments,
        endPage,
        isPending,
        isError,
        isFetchingNextPage,
    } = useInfiniteScroll({
        queryKey: ['task_comment_by_id', String(id)],
        queryFn: (pageParam) => getPagginationTaskComments(pageParam, String(id)),
        enabled: !!id && taskModal,
    });

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

    React.useEffect(() => {
        if (taskComments == String(id)) {
            setTaskModal(true);
        }
    }, [taskComments, id]);

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

                    {!isDetailedAnswer && !!answers?.length && (
                        <p className={styles.taskTestItemAnswer}>Ответ: {answers[0]}</p>
                    )}
                </Spoiler>

                {source && <Text fontWeight={600}>Источник: {source}</Text>}

                <button className={styles.taskTestItemCommentButton} onClick={openCommentModal}>
                    <Comment />
                    Комментарии ({commentsCount})
                </button>
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

            <Modal value={taskModal} setValue={setTaskModal} title={`Задание #${id}`} onClose={closeCommentModal}>
                <div className={base.baseWrapperGap16}>
                    {task && (
                        <div className={base.format}>
                            <CustomHtmlParser html={task} />
                        </div>
                    )}

                    <Spoiler title="Решение" defaultOpen={showAnswer}>
                        {solution && (
                            <div className={base.format}>
                                <CustomHtmlParser html={solution} />
                            </div>
                        )}

                        {!isDetailedAnswer && !!answers?.length && (
                            <p className={styles.taskTestItemAnswer}>Ответ: {answers[0]}</p>
                        )}
                    </Spoiler>

                    {source && <Text fontWeight={600}>Источник: {source}</Text>}

                    <div className={base.baseWrapperGap8}>
                        <Text variant="text" fontWeight={600}>
                            Комментарии:
                        </Text>

                        <div className={styles.taskTestCommentInner}>
                            {isPending ? (
                                <Preloader page small />
                            ) : isError ? (
                                <NotContent text="Произошла ошибка при загрузке данных" icon={<Cross />} danger />
                            ) : comments?.pages[0]?.totalCount ? (
                                comments?.pages.map((comment) => (
                                    <>
                                        {comment?.comments?.map((data) => (
                                            <TaskCommentItem
                                                key={data.id}
                                                data={data}
                                                replyComment={replyComment}
                                                edit={userId === data.user.id}
                                                editCommentCallback={(text: string, id: number) =>
                                                    editComment(text, id)
                                                }
                                                remove={userId === data.user.id}
                                                removeCallback={(id: number) =>
                                                    removeTaskComment(id, revalidateComments)
                                                }
                                                myId={userId}
                                            />
                                        ))}

                                        {isFetchingNextPage && <Preloader offIndent small page />}

                                        {!isFetchingNextPage && <div ref={endPage}></div>}
                                    </>
                                ))
                            ) : (
                                <NotContent
                                    text="У данного задания еще нет комментариев, напишите его первым."
                                    icon={<Comment />}
                                />
                            )}
                        </div>

                        {isAuth ? (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();

                                    if (isEditedComment) {
                                        saveEditedCommentMutation.mutate();
                                    } else {
                                        createCommentMutation.mutate();
                                    }
                                }}
                                className={styles.taskTestCommentForm}
                            >
                                {isEditedComment && (
                                    <div className={base.titleInner}>
                                        <Text variant="text2" fontWeight={600}>
                                            Редактирование сообщения:
                                        </Text>

                                        <div
                                            className={styles.taskTestCommentCancel}
                                            onClick={() => {
                                                setCommentText('');
                                                setIsEditedComment(false);
                                                setEditedCommentId(null);
                                            }}
                                        >
                                            <Cross />
                                        </div>
                                    </div>
                                )}

                                <div className={styles.taskTestCommentFormContent}>
                                    <Input
                                        value={commentText}
                                        setValue={setCommentText}
                                        placeholder="Написать комментарий..."
                                        ref={commentInputRef}
                                    />

                                    <IconButton
                                        className={styles.taskTestCommentSend}
                                        disabled={
                                            !commentText ||
                                            createCommentMutation.isPending ||
                                            saveEditedCommentMutation.isPending
                                        }
                                    >
                                        <Send />
                                    </IconButton>
                                </div>
                            </form>
                        ) : (
                            <p className={styles.taskTestCommentAuth}>
                                Оставлять комментарии могут только <Link href="/login">авторизованные</Link>{' '}
                                пользователи
                            </p>
                        )}
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default TaskTestItem;
