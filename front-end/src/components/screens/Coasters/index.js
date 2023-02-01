import React, { useContext, useEffect } from "react";

import { UserContext, ThemeContext, QueryContext, CoastersContext } from "../../../contexts";
import { TopBar, BottomMenu, CoasterCard } from "../../utils";
import { CoastersList, Container, Header } from "./style";


export function Coasters() {
    const { setLoading, config } = useContext(UserContext);
    const { themeCodeObj } = useContext(ThemeContext);
    const { coasterKingAPI } = useContext(QueryContext);
    const { coasters, setCoasters } = useContext(CoastersContext);

    useEffect(() => {
        async function loadAPI() {
            try {
                const coasterList = (await coasterKingAPI.getCoasters(config)).data;
                setCoasters(coasterList);
                setLoading(false);
            } catch (error) {
                console.log(error.message);
                setLoading(false);
            }
        }
        loadAPI();
    }, [coasterKingAPI, setCoasters, setLoading, config]);
    
    return (
        <Container themeCode={themeCodeObj}>
            <TopBar />
            <Header themeCode={themeCodeObj}>Marque quais você já andou</Header>
            <CoastersList>
                {
                    coasters?
                    coasters.map((coaster, index) => <CoasterCard key={index} coaster={coaster} />)
                    :
                    <></>
                }
            </CoastersList>
            <BottomMenu />
        </Container>
    )
}