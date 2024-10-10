'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

import styles from './index.module.scss';
import pws from '@/shared/styles/pageWithSidebar.module.scss';

import { ContentWrapper } from '@/shared/wrappers/ContentWrapper';
import { useProfileData, useShortInfo } from '@/features/user';

import { Badge } from '@/shared/ui/Badge';
import { AvatarDecoration } from '@/shared/ui/AvatarDecoration';
import { Text } from '@/shared/ui/Text';

const Scene = dynamic(() => import('./Scene'), { ssr: false });

const Test3D = () => {
    const { getProfileData } = useProfileData();
    const { getShortInfo } = useShortInfo();

    const { data: profileInfo, isLoading: profileInfoIsLoading } = useQuery({
        queryKey: ['profile_data'],
        queryFn: () => getProfileData(),
    });

    const { data: user, isLoading: userIsLoading } = useQuery({
        queryKey: ['short_info'],
        queryFn: () => getShortInfo(),
    });

    const { avatar, nickname, levelInfo } = user?.user || {};
    const { level, limit, xp } = levelInfo || {};

    const { firstName, lastName, avatarDecoration } = profileInfo || {};
    const { contentUrl, title, options, contentType } = avatarDecoration || {};

    return (
        <ContentWrapper>
            <div className={pws.wrapper}>
                <div className={pws.contentFull}>
                    <div className={styles.testWrapper}>
                        <div className={styles.testItem}>
                            <div className={styles.testItemInfo}>
                                <div className={styles.profileAvatarInner}>
                                    <Badge image={avatar} text={nickname} style={{ width: 92, height: 92 }} />

                                    {avatarDecoration && (
                                        <AvatarDecoration
                                            contentType={contentType}
                                            title={title}
                                            contentUrl={contentUrl}
                                            options={options}
                                        />
                                    )}
                                </div>

                                <Text fontWeight={600}>Reiser95</Text>

                                <Text variant='h3' color='success'>Победа!</Text>
                            </div>

                            <div className={styles.testItemScene}>
                                <Scene modelUrl="models/reiser_hero.glb" action='Lose' />
                            </div>
                        </div>
                        
                        <div className={styles.testItem}>
                            <div className={styles.testItemInfo}>
                                <div className={styles.profileAvatarInner}>
                                    <Badge text="xw1nchester" style={{ width: 92, height: 92 }} />
                                </div>

                                <Text fontWeight={600}>xw1nchester</Text>

                                <Text variant='h3' color='error'>Поражение!</Text>
                            </div>

                            <div className={styles.testItemScene}>
                                <Scene modelUrl="models/egor_hero.glb" action='Win' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ContentWrapper>
    );
};

export default Test3D;
