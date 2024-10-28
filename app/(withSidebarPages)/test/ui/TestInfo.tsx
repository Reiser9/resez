import React from 'react';
import Link from 'next/link';
import { Tooltip } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import type { TestById } from '@/entities/test';
import { Date, Delete, DotsHorizontal, Lock, Settings, TypesVariantStart } from '@/shared/icons';
import { checkPermission } from '@/shared/utils/checkPermissions';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { formatDate } from '@/shared/utils/formatDate';
import useCopyText from '@/features/utils/useCopyText';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { useShortInfo, useUserPermissions } from '@/features/user';

import { BackButton, Button, IconButton } from '@/shared/ui/Button';
import { HoverMenu, MenuLink } from '@/shared/ui/HoverMenu';
import { Text } from '@/shared/ui/Text';
import { LinkBlock } from '@/shared/ui/LinkBlock';
import { Badge } from '@/shared/ui/Badge';
import { ConfirmModal } from '@/shared/ui/Modal';
import { useTest } from '@/features/test';

type Props = {
    data: TestById;
};

const TestInfo: React.FC<Props> = ({ data }) => {
    const { id } = useParams();

    const [actionMenu, setActionMenu] = React.useState(false);
    const [confirmDelete, setConfirmDelete] = React.useState(false);

    const { copyTextWithNotify } = useCopyText();
    const { getUserPermissions } = useUserPermissions();
    const { getShortInfo } = useShortInfo();
    const { deleteTest } = useTest();
    const isAuth = useAppSelector((state) => state.user.isAuth);
    const router = useRouter();

    const { data: permissions } = useQuery({
        queryKey: ['user_permissions'],
        queryFn: getUserPermissions,
        enabled: isAuth,
    });

    const { data: userInfo } = useQuery({
        queryKey: ['short_info'],
        queryFn: () => getShortInfo(),
        enabled: isAuth,
    });

    const { id: testId, isOfficial, isPrivate, isExam, createdAt, subject, tasksCount, user, tasks } = data || {};
    const { id: authorId, nickname, avatar } = user || {};

    const { id: userId } = userInfo?.user || {};

    return (
        <>
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
                                <IconButton variant="light" small onClick={() => setActionMenu((prev) => !prev)}>
                                    <DotsHorizontal />
                                </IconButton>
                            }
                        >
                            <MenuLink disabled>
                                <Settings />
                                Настройки
                            </MenuLink>

                            {(checkPermission(permissions || [], [PERMISSIONS.DELETE_TESTS]) ||
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

                <Tooltip title="Скопировать">
                    <Text
                        variant="h4"
                        className={styles.testId}
                        onClick={() => copyTextWithNotify(String(id), 'ID теста скопировано')}
                    >
                        Номер варианта: {id}
                    </Text>
                </Tooltip>

                <div className={base.titleInner}>
                    {isOfficial ? (
                        <div className={base.titleWrapper}>
                            <Badge text="R" />

                            <Text>{'ResEz Team'}</Text>
                        </div>
                    ) : (
                        <Link prefetch={false} href={`/user/${nickname}`} className={base.titleWrapper}>
                            <Badge text={nickname} image={avatar} />

                            <Text>{nickname}</Text>
                        </Link>
                    )}

                    <Tooltip title="Дата создания теста">
                        <div className={styles.testDateInner}>
                            <Date />

                            {formatDate(createdAt, 'D MMMM YYYY')}
                        </div>
                    </Tooltip>
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

            {(checkPermission(permissions || [], [PERMISSIONS.DELETE_TESTS]) || userId === authorId) && (
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

export default TestInfo;
