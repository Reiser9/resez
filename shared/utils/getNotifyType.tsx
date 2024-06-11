import { Warn, News, Gift, Vote, Added, Tools, Unknown } from '../icons';

export const getNotifyType = (type?: string) => {
    switch (type) {
        case 'Сессия':
            return {
                icon: <Warn />,
                name: 'session',
            };
        case 'Информация':
            return {
                icon: <News />,
                name: 'info',
            };
        case 'Подарок':
            return {
                icon: <Gift />,
                name: 'gift',
            };
        case 'Голосование':
            return {
                icon: <Vote />,
                name: 'vote',
            };
        case 'Добавление':
            return {
                icon: <Added />,
                name: 'added',
            };
        case 'Обновление':
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
