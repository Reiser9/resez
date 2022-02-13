// Конвертация из hex в rgb
export const convertColor = (color) => {
    if(color.substring(0,1) === '#') {
        color = color.substring(1);
    }

    let r = parseInt(color.substring(0,2), 16);
    let g = parseInt(color.substring(2,4), 16);
    let b = parseInt(color.substring(4), 16);

    return `rgba(${r}, ${g}, ${b}, .8)`;
};

// Сравнить элемент с массивом, позвращает истину, если такое элемент есть
export const compareData = (compare, array) => {
    let alreadyUse = false;
    let allUsers = Object.keys(array).map((key) => {
        return array[key]
    });

    for(let i = 0; i < allUsers.length; i++){
        if(allUsers[i].nick.toLowerCase() === compare.toLowerCase()){
            alreadyUse = true;
            break;
        }
    }

    return alreadyUse;
}