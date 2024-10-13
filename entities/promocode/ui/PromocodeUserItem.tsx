'use client';

import React from 'react';
import cn from 'classnames';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import type { UserShort } from '@/entities/user';
import { formatDate } from '@/shared/utils/formatDate';

import { Badge } from '@/shared/ui/Badge';
import { Text } from '@/shared/ui/Text';
import Link from 'next/link';

type Props = {
    data: UserShort & {
        date: Date;
    };
};

const PromocodeUserItem: React.FC<Props> = ({ data }) => {
    const { id, date, avatar, nickname } = data || {};

    return (
        <div className={cn(base.item4, styles.promoUserItem)}>
            <Link prefetch={false} href={`/admin/users/${id}`} className={base.titleWrapper}>
                <Badge image={avatar} text={nickname} />

                <Text>{nickname}</Text>
            </Link>

            <Text variant="text2" fontWeight={600}>
                {formatDate(date)}
            </Text>
        </div>
    );
};

export default PromocodeUserItem;
