import React from 'react';

const useSettings = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const changeSettings = async () => {

    }

    return {
        isLoading,
        changeSettings
    };
};

export default useSettings;
