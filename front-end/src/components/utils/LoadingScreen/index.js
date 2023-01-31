import React, { useContext } from "react";

import { UserContext } from "../../../contexts/UserContext";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { Container } from "./style";

import lightModeGif from "../../../assets/lightmode.gif";
import darkModeGif from "../../../assets/darkmode.gif";


export function Loading() {
    const { loading } = useContext(UserContext);
    const { darkMode, themeCodeObj } = useContext(ThemeContext);

    if(!loading) return <></>;

    return (
        <Container themeCode={themeCodeObj}>
            <img src={darkMode? darkModeGif : lightModeGif} alt='loading' />
            <h1>Carregando</h1>
        </Container>
    )
}