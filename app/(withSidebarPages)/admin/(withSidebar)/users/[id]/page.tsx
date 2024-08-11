'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import cn from 'classnames';
import { useParams, usePathname } from 'next/navigation';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';
import { Badge } from '@/shared/ui/Badge';
import { Text } from '@/shared/ui/Text';
import { ScrollWithArrow } from '@/shared/ui/ScrollWithArrow';

type ArchiveTab = {
    name: string;
    link: string;
};

const usersTabs: ArchiveTab[] = [
    {
        name: 'Роли',
        link: '/admin/users',
    },
    {
        name: 'Сессии',
        link: '/admin/users',
    },
    {
        name: 'Коллекции',
        link: '/admin/users',
    },
];

const AdminUserById = () => {
    const { id } = useParams();
    const pathname = usePathname();

    return (
        <div className={base.baseWrapperGap16}>
            <div className={styles.userBannerWrapper}>
                <div className={styles.userBannerInner}>
                    <Image src="/img/banner.jpg" alt="banner" className={styles.userBanner} fill />
                </div>

                <div className={styles.userAvatarWrapper}>
                    <div className={styles.userAvatarInner}>
                        <Badge text="R" style={{ width: 92, height: 92 }} />
                    </div>

                    <Text variant="h3">Имя Фамилия</Text>

                    <Text variant="text2">Никнейм</Text>
                </div>
            </div>

            <ScrollWithArrow>
                <Link
                    href={`/admin/users/${id}/roles`}
                    className={cn(base.tag, {
                        [base.active]: pathname === `/admin/users/${id}/roles`,
                    })}
                    replace
                >
                    Роли
                </Link>

                <Link
                    href={`/admin/users/${id}/sessions`}
                    className={cn(base.tag, {
                        [base.active]: pathname === `/admin/users/${id}/sessions`,
                    })}
                    replace
                >
                    Сессии
                </Link>

                <Link
                    href={`/admin/users/${id}/collections`}
                    className={cn(base.tag, {
                        [base.active]: pathname === `/admin/users/${id}/collections`,
                    })}
                    replace
                >
                    Коллекции
                </Link>
            </ScrollWithArrow>
        </div>
    );
};

export default AdminUserById;
