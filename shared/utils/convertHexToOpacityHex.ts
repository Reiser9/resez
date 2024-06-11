export const convertHexToOpacityHex = (hexColor: string, opacity = '0.1') => {
    if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hexColor)) {
        return hexColor;
    }

    return `${hexColor}${opacity.split('.')[1]}a`;
};
