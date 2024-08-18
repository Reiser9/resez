'use client';

import React from 'react';

type SidebarContextProps = {
    showSidebar: boolean;
    setShowSidebar: (value: boolean) => void;
};

const SidebarContext = React.createContext<SidebarContextProps | null>(null);

export const useSidebarContext = () => {
    const data = React.useContext(SidebarContext);

    if (!data) {
        throw new Error('Can not useSidebarContext outside of the SidebarProvider');
    }

    return data;
};

const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
    const [showSidebar, setShowSidebar] = React.useState(false);

    return <SidebarContext.Provider value={{ showSidebar, setShowSidebar }}>{children}</SidebarContext.Provider>;
};

export default SidebarProvider;
