'use client';

import React from 'react';
import cn from 'classnames';
import { useQuery } from '@tanstack/react-query';

import styles from './index.module.scss';

import { Spoiler } from '@/shared/ui/Spoiler';
import { Table, TableItem } from '@/shared/ui/Table';
import { useParams } from 'next/navigation';
import { useSubjects } from '@/features/subjects';
import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';
import { Cross } from '@/shared/icons';
import { Text } from '@/shared/ui/Text';

const PointsSubject = () => {
    const { subject } = useParams();
    const { getPointsSubjectBySlug } = useSubjects();

    const { data, isLoading, error } = useQuery({
        queryKey: ['subject_points', subject],
        queryFn: () => getPointsSubjectBySlug(String(subject)),
        enabled: !!subject,
    });

    const { isMark, scoreConversion, subjectTasks, durationMinutes } = data || {};

    if (isLoading) {
        return <Preloader />;
    }

    if (error) {
        return <NotContent icon={<Cross />} danger text="Произошла ошибка при загрузке данных" />;
    }

    return (
        <>
            <div className={styles.pointsTextInner}>
                <p className={cn(styles.pointsText, styles.pointsTextRed)}>
                    Красным обозначен минимальный порог для получения аттестата
                </p>
                <p className={cn(styles.pointsText, styles.pointsTextGreen)}>
                    Зелёным отмечена область, в которой ученик получает оценку «отлично»
                </p>

                {durationMinutes && (
                    <Text fontWeight={500}>
                        Длительность экзамена: {Math.floor(durationMinutes / 60)} ч. {durationMinutes % 60} мин.
                    </Text>
                )}
            </div>

            <div className={styles.pointContent}>
                <div className={styles.pointWrapper}>
                    <Spoiler title="Перевод баллов">
                        <Table>
                            <TableItem
                                head
                                text={isMark ? 'Оценка' : 'Первичный балл'}
                                value={isMark ? 'Баллы' : 'Вторичный балл'}
                            />

                            {isMark
                                ? scoreConversion?.map((data) => (
                                      <TableItem
                                          key={data.id}
                                          text={`${data.grade}`}
                                          value={`${data.minScore}-${data.maxScore}`}
                                          status={data.isGreen ? 'success' : data.isRed ? 'error' : undefined}
                                      />
                                  ))
                                : scoreConversion?.map((data) => (
                                      <TableItem
                                          key={data.id}
                                          text={`${data.primaryScore}`}
                                          value={`${data.secondaryScore}`}
                                          status={data.isGreen ? 'success' : data.isRed ? 'error' : undefined}
                                      />
                                  ))}
                        </Table>
                    </Spoiler>
                </div>

                <div className={styles.pointWrapper}>
                    <Spoiler title="Оценка заданий">
                        <Table>
                            <TableItem head text="Задание" value="Первичный балл" />

                            {subjectTasks?.map((data) => (
                                <TableItem key={data.id} text={`${data.number}`} value={`${data.primaryScore}`} />
                            ))}
                        </Table>
                    </Spoiler>
                </div>
            </div>
        </>
    );
};

export default PointsSubject;
