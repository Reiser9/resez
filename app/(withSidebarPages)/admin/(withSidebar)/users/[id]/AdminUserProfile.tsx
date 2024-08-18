'use client';

import React from 'react';
import Image from 'next/image';

import styles from './index.module.scss';

import { Badge } from '@/shared/ui/Badge';
import { Text } from '@/shared/ui/Text';

const AdminUserProfile = () => {
    return (
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
    );
};

export default AdminUserProfile;
