export const generatePairs = (arr: string[]) => {
    if (!arr.length) {
        return [''];
    }

    const result: string[] = [];

    const permute = (arr: string[], l: number, r: number) => {
        if (l === r) {
            result.push(arr.join(''));
        } else {
            for (let i = l; i <= r; i++) {
                [arr[l], arr[i]] = [arr[i], arr[l]];
                permute(arr, l + 1, r);
                [arr[l], arr[i]] = [arr[i], arr[l]];
            }
        }
    };

    permute(arr, 0, arr.length - 1);

    return result;
};
