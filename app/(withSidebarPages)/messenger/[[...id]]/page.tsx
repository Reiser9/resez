'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import styles from './index.module.scss';

import { MessengerSidebar } from '@/widgets/MessengerSidebar';
import { MessengerDialog } from '@/widgets/MessengerDialog';
import { useAppDispatch } from '@/shared/hooks/useRedux';
import { setCurrentDialogId } from '@/store/slices/messenger';
import { useProfileData } from '@/features/user';
import { MessengerEmptyData } from '@/shared/icons';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { Preloader } from '@/shared/ui/Preloader';

const MessengerPage = ({ params }: { params: { id: string[] | undefined } }) => {
    const [dialogId, setDialogId] = React.useState<string | undefined>(undefined);

    const router = useRouter();
    const dispatch = useAppDispatch();
    const { getProfileData } = useProfileData();

    const { data, isLoading } = useQuery({
        queryKey: ['profile_data'],
        queryFn: () => getProfileData(),
    });
    const { firstName, lastName } = data || {};

    const { id } = params || {};

    React.useEffect(() => {
        if (!id || !/^\d+$/.test(String(id))) {
            return router.replace('/messenger');
        }

        setDialogId(String(id));
        dispatch(setCurrentDialogId(String(id)));

        return () => {
            dispatch(setCurrentDialogId(null));
        };
    }, [id]);

    if(isLoading){
        return <Preloader page />
    }

    return (
        <>
            {firstName && lastName ? (
                <div className={styles.messanger}>
                    <MessengerDialog dialogId={dialogId} />

                    <MessengerSidebar dialogId={dialogId} />
                </div>
            ) : (
                <div className={styles.messangerNotData}>
                    <MessengerEmptyData className={styles.messangerNotDataIcon} />

                    <Text variant='h3' fontWeight={600} className={styles.messangerNotDataTitle}>Добро пожаловать в месседжер <span>ResEz</span></Text>
                
                    <div className={styles.messangerNotDataPoint}>
                        <Text>Перед началом пользования, нужно заполнить свои данные</Text>
                    </div>

                    <Button href="/profile/data" auto variant='light'>
                        Заполнить
                    </Button>
                </div>
            )}
        </>
    );
};

export default MessengerPage;
