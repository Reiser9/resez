import { Added, Gift, Info, Tools, Vote, Warn } from '../icons';

export const NOTIFY_TYPES = [
    {
        type: 'Информация',
        name: 'INFO',
        id: 1,
        icon: <Info />,
    },
    {
        type: 'Добавление',
        name: 'ADD',
        id: 2,
        icon: <Added />,
    },
    {
        type: 'Сессия',
        name: 'SESSION',
        id: 3,
        icon: <Warn />,
    },
    {
        type: 'Подарок',
        name: 'GIFT',
        id: 4,
        icon: <Gift />,
    },
    {
        type: 'Голосование',
        name: 'VOTING',
        id: 5,
        icon: <Vote />,
    },
    {
        type: 'Обновление',
        name: 'UPDATE',
        id: 6,
        icon: <Tools />,
    },
];
