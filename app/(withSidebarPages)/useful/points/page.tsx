'use client';

import React from 'react';
import cn from 'classnames';
import Link from 'next/link';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import ScrollWithArrows from '@/shared/ui/ScrollWithArrow/ScrollWithArrow';
import { Spoiler } from '@/shared/ui/Spoiler';
import { Table, TableItem } from '@/shared/ui/Table';

const UsefulPoints = () => {
    return (
        <div className={base.baseWrapperGap16}>
            <ScrollWithArrows>
                <Link href="/useful/points/russian" replace className={cn(base.tag, base.active)}>
                    Русский язык
                </Link>
                <Link href="/useful/points/math" replace className={cn(base.tag)}>
                    Математика
                </Link>
                <Link href="/useful/points/history" replace className={cn(base.tag)}>
                    История
                </Link>
                <Link href="/useful/points/informatics" replace className={cn(base.tag)}>
                    Информатика
                </Link>
            </ScrollWithArrows>

            <div className={styles.pointsTextInner}>
                <p className={cn(styles.pointsText, styles.pointsTextRed)}>
                    Красным обозначен минимальный порог для получения аттестата
                </p>
                <p className={cn(styles.pointsText, styles.pointsTextGreen)}>
                    Зелёным отмечена область, в которой ученик получает оценку «отлично»
                </p>
            </div>

            <div className={styles.pointContent}>
                <div className={styles.pointWrapper}>
                    <Spoiler title="Перевод баллов">
                        <Table>
                            <TableItem head text={'Оценка'} value={'Балл'} />

                            <TableItem text="0" value="5" status="error" />
                        </Table>
                    </Spoiler>
                </div>

                <div className={styles.pointWrapper}>
                    <Spoiler title="Оценка заданий">
                        <Table>
                            <TableItem head text="Задание" value="Первичный балл" />

                            <TableItem text="0" value="3" />
                        </Table>
                    </Spoiler>
                </div>
            </div>
        </div>
    );
};

export default UsefulPoints;
