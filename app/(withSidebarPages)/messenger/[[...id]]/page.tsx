'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import styles from './index.module.scss';

import { MessengerSidebar } from '@/widgets/MessengerSidebar';
import { MessengerDialog } from '@/widgets/MessengerDialog';
import { useAppDispatch } from '@/shared/hooks/useRedux';
import { setCurrentDialogId } from '@/store/slices/messenger';

const MessengerPage = ({ params }: { params: { id: string[] | undefined } }) => {
    const [dialogId, setDialogId] = React.useState<string | undefined>(undefined);

    const router = useRouter();
    const dispatch = useAppDispatch();
    const { id } = params || {};

    React.useEffect(() => {
        if (!id || !/^\d+$/.test(String(id))) {
            return router.push('/messenger');
        }

        setDialogId(String(id));
        dispatch(setCurrentDialogId(String(id)));

        return () => {
            dispatch(setCurrentDialogId(null));
        };
    }, [id]);

    return (
        <div className={styles.messanger}>
            <MessengerDialog dialogId={dialogId} />

            <MessengerSidebar dialogId={dialogId} />
        </div>
    );
};

export default MessengerPage;
