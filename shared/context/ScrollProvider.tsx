'use client';

import React from 'react';

type ScrollContextProps = {
    scrollBlock: React.MutableRefObject<HTMLDivElement | null>;
};

const ScrollContext = React.createContext<ScrollContextProps | null>(null);

export const useScrollContext = () => {
    const data = React.useContext(ScrollContext);

    if (!data) {
        throw new Error('Can not useScrollContext outside of the ScrollProvider');
    }

    return data;
};

const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
    const scrollRef = React.useRef<null | HTMLDivElement>(null);

    return <ScrollContext.Provider value={{ scrollBlock: scrollRef }}>{children}</ScrollContext.Provider>;
};

export default ScrollProvider;
