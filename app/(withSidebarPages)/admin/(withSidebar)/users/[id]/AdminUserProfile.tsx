'use client';

import React from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import styles from './index.module.scss';

import { useUsers } from '@/features/user';

import { Badge } from '@/shared/ui/Badge';
import { Text } from '@/shared/ui/Text';
import { AvatarDecoration } from '@/shared/ui/AvatarDecoration';

const AdminUserProfile = () => {

    const { getUserInfoById } = useUsers();
    const { id } = useParams();

    const { data, isLoading } = useQuery({
        queryKey: ['admin_user_profile', id],
        queryFn: () => getUserInfoById(String(id)),
        enabled: !!id,
    });

    const { firstName, lastName, nickname, avatar, status, isVerified, isBlocked, avatarDecoration, activity } =
        data || {};
    const { lastSeen, isOnline } = activity || {};
    const { contentUrl, title, options, contentType } = avatarDecoration || {};

    return (
        <div className={styles.userBannerWrapper}>
            <div className={styles.userBannerInner}>
                <Image src="/img/banner.jpg" alt="banner" className={styles.userBanner} fill />
            </div>

            <div className={styles.userAvatarWrapper}>
                <div className={styles.userAvatarInner}>
                    <Badge text={nickname} image={avatar} style={{ width: 92, height: 92 }} />

                    {avatarDecoration && (
                        <AvatarDecoration
                            contentType={contentType}
                            title={title}
                            contentUrl={contentUrl}
                            options={options}
                        />
                    )}
                </div>

                {firstName && lastName && (
                    <Text variant="h3">
                        {firstName} {lastName}
                    </Text>
                )}

                <Text variant="text2">{nickname}</Text>
            </div>
        </div>
    );
};

export default AdminUserProfile;
