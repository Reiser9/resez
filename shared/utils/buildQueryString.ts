type QueryParams = {
    [key: string]: string | number | boolean | null | undefined;
};

export const buildQueryString = (params: QueryParams) => {
    return Object.keys(params)
        .filter((key) => params[key] !== null && params[key] !== undefined && params[key] !== '')
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(String(params[key]))}`)
        .join('&');
};

export const getQueryParams = (queryString: string): QueryParams => {
    const params: QueryParams = {};
    const searchParams = new URLSearchParams(queryString);

    searchParams.forEach((value, key) => {
        params[key] = value;
    });

    return params;
};
