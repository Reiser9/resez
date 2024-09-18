export const isNumber = (str: string) => {
    return /^\d+(\.\d+)?$/.test(str.trim());
};
