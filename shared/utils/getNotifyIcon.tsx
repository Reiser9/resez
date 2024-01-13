import { Success, Info, Warn, Error, Unknown } from '@/shared/icons';

export const getNotifyIcon = (type: string) => {
    switch (type) {
        case 'success':
            return <Success />;
        case 'info':
            return <Info />;
        case 'warn':
            return <Warn />;
        case 'error':
            return <Error />;
        default:
            return <Unknown />;
    }
};
