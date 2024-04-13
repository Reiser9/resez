'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import styles from './index.module.scss';

import { MessengerSidebar } from '@/widgets/MessengerSidebar';
import { MessengerDialog } from '@/widgets/MessengerDialog';

const MessengerPage = ({ params }: { params: { id: string[] | undefined } }) => {
    const [dialogId, setDialogId] = React.useState<string | undefined>(undefined);

    const router = useRouter();
    const { id } = params || {};

    React.useEffect(() => {
        if (!id || !/^\d+$/.test(String(id))) {
            return router.push('/messenger');
        }

        setDialogId(String(id));
    }, [id]);

    return (
        <div className={styles.messanger}>
            <MessengerDialog dialogId={dialogId} />

            <MessengerSidebar dialogId={dialogId} />
        </div>
    );
};

export default MessengerPage;
