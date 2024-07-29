'use client';

import React from 'react';

import base from '@/shared/styles/base.module.scss';

import { Text } from '@/shared/ui/Text';

const StoreCoins = () => {
    return (
        <div className={base.baseWrapperGap8}>
            <Text variant="h3">ResCoins</Text>

            <Text>В первую очередь, это поддержка проекта, мы стараемся для вас стать лучше</Text>

            <Text>
                За покупкой ResCoin вы можете обращаться в личные сообщения{' '}
                <a href={process.env.NEXT_PUBLIC_VK_LINK} target="_blank">
                    группы вк
                </a>
            </Text>
        </div>
    );
};

export default StoreCoins;
