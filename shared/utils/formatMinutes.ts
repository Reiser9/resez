export const formatMinutes = (minutes = 0) => {
    if (!minutes) {
        return 0;
    }

    const days = Math.floor(minutes / 1440);
    const hours = Math.floor((minutes % 1440) / 60);
    const remainingMinutes = minutes % 60;

    let result = '';

    if (days > 0) {
        result += `${days} ${days === 1 ? 'день' : 'дня'}`;
    }

    if (hours > 0) {
        result += ` ${hours} ${hours === 1 ? 'час' : 'часа'}`;
    }

    if (remainingMinutes > 0) {
        result += ` ${remainingMinutes} ${remainingMinutes % 10 === 1 ? 'минута' : 'минуты'}`;
    }

    return result.trim();
};
