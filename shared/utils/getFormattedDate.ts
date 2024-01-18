export const getFormattedDate = (date: Date): string => {
    const newDate = new Date(date);
    
    const now = new Date();
    const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);

    const isToday = newDate.toDateString() === now.toDateString();
    
    const isYesterday = newDate.toDateString() === yesterday.toDateString();
    const isThisYear = newDate.getFullYear() === now.getFullYear();

    if (isToday) {
        return `Сегодня в ${formatTime(newDate)}`;
    } else if (isYesterday) {
        return `Вчера в ${formatTime(newDate)}`;
    } else if (isThisYear) {
        return `${newDate.getDate()} ${getMonthName(newDate.getMonth())} в ${formatTime(newDate)}`;
    } else {
        return `${newDate.getDate()} ${getMonthName(newDate.getMonth())} ${date.getFullYear()}`;
    }
};

const formatTime = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};

const getMonthName = (month: number): string => {
    const monthNames = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря',
    ];

    return monthNames[month];
};
