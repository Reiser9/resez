import { Archive, Edit, Plus, Unknown } from '@/shared/icons';

export const getLogTypeByType = (type: string) => {
    switch (type) {
        case 'Создание предмета':
        case 'Создание задания':
            return <Plus />;
        case 'Редактирование предмета':
        case 'Редактирование задания':
            return <Edit />;
        case 'Архивация предмета':
        case 'Архивация задания':
            return <Archive />;
        default:
            return <Unknown />;
    }
};
