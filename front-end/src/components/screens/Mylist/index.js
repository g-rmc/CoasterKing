import React, { useContext, useEffect } from "react";

import { UserContext, ThemeContext, QueryContext, CoastersContext } from "../../../contexts";
import { TopBar, BottomMenu, CoasterCard } from "../../utils";
import { CoastersList, Container, Header } from "./style";


export function Mylist() {
    const { setLoading, config } = useContext(UserContext);
    const { themeCodeObj } = useContext(ThemeContext);
    const { coasterKingAPI } = useContext(QueryContext);
    const { userCoasters, setUserCoasters } = useContext(CoastersContext);

    useEffect(() => {
        async function loadAPI() {
            try {
                const coasterList = (await coasterKingAPI.getUsersCoasters(config)).data;
                setUserCoasters(coasterList);
                setTimeout(() => setLoading(false), 500);
            } catch (error) {
                console.log(error.message);
                setLoading(false);
            }
        }
        loadAPI();
    }, [coasterKingAPI, setUserCoasters, setLoading, config]);
    
    return (
        <Container themeCode={themeCodeObj}>
            <TopBar />
            <Header themeCode={themeCodeObj}>Avalie sua experiência</Header>
            <CoastersList>
                {
                    /*coasters?
                    coasters.map((coaster, index) => <CoasterCard key={index} coaster={coaster} />)
                    :
                    <></>*/
                }
            </CoastersList>
            <BottomMenu />
        </Container>
    )
}