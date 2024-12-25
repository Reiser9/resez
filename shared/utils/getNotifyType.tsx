import { Warn, News, Gift, Vote, Added, Tools, Unknown } from '../icons';

export const getNotifyType = (type?: string) => {
    switch (type) {
        case 'SESSION':
            return {
                icon: <Warn />,
                name: 'session',
            };
        case 'INFO':
            return {
                icon: <News />,
                name: 'info',
            };
        case 'GIFT':
            return {
                icon: <Gift />,
                name: 'gift',
            };
        case 'VOTING':
            return {
                icon: <Vote />,
                name: 'vote',
            };
        case 'ADD':
            return {
                icon: <Added />,
                name: 'added',
            };
        case 'UPDATE':
            return {
                icon: <Tools />,
                name: 'update',
            };
        default:
            return {
                icon: <Unknown />,
                name: 'unknown',
            };
    }
};
