'use client';

import React from 'react';
import cn from 'classnames';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import type { Promocode } from '../model';

import { Text } from '@/shared/ui/Text';
import { TextPoint } from '@/shared/ui/TextPoint';
import { formatDate } from '@/shared/utils/formatDate';
import { Badge } from '@/shared/ui/Badge';
import { HoverMenu, MenuLink } from '@/shared/ui/HoverMenu';
import { IconButton } from '@/shared/ui/Button';
import { Delete, DotsHorizontal } from '@/shared/icons';
import Link from 'next/link';

type Props = {
    data: Promocode;
    finishPromocode?: () => void;
};

const PromocodeItem: React.FC<Props> = ({ data, finishPromocode = () => {} }) => {
    const { code, limit, expiredDate, coins, xp, activationsCount, creator, isFinished, createdAt, id } = data || {};
    const { nickname, avatar } = creator || {};

    const [collectionItemMenu, setCollectionItemMenu] = React.useState(false);

    return (
        <div className={cn(base.item3, styles.promocodeItem)}>
            <div className={base.titleInnerNowrap}>
                <Link href={`/admin/promo/${id}`}>
                    <Text fontWeight={600}>{code}</Text>
                </Link>

                {!isFinished && (
                    <HoverMenu
                        button={
                            <IconButton variant="light" small onClick={() => setCollectionItemMenu(true)}>
                                <DotsHorizontal />
                            </IconButton>
                        }
                        value={collectionItemMenu}
                        setValue={setCollectionItemMenu}
                    >
                        <MenuLink
                            danger
                            onClick={() => {
                                setCollectionItemMenu(false);
                                finishPromocode();
                            }}
                        >
                            <Delete />
                            Завершить
                        </MenuLink>
                    </HoverMenu>
                )}
            </div>

            <TextPoint title="Количество активаций:" text={`${activationsCount} / ${limit ?? 'Безлимитно'}`} />
            <TextPoint title="Дата истечения:" text={expiredDate ? formatDate(expiredDate) : '-'} />
            <div className={base.titleWrapper}>
                <Badge image={avatar} text={nickname} />

                <Text>{nickname}</Text>
            </div>
            <TextPoint title="Дата создания:" text={formatDate(createdAt)} />
            {!!coins && <TextPoint title="Монеты:" text={coins} />}
            {!!xp && <TextPoint title="Опыт:" text={xp} />}
        </div>
    );
};

export default PromocodeItem;
