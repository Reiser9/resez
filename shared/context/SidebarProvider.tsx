'use client';

import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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

    return (
        <DndProvider backend={HTML5Backend}>
            <SidebarContext.Provider value={{ showSidebar, setShowSidebar }}>{children}</SidebarContext.Provider>
        </DndProvider>
    );
};

export default SidebarProvider;
