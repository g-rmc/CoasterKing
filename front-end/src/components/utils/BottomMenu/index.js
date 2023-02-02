import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { ThemeContext } from "../../../contexts";
import { Container, MyListButton, MainButton, CoastersButton } from "./style";

import lightModeLogo from "../../../assets/CoasterKing_LightMode.png";
import darkModeLogo from "../../../assets/CoasterKing_DarkMode.png";
import { UserContext } from "../../../contexts";


export function BottomMenu() {
    const navigate = useNavigate();

    const { darkMode, themeCodeObj } = useContext(ThemeContext);
    const { setLoading } = useContext(UserContext)
    const screenViewed = window.location.pathname;

    function handleClick(route) {
        setLoading(true);
        navigate(route);
    }

    return(
        <Container themeCode={themeCodeObj}>

            <MyListButton onClick={() => {handleClick("/mylist")}} themeCode={themeCodeObj} screenViewed={screenViewed}>
                <h1>Minha lista</h1>
            </MyListButton>

            <MainButton onClick={() => {handleClick("/main")}} themeCode={themeCodeObj} screenViewed={screenViewed}>
                {
                    darkMode?
                    <img src={darkModeLogo} alt="Logo" />
                    :
                    <img src={lightModeLogo} alt="Logo" />
                }
            </MainButton>

            <CoastersButton onClick={() => {handleClick("/coasters")}} themeCode={themeCodeObj} screenViewed={screenViewed}>
                <h1>Montanhas-russas</h1>
            </CoastersButton>

        </Container>
    )
}