'use client';

import React from 'react';
import cn from 'classnames';
import { Tooltip } from 'antd';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import { Test } from '../model';
import { HoverMenu, MenuLink } from '@/shared/ui/HoverMenu';
import { Button, IconButton } from '@/shared/ui/Button';
import { Delete, DotsHorizontal, Lock } from '@/shared/icons';
import { TextPoint } from '@/shared/ui/TextPoint';
import { ConfirmModal } from '@/shared/ui/Modal';
import { Text } from '@/shared/ui/Text';

type Props = {
    data: Test;
    remove?: boolean;
    removeCallback?: () => void;
};

const TestItem: React.FC<Props> = ({ data, remove = false, removeCallback = () => {} }) => {
    const [actionMenu, setActionMenu] = React.useState(false);
    const [confirmDelete, setConfirmDelete] = React.useState(false);

    const { subject, tasksCount, isExam, isPrivate, isOfficial, id } = data || {};

    return (
        <>
            <div className={cn(base.item3, styles.testItem)}>
                <div className={styles.testItemWrapper}>
                    <div className={styles.testItemTitleWrapper}>
                        {subject && <p className={styles.testItemName}>{subject}</p>}

                        {remove && (
                            <HoverMenu
                                button={
                                    <IconButton
                                        className={styles.testItemMore}
                                        variant="light"
                                        small
                                        onClick={() => setActionMenu((prev) => !prev)}
                                    >
                                        <DotsHorizontal />
                                    </IconButton>
                                }
                                value={actionMenu}
                                setValue={setActionMenu}
                            >
                                {remove && (
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
                        )}
                    </div>

                    <div className={styles.testItemInfo}>
                        <TextPoint title="Заданий" text={tasksCount} className={styles.testItemInfoItem} />
                        <TextPoint title="ID теста" text={id} className={styles.testItemInfoItem} />
                    </div>

                    {/* <div className={styles.testItemScore}>
                        <Text variant="text2" className={styles.testItemScoreTitle}>
                            Прогресс решения
                        </Text>

                        <div className={styles.testItemScoreContent}>
                            <div className={styles.testItemScoreLine}>
                                <div className={styles.testItemScoreProgress} style={{ width: '35%' }}></div>
                            </div>

                            <div className={styles.testItemScoreValueInner}>
                                <Text variant="text3" className={styles.testItemScoreValue}>
                                    35%
                                </Text>
                            </div>
                        </div>
                    </div>

                    <div className={styles.testItemScore}>
                        <Text variant="text2" className={styles.testItemScoreTitle}>
                            Баллы
                        </Text>

                        <div className={styles.testItemScoreContent}>
                            <div className={styles.testItemScoreLine}>
                                <div className={styles.testItemScoreProgress} style={{ width: '66%' }}></div>
                            </div>

                            <div className={styles.testItemScoreValueInner}>
                                <Text variant="text3" className={styles.testItemScoreValue}>
                                    66 / 100
                                </Text>
                            </div>
                        </div>

                        <div className={styles.testItemLockResult}>Решите тест полностью, чтобы увидеть результат</div>
                    </div> */}
                </div>

                <div className={styles.testItemTags}>
                    {isOfficial && (
                        <Tooltip title="Тест разработан командой ResEz" placement="bottomLeft">
                            <div className={styles.testItemTag}>ResEz</div>
                        </Tooltip>
                    )}

                    {/* <Tooltip title="Тест создан пользователем, но мы проверили его" placement="bottomLeft">
                        <div className={styles.testItemTag}>
                            <Verified />
                        </div>
                    </Tooltip> */}

                    {isPrivate && (
                        <Tooltip title="Тест скрыт для других пользователей" placement="bottomLeft">
                            <div className={styles.testItemTag}>
                                <Lock />
                            </div>
                        </Tooltip>
                    )}

                    {isExam && (
                        <Tooltip title="Вариант ЕГЭ" placement="bottomLeft">
                            <div className={styles.testItemTag}>ЕГЭ</div>
                        </Tooltip>
                    )}
                </div>

                <Button href={`/test/${id}`} variant="light" small>
                    Подробнее
                </Button>

                {/* {loading && <LoaderForItem />} */}
            </div>

            {remove && (
                <ConfirmModal
                    value={confirmDelete}
                    setValue={setConfirmDelete}
                    text="Вы действительно хотите удалить тест?"
                    callback={removeCallback}
                />
            )}
        </>
    );
};

export default TestItem;
