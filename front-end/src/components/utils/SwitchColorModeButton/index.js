import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../../../contexts";
import { BsSun, BsMoon } from "react-icons/bs";

import { Container } from "./style";

export function SwitchColorModeButton() {
    const { darkMode, setDarkMode, themeCodeObj } = useContext(ThemeContext);

    function changeTheme () {
        darkMode?
        localStorage.setItem('CoasterKingThemeMode', 'light')
        :
        localStorage.setItem('CoasterKingThemeMode', 'dark');
        setDarkMode(!darkMode)
    }

    return (
        <Container onClick={changeTheme} themeCode={themeCodeObj}>
            {
                darkMode?
                <BsMoon/>
                :
                <BsSun/>
            }
        </Container>
    )
}