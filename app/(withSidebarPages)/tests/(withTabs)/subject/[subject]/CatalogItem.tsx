'use client';

import React from 'react';
import Link from 'next/link';
import cn from 'classnames';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';
import { SubjectTaskCreate } from '@/entities/subject';

type Props = {
    data: SubjectTaskCreate;
};

const CatalogItem: React.FC<Props> = ({ data, ...props }) => {
    const { number, tasksCount, theme, subThemes, isDetailedAnswer, primaryScore } = data || {};

    return (
        <div className={cn(base.item2, styles.catalogItem)} {...props}>
            <div className={base.titleWrapper}>
                <div className={base.circle25}>{number}</div>

                <p className={styles.catalogItemTitle}>
                    {theme} ({tasksCount})
                </p>
            </div>

            <div className={styles.catalogItemSubthemes}>
                {subThemes.map((data) =>
                    data.tasksCount !== 0 ? (
                        <Link prefetch={false} key={data.id} href={`/task/subtheme/${data.id}`} className={styles.catalogItemLink}>
                            ({data.tasksCount}) {data.subTheme}
                        </Link>
                    ) : (
                        <p key={data.id} className={styles.catalogItemText}>
                            ({data.tasksCount}) {data.subTheme}
                        </p>
                    ),
                )}
            </div>
        </div>
    );
};

export default CatalogItem;
