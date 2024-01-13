export const getHolidayEvent = (): {icon: string; decor: string; class: string; name: string } => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;

    if (month === 12 || month === 1 || month === 2) {
        return {
            icon: '/img/newyear.svg',
            decor: '/img/newyear-decor.svg',
            class: 'newyear',
            name: "newyear"
        };
    }

    if ((month === 10 && day >= 27) || (month === 11 && day <= 3)) {
        return {
            icon: '/img/halloween.svg',
            decor: '/img/halloween-decor.svg',
            class: 'halloween',
            name: "halloween"
        };
    }

    return {
        icon: '',
        decor: '',
        class: '',
        name: ''
    };
}