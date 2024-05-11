'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import { HoverMenu, MenuLink } from '@/shared/ui/HoverMenu';
import { Button, IconButton } from '@/shared/ui/Button';
import { Delete, DotsHorizontal, Edit, Restore } from '@/shared/icons';
import { TextPoint } from '@/shared/ui/TextPoint';
import { LoaderForItem } from '@/shared/ui/Preloader';
import { Modal } from '@/shared/ui/Modal';
import { Input } from '@/shared/ui/Input';

import { SubjectDTO } from '@/entities/subject';
import { Text } from '@/shared/ui/Text';
import { useQueryClient } from '@tanstack/react-query';
import { useSubjects } from '@/features/subjects';
import useArchive from '@/features/user/admin/useArchive';

type Props = {
    data: SubjectDTO;
    deleteSubject?: () => void;
    loading?: boolean;
    edit?: boolean;
    remove?: boolean;
    restore?: boolean;
};

const SubjectItem: React.FC<Props> = ({ data, loading = false, edit = false, remove = false, restore = false }) => {
    const { id, subject, isPublished, subjectTasksCount, tasksCount } = data || {};

    const [confirmText, setConfirmText] = React.useState('');
    const [actionMenu, setActionMenu] = React.useState(false);
    const [confirmDelete, setConfirmDelete] = React.useState(false);

    const queryClient = useQueryClient();
    const { deleteSubject } = useSubjects();

    const revalidateSubjects = () => {
        queryClient.invalidateQueries({ queryKey: ['subjects'] });
    };

    const revalidateArchiveSubjects = () => {
        queryClient.invalidateQueries({ queryKey: ['archive_subjects'] });
    };

    const router = useRouter();
    const { restoreArchiveSubject } = useArchive();

    const restoreArchiveSubjectHandlert = async () => {
        restoreArchiveSubject(id, () => {
            revalidateArchiveSubjects();
        });
    }

    return (
        <>
            <div className={`${base.item3} ${styles.subjectItem}`}>
                <div className={styles.subjectItemWrapper}>
                    {subject && <Text variant="h4">{subject}</Text>}

                    {(edit || remove) && (
                        <HoverMenu
                            button={
                                <IconButton small variant="light" onClick={() => setActionMenu((prev) => !prev)}>
                                    <DotsHorizontal />
                                </IconButton>
                            }
                            value={actionMenu}
                            setValue={setActionMenu}
                        >
                            {restore && (
                                <MenuLink onClick={restoreArchiveSubjectHandlert}>
                                    <Restore />
                                    Восстановить
                                </MenuLink>
                            )}

                            {edit && (
                                <MenuLink onClick={() => router.push(`subject/edit/${id}`)}>
                                    <Edit />
                                    Редактировать
                                </MenuLink>
                            )}

                            {remove && (
                                <MenuLink danger onClick={() => {
                                    setActionMenu(false);
                                    setConfirmDelete(true);
                                }}>
                                    <Delete />
                                    Удалить
                                </MenuLink>
                            )}
                        </HoverMenu>
                    )}
                </div>

                <TextPoint title="Количество заданий в предмете" text={subjectTasksCount || 0} />
                <TextPoint title="Статус" text={isPublished ? 'Опубликован' : 'Черновик'} />
                <TextPoint title="Количество созданных заданий" text={tasksCount || 0} />

                {loading && <LoaderForItem />}
            </div>

            <Modal
                value={confirmDelete}
                setValue={setConfirmDelete}
                title={`Удаление предмета: ${subject}`}
                size="small"
            >
                <Text variant="text2" className={base.warningText}>
                    Внимание! Удаляя предмет, удалятся и все задания, связанные с ним, будьте внимательны, перед тем,
                    как удаляете предмет
                </Text>

                <Text variant="text2">Чтобы удалить предмет, напишите слово ПОДТВЕРДИТЬ в поле ниже</Text>

                <Input value={confirmText} setValue={setConfirmText} />

                <Button
                    loading={loading}
                    onClick={() =>
                        deleteSubject(id, () => {
                            revalidateSubjects();
                            setConfirmDelete(false);
                        })
                    }
                    disabled={confirmText.toLowerCase() !== 'подтвердить'}
                >
                    Удалить
                </Button>
            </Modal>
        </>
    );
};

export default SubjectItem;
