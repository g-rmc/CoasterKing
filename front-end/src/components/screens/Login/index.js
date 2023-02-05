import React, { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BsGoogle } from "react-icons/bs";

import { ThemeContext, UserContext, QueryContext } from "../../../contexts";
import { Container, Header, StyledButton } from "./style";

import lightModeLogo from "../../../assets/CoasterKing_LightMode.png";
import darkModeLogo from "../../../assets/CoasterKing_DarkMode.png";

export function Login () {
    const { darkMode, themeCodeObj } = useContext(ThemeContext);
    const { signInGoogle, setLoading, setUser, user } = useContext(UserContext);
    const { coasterKingAPI, setConfig } = useContext(QueryContext);

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        async function loadAPI() {
            const accessToken = window.localStorage.getItem("CoasterKING_access");
            if(!accessToken) return setLoading(false);
            try {
                const { token } = JSON.parse(accessToken);
                const userData = (await coasterKingAPI.getUserByToken(setConfig(token))).data;
                setUser(userData);
                navigate("/main");
            } catch (error) {
                console.log(error.message);
                setLoading(false);
            }
        }
        loadAPI();
    }, [coasterKingAPI, setConfig, setLoading, setUser, navigate]);

    useEffect(() => {
        if(user.id) navigate("/main");
    });

    async function handleClick() {
        await signInGoogle();
        navigate("/main");
    }

    return (
        <Container themeCode={themeCodeObj}>
            <Header themeCode={themeCodeObj}>
                {
                    darkMode?
                    <img src={darkModeLogo} alt="Logo"/>
                    :
                    <img src={lightModeLogo} alt="Logo"/>
                }
                <h1>Coaster</h1>
                <h2>KING</h2>
            </Header>
            <StyledButton themeCode={themeCodeObj} onClick={handleClick}>
                <BsGoogle />
                <h1>Conectar via <b>Google</b></h1>
            </StyledButton>
            
        </Container>
    )
}
