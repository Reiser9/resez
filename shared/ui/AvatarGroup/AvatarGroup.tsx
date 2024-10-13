'use client';

import React from 'react';

import styles from './index.module.scss';

import { Badge } from '../Badge';

type Props = {
    elements: {
        avatar: string | null;
        nickname: string;
    }[];
    max?: number;
    showAllCount?: boolean;
};

const AvatarGroup: React.FC<Props> = ({ elements, max = 3, showAllCount = false }) => {
    return (
        <div className={styles.avatarGroupInner}>
            {elements.length ? (
                elements.slice(0, max).map((data, id) => (
                    <div key={id} className={styles.avatarGroupItem}>
                        <Badge
                            style={{ width: 32, height: 32 }}
                            image={data.avatar}
                            text={data.nickname}
                            isUserAvatar
                            withBorder
                        />
                    </div>
                ))
            ) : (
                <div className={styles.avatarGroupItem}>
                    <Badge style={{ width: 32, height: 32 }} withBorder />
                </div>
            )}

            {showAllCount && elements.length > max && (
                <div className={styles.avatarGroupItem}>
                    <Badge
                        style={{ width: 32, height: 32 }}
                        text={`+${elements.length - max > 9 ? 9 : elements.length - max}`}
                        withBorder
                        showFullText
                        size="small"
                        className={styles.avatarGroupAllCount}
                    />
                </div>
            )}
        </div>
    );
};

export default AvatarGroup;
