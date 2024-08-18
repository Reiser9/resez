'use client';

import React from 'react';
import cn from 'classnames';
import Dotdotdot from 'react-dotdotdot';
import Link from 'next/link';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { Warn } from '../model';
import { Button, IconButton } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { formatDate } from '@/shared/utils/formatDate';
import { Eye, Ghost } from '@/shared/icons';
import { Tooltip } from 'antd';
import { Modal } from '@/shared/ui/Modal';
import { Badge } from '@/shared/ui/Badge';

type Props = {
    data: Warn;
    readWarnCallback: () => void;
};

const WarnItem: React.FC<Props> = ({ data, readWarnCallback = () => {} }) => {
    const { id, createdAt, text, user, isRead } = data || {};
    const { avatar, nickname } = user || {};

    const [modalText, setModalText] = React.useState(false);

    const readWarnHandler = () => {
        readWarnCallback();
    };

    return (
        <>
            <div
                className={cn(base.item3, styles.warnItem, {
                    [styles.readed]: isRead,
                })}
            >
                <div className={styles.warnItemWrapper}>
                    <div className={base.titleInner}>
                        {user ? (
                            <Link href={`/user/${nickname}`} className={base.titleWrapper}>
                                <Badge image={avatar} text={nickname} isUserAvatar />

                                <Text>{nickname}</Text>
                            </Link>
                        ) : (
                            <div className={base.titleWrapper}>
                                <Badge icon={<Ghost />} />

                                <Text>Анонимный</Text>
                            </div>
                        )}

                        <Tooltip title="Пометить как просмотренное">
                            <IconButton small variant="light" onClick={readWarnHandler}>
                                <Eye />
                            </IconButton>
                        </Tooltip>
                    </div>

                    <Text variant="text2" fontWeight={600}>
                        {formatDate(createdAt)}
                    </Text>

                    <Text>
                        <Dotdotdot clamp={3} tagName="span">
                            {text}
                        </Dotdotdot>
                    </Text>
                </div>

                <Button variant="light" onClick={() => setModalText(true)}>
                    Подробнее
                </Button>
            </div>

            <Modal
                title={`Обращение от ${user ? nickname : 'Анонимного пользователя'}`}
                value={modalText}
                setValue={setModalText}
            >
                {text}
            </Modal>
        </>
    );
};

export default WarnItem;
