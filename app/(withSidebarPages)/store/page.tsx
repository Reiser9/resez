'use client';

import React from 'react';
import cn from 'classnames';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { InfoBlock } from '@/shared/ui/InfoBlock';
import { Brush, StorePersonalization } from '@/shared/icons';
import { Button } from '@/shared/ui/Button';
import ResezPremium from '@/shared/icons/images/ResezPremium';
import ResezPremiumPlus from '@/shared/icons/images/ResezPremiumPlus';
import { Text } from '@/shared/ui/Text';

const Store = () => {
    return (
        <div className={base.baseWrapperGap16}>
            <InfoBlock
                icon={<Brush />}
                title="Магазин персонализаций"
                text="Устали от однообразия? Хотите добавить немного красок и индивидуальности в свой профиль? Наш магазин персонализаций создан специально для вас! Мы предлагаем уникальные украшения, которые помогут выделиться и выразить себя."
                button={
                    <Button href="/store/personalization" auto variant="light" small style={{ marginTop: '0.8rem' }}>
                        Перейти
                    </Button>
                }
                image={<StorePersonalization />}
            />

            <div className={styles.storeSubscriptionBlock}>
                <div className={styles.storeSubscriptionLogoInner}>
                    <ResezPremium />
                    <ResezPremiumPlus />
                </div>

                <Text variant='h3' fontWeight={600}>Подписка ResEz</Text>

                <Text>Заниматься у нас можно и без подписки, но с подпиской вы получаете множество дополнительных возможностей</Text>

                <Button href='/store/subscription' auto small variant='light'>
                    Подробнее
                </Button>
            </div>
        </div>
    );
};

export default Store;
