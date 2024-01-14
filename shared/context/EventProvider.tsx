"use client";

import React from 'react';

import { EventAnimation } from '../ui/EventAnimation';

type EventContextProps = {
    showParticles: boolean;
    toggleShowParticles: () => void
}

const EventContext = React.createContext<EventContextProps | null>(null);

export const useEventContext = () => {
    const data = React.useContext(EventContext);

    if(!data){
        throw new Error("Can not useEventContext outside of the EventProvider");
    }

    return data;
}

const EventProvider = ({children}: {children: React.ReactNode}) => {
    const [showParticles, setShowParticles] = React.useState<boolean>(true);

    const toggleShowParticles = () => {
        localStorage.setItem("showParticles", String(!showParticles));
        setShowParticles(prev => !prev);
    }

    React.useEffect(() => {
        const showParticlesLocal = localStorage.getItem("showParticles");

        if(showParticlesLocal === "false"){
            localStorage.setItem("showParticles", String(false));
            setShowParticles(false);
        }
    }, []);

    return (
        <EventContext.Provider value={{showParticles, toggleShowParticles}}>
            <EventAnimation />

            {children}
        </EventContext.Provider>
    )
}

export default EventProvider;