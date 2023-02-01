import React, { useContext, useEffect, useState } from "react";


import { UserContext, ThemeContext, QueryContext } from "../../../contexts";
import { TopBar, BottomMenu } from "../../utils";
import { Container, Header, StyledCounter } from "./style";


export function Main() {
    const { user, setLoading, config } = useContext(UserContext);
    const { darkMode, themeCodeObj } = useContext(ThemeContext);
    const { coasterKingAPI } = useContext(QueryContext);
    const [ coasterCount, setCoasterCount ] = useState(0);

    useEffect(() => {
        async function loadAPI() {
            try {
                const { userCoastersCount } = (await coasterKingAPI.getMyCoastersCount(config)).data;
                setCoasterCount(userCoastersCount);
                setTimeout(() => setLoading(false), 300);
            } catch (error) {
                console.log(error.message);
                setLoading(false);
            }
        }
        loadAPI();
    });
    
    return (
        <Container themeCode={themeCodeObj}>
            <TopBar />
            <Header themeCode={themeCodeObj}>
                <h2>Oi {user.displayName.split(" ")[0]}, tudo bem?</h2>
                <h1>Você já andou em</h1>
                <StyledCounter darkMode={darkMode} coasterCount={coasterCount}/>
                <h1>montanhas-russas!</h1>
            </Header>
            
            <h1 style={darkMode? {color:"white"} : {color:"black"}}>Em breve...</h1>
            <BottomMenu />
        </Container>
    )
}