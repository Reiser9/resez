'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';

import { useMessenger } from '@/features/messenger';
import { Preloader } from '@/shared/ui/Preloader';

const DetectJoinLink = () => {
    const [joinIsLoading, setJoinIsLoading] = React.useState(false);

    const { link } = useParams();
    const router = useRouter();
    const { joinChatFromLink } = useMessenger();

    const joinChatFromLinkHandler = async () => {
        setJoinIsLoading(true);
        const chat = await joinChatFromLink(String(link));
        setJoinIsLoading(false);

        if(!chat){
            return router.push("/");
        }

        router.push(`/messenger/${chat.id}`);
    }

    React.useEffect(() => {
        if (link) {
            joinChatFromLinkHandler();
        }
    }, [link]);

    if(joinIsLoading){
        return <Preloader page small />
    }
};

export default DetectJoinLink;
