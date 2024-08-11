import { Bot, Desktop, Mobile, Tablet, Tv, Unknown } from '../icons';

export const getDeviceByName = (name: string | undefined) => {
    switch (name) {
        case 'desktop':
            return {
                icon: <Desktop />,
                name: 'Компьютер',
            };
        case 'mobile':
            return {
                icon: <Mobile />,
                name: 'Телефон',
            };
        case 'tablet':
            return {
                icon: <Tablet />,
                name: 'Планшет',
            };
        case 'tv':
            return {
                icon: <Tv />,
                name: 'Телевизор',
            };
        case 'tv':
            return {
                icon: <Bot />,
                name: 'Бот',
            };
        default:
            return {
                icon: <Unknown />,
                name: 'Неизвестный',
            };
    }
};
