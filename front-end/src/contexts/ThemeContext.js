import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

function themeCode (switchToDark = false) {
    let mode = "light";
    if (switchToDark) mode = "dark";
    return {
        background: `--${mode}-background`,
        title: `--${mode}-title`,
        text: `--${mode}-text`,
        counterText: `--${mode}-counter-text`,
        box: `--${mode}-box`,
        headerBackground: `--${mode}-header-background`,
        headerText: `--${mode}-header-text`,
        menuBase: `--${mode}-menu-base`,
        menuSelected: `--${mode}-menu-selected`,
        menuShadowMain: `--${mode}-menu-shadow-main`,
        menuShadowSide: `--${mode}-menu-shadow-side`
    }
};

export function ThemeContextProvider({ children }) {
    const [darkMode, setDarkMode] = useState(false);
    const themeCodeObj = themeCode(darkMode);

    useEffect(() => {
        const verifiedThemeMode = localStorage.getItem('CoasterKingThemeMode');
        if (verifiedThemeMode === 'dark') {
            setDarkMode(true);
        };
    }, [setDarkMode])

    return (
        <ThemeContext.Provider value={{
            darkMode, setDarkMode, themeCodeObj
        }}>
            {children}
        </ThemeContext.Provider>
    )
}
