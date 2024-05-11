"use client";

import React from 'react';

import { ChangeThemeAnimate } from '../ui/ChangeThemeAnimate';

export type ThemeType = "light" | "dark";

type ThemeContextProps = {
    theme: ThemeType;
    toggleTheme: () => void;
    readyAnimation: boolean;
}

const ThemeContext = React.createContext<ThemeContextProps | null>(null);

export const useThemeContext = () => {
    const data = React.useContext(ThemeContext);

    if(!data){
        throw new Error("Can not useThemeContext outside of the ThemeProvider");
    }

    return data;
}

const ThemeProvider = ({children}: {children: React.ReactNode}) => {
    const [theme, setTheme] = React.useState<ThemeType>("light");
    const [readyAnimation, setReadyAnimation] = React.useState<boolean>(false);

    const changeThemeBody = (theme: ThemeType) => {
        document.body.classList.remove("light", "dark");
        document.body.classList.add(theme);
    }

    const toggleTheme = () => {
        setReadyAnimation(true);
        const newTheme = theme === "light" ? "dark" : "light";

        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);

        setTimeout(() => {
            changeThemeBody(newTheme);
        }, 1000);
    }

    React.useEffect(() => {
        let themeLocal = localStorage.getItem("theme") as ThemeType;
        
        if(themeLocal !== "light" && themeLocal !== "dark"){
            themeLocal = "light";
        }

        if(themeLocal){
            setTheme(themeLocal);
            changeThemeBody(themeLocal);
        }
    }, []);

    return (
        <ThemeContext.Provider value={{theme, toggleTheme, readyAnimation}}>
            <ChangeThemeAnimate />

            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;