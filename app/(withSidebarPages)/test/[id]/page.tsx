'use client';

import React from 'react';
import cn from 'classnames';
import { Tooltip } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';
import pws from '@/shared/styles/pageWithSidebar.module.scss';

import { useTest } from '@/features/test';
import { Preloader } from '@/shared/ui/Preloader';
import { BackButton, Button, IconButton } from '@/shared/ui/Button';
import { Date, Delete, DotsHorizontal, Lock, Settings, TypesVariantStart } from '@/shared/icons';
import { HoverMenu, MenuLink } from '@/shared/ui/HoverMenu';
import { Text } from '@/shared/ui/Text';
import { formatDate } from '@/shared/utils/formatDate';
import { NotContent } from '@/shared/ui/NotContent';
import { ConfirmModal } from '@/shared/ui/Modal';
import { LinkBlock } from '@/shared/ui/LinkBlock';
import { Badge } from '@/shared/ui/Badge';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { checkPermission } from '@/shared/utils/checkPermissions';
import { useAppSelector } from '@/shared/hooks/useRedux';
import TestQuestionItem from '@/entities/test/ui/TestQuestionItem';
import { ContentWrapper } from '@/shared/wrappers/ContentWrapper';
import useCopyText from '@/features/utils/useCopyText';

const TestPage = () => {
    const permissions = useAppSelector((state) => state.user.user?.permissions);
    const userId = useAppSelector((state) => state.user.user?.id);
    const isAuth = useAppSelector((state) => state.user.isAuth);

    const [actionMenu, setActionMenu] = React.useState(false);
    const [confirmDelete, setConfirmDelete] = React.useState(false);

    const { id } = useParams();
    const router = useRouter();
    const { getTestById, deleteTest } = useTest();
    const { copyTextWithNotify } = useCopyText();

    const {
        data: test,
        isLoading: testIsLoading,
        error,
    } = useQuery({
        queryKey: ['test_by_id', id],
        queryFn: () => getTestById(String(id)),
        enabled: !!id,
    });

    const { id: testId, isOfficial, isPrivate, isExam, createdAt, subject, tasksCount, user, tasks } = test || {};
    const { id: authorId, nickname, avatar } = user || {};

    if (testIsLoading) {
        return <Preloader page />;
    }

    return (
        <>
            <ContentWrapper>
                <div className={pws.wrapper}>
                    <div className={pws.contentFull}>
                        <div className={base.baseWrapperGap40}>
                            <div className={base.baseWrapperGap16}>
                                <div className={base.titleInnerNowrap}>
                                    <div className={styles.testTags}>
                                        <BackButton />

                                        <div className={base.tagElement}>{subject}</div>

                                        <div className={base.tagElement}>Вопросов: {tasksCount}</div>

                                        {isPrivate && (
                                            <Tooltip title="Скрыта">
                                                <div className={base.tagElementIcon}>
                                                    <Lock />
                                                </div>
                                            </Tooltip>
                                        )}

                                        {isOfficial && (
                                            <Tooltip title="Тест разработан командой ResEz">
                                                <div className={base.tagElement}>ResEz</div>
                                            </Tooltip>
                                        )}

                                        {isExam && (
                                            <Tooltip title="Вариант ЕГЭ">
                                                <div className={base.tagElement}>ЕГЭ</div>
                                            </Tooltip>
                                        )}
                                    </div>

                                    <div className={styles.testTags}>
                                        <HoverMenu
                                            value={actionMenu}
                                            setValue={setActionMenu}
                                            button={
                                                <IconButton
                                                    variant="light"
                                                    small
                                                    onClick={() => setActionMenu((prev) => !prev)}
                                                >
                                                    <DotsHorizontal />
                                                </IconButton>
                                            }
                                        >
                                            <MenuLink disabled>
                                                <Settings />
                                                Настройки
                                            </MenuLink>

                                            {(checkPermission(permissions, [PERMISSIONS.DELETE_TESTS]) ||
                                                userId === authorId) && (
                                                <MenuLink
                                                    danger
                                                    onClick={() => {
                                                        setConfirmDelete(true);
                                                        setActionMenu(false);
                                                    }}
                                                >
                                                    <Delete />
                                                    Удалить
                                                </MenuLink>
                                            )}
                                        </HoverMenu>
                                    </div>
                                </div>

                                <Text
                                    variant="h4"
                                    className={styles.testId}
                                    onClick={() => copyTextWithNotify(String(id), 'ID теста скопировано')}
                                >
                                    ID: {id}
                                </Text>

                                <div className={base.titleInner}>
                                    <div className={base.titleWrapper}>
                                        {isOfficial ? (
                                            <>
                                                <Badge text="R" />

                                                <Text>{'ResEz Team'}</Text>
                                            </>
                                        ) : (
                                            <>
                                                <Badge text={nickname} image={avatar} />

                                                <Text>{nickname}</Text>
                                            </>
                                        )}
                                    </div>

                                    <div className={styles.testDateInner}>
                                        <Date />

                                        {formatDate(createdAt, 'D MMMM YYYY')}
                                    </div>
                                </div>
                            </div>

                            <div className={base.baseWrapperGap12}>
                                {!isAuth && (
                                    <div className={base.titleInner}>
                                        <Text className={base.warningText}>
                                            Авторизуйтесь, чтобы сохранить результат прорешивания варианта
                                        </Text>

                                        <Button variant="light" small auto href="/login">
                                            Авторизация
                                        </Button>
                                    </div>
                                )}

                                <div className={base.contentItems}>
                                    <LinkBlock
                                        title="Решать"
                                        href={`/test/${id}/testing`}
                                        disabled={!tasks?.length}
                                        className={base.item4}
                                    >
                                        <TypesVariantStart />
                                    </LinkBlock>
                                </div>
                            </div>

                            <div className={base.baseWrapperGap12}>
                                <Text variant="h4">Задания ({tasksCount})</Text>

                                {!!tasks?.length ? (
                                    <div className={base.contentItems}>
                                        {tasks?.map((data) => (
                                            <TestQuestionItem key={data.id} data={data} />
                                        ))}
                                    </div>
                                ) : (
                                    <NotContent text="Заданий не найдено" />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </ContentWrapper>

            {(checkPermission(permissions, [PERMISSIONS.DELETE_TESTS]) || userId === authorId) && (
                <ConfirmModal
                    value={confirmDelete}
                    setValue={setConfirmDelete}
                    text="Вы действительно хотите удалить тест?"
                    callback={() => deleteTest(String(testId), () => router.replace('/tests'))}
                />
            )}
        </>
    );
};

export default TestPage;
