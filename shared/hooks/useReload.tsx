'use client';

import React from 'react';

import useRequest from './useRequest';

const useReload = () => {
    const [isLoadingReload, setIsLoadingReload] = React.useState<boolean>(false);

    const { getHealthServer } = useRequest();

    const reload = async () => {
        setIsLoadingReload(true);
        await getHealthServer();
        setIsLoadingReload(false);
    };

    return {
        isLoadingReload,
        reload,
    };
};

export default useReload;
