'use client';

import React from 'react';
import Link from 'next/link';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import type { Log } from '../model';
import { ArrowRightLong } from '@/shared/icons';
import { formatDate } from '@/shared/utils/formatDate';
import { getLogTypeByType } from '@/shared/utils/getLogIconByType';

import { Text } from '@/shared/ui/Text';
import { Badge } from '@/shared/ui/Badge';
import { IconButton } from '@/shared/ui/Button';

type Props = {
    data: Log;
};

const LogItem: React.FC<Props> = ({ data }) => {
    const { id, type, entityId, createdAt, user } = data || {};
    const { id: userId, avatar, nickname } = user || {};

    return (
        <div className={styles.logsItem}>
            <div className={styles.logsItemContent}>
                <div className={styles.logsItemTypeInner}>{getLogTypeByType(type)}</div>

                <div className={styles.logsItemInfo}>
                    <Text variant="text2" className={styles.logsItemDate}>
                        {formatDate(createdAt)}
                    </Text>

                    <Text fontWeight={500}>
                        <Link prefetch={false} href={`/admin/task/${entityId}`}>{type}</Link>
                    </Text>

                    <Link prefetch={false} href={`/admin/users/${userId}`} className={base.titleWrapper}>
                        <Badge image={avatar} text={nickname} />

                        <Text>{nickname}</Text>
                    </Link>
                </div>
            </div>

            <IconButton href={`/admin/logs/${id}`} small circle variant="light">
                <ArrowRightLong />
            </IconButton>
        </div>
    );
};

export default LogItem;
