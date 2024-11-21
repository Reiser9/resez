import React from 'react';
import cn from 'classnames';
import { useParams } from 'next/navigation';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import type { ActivityItem } from '@/entities/user';
import { formatDate } from '@/shared/utils/formatDate';
import { Enter } from '@/shared/icons';

import { Text } from '@/shared/ui/Text';
import { NotContent } from '@/shared/ui/NotContent';
import { Button } from '@/shared/ui/Button';

type Props = {
    activity?: ActivityItem[];
};

const ActivityBlock: React.FC<Props> = ({ activity }) => {
    const { id } = useParams();

    return (
        <div className={styles.userInfoItem}>
            <Text variant="h4" fontWeight={600}>
                Активность
            </Text>

            <div className={base.baseWrapperGap8}>
                {activity?.length ? (
                    activity.map((data) => (
                        <div key={data.id} className={styles.activityItem}>
                            <div className={base.titleWrapper}>
                                {data.type === 'Login' ? (
                                    <div className={cn(styles.activityItemIcon, styles.green)}>
                                        <Enter />
                                    </div>
                                ) : (
                                    <div className={cn(styles.activityItemIcon, styles.red)}>
                                        <Enter />
                                    </div>
                                )}

                                <Text variant="text2" fontWeight={600}>
                                    {data.type}
                                </Text>
                            </div>

                            <Text variant="text2" fontWeight={600}>
                                {formatDate(data.date)}
                            </Text>
                        </div>
                    ))
                ) : (
                    <NotContent text="Записей активности не обнаружено" />
                )}
            </div>

            {!!activity?.length && (
                <Button href={`/admin/users/${id}/activity`} variant="light">
                    Смотреть все
                </Button>
            )}
        </div>
    );
};

export default ActivityBlock;
