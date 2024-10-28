import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import styles from './index.module.scss';

import { ResCoin } from '@/shared/icons';
import { useUsers } from '@/features/user';

import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';

type Props = {
    balance?: number;
};

const BalanceBlock: React.FC<Props> = ({ balance }) => {
    const { id } = useParams();
    const queryClient = useQueryClient();
    const { changeUserBalance } = useUsers();

    const invalidateRequest = () => {
        queryClient.invalidateQueries({ queryKey: ['admin_user_main_info'] });
    };

    const changeBalanceHandler = (value: number) => {
        changeUserBalance(String(id), value, invalidateRequest);
    };

    return (
        <div className={styles.userInfoItem}>
            <Text variant="h4" fontWeight={600}>
                Баланс
            </Text>

            <div className={styles.userInfoBalance}>
                <Text fontWeight={600}>{balance}</Text>
                <ResCoin />
            </div>

            <div className={styles.userInfoBalanceButtons}>
                <Button auto variant="light" small onClick={() => changeBalanceHandler(1)}>
                    +1
                </Button>

                <Button auto variant="light" small onClick={() => changeBalanceHandler(10)}>
                    +10
                </Button>

                <Button auto variant="light" small onClick={() => changeBalanceHandler(50)}>
                    +50
                </Button>

                <Button auto variant="light" small onClick={() => changeBalanceHandler(-1)}>
                    -1
                </Button>

                <Button auto variant="light" small onClick={() => changeBalanceHandler(-10)}>
                    -10
                </Button>

                <Button auto variant="light" small onClick={() => changeBalanceHandler(-50)}>
                    -50
                </Button>
            </div>

            {/* <Button variant="light">Изменить</Button> */}
        </div>
    );
};

export default BalanceBlock;
