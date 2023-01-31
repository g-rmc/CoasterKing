import React, { useContext, useEffect } from "react";

import { UserContext, ThemeContext } from "../../../contexts";
import { TopBar, BottomMenu } from "../../utils";
import { Container } from "./style";


export function Mylist() {
    const { setLoading } = useContext(UserContext);
    const { darkMode, themeCodeObj } = useContext(ThemeContext);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {setLoading(false)}, 2000);
    }, [setLoading]);
    
    return (
        <Container themeCode={themeCodeObj}>
            <TopBar />
            <h1 style={darkMode? {color:"white"} : {color:"black"}}>Em breve...</h1>
            <BottomMenu />
        </Container>
    )
}