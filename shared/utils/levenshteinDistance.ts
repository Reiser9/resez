export const levenshteinDistanceOptimized = (a: string, b: string) => {
    if (a.length > b.length) {
        [a, b] = [b, a];
    }

    let previousRow: number[] = Array(a.length + 1).fill(0);
    let currentRow: number[] = Array(a.length + 1).fill(0);

    for (let i = 0; i <= a.length; i++) {
        previousRow[i] = i;
    }

    for (let j = 1; j <= b.length; j++) {
        currentRow[0] = j;
        for (let i = 1; i <= a.length; i++) {
            const insertCost = currentRow[i - 1] + 1;
            const deleteCost = previousRow[i] + 1;
            const replaceCost = previousRow[i - 1] + (a[i - 1] === b[j - 1] ? 0 : 1);
            currentRow[i] = Math.min(insertCost, deleteCost, replaceCost);
        }
        [previousRow, currentRow] = [currentRow, previousRow];
    }

    return previousRow[a.length];
};

export const percentCorrectAnswer = (a: string, b: string) => {
    const distanceLevin = levenshteinDistanceOptimized(a, b);

    return 100 - (distanceLevin / a.length) * 100;
};
