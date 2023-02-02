import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { UserContext, ThemeContext, QueryContext } from "../../../contexts";
import { TopBar, BottomMenu, CoasterCard } from "../../utils";
import { CoastersList, Container, Header } from "./style";


export function CoastersLists() {
    const location = useLocation();
    const { setLoading, config } = useContext(UserContext);
    const { themeCodeObj } = useContext(ThemeContext);
    const { coasterKingAPI } = useContext(QueryContext);
    const [ allCoasters, setAllCoasters ] = useState();
    const [ userCoasters, setUserCoasters ] = useState();

    useEffect(() => {
        async function loadAPI() {
            try {
                if (location.pathname === "/coasters") {
                    const coasterList = (await coasterKingAPI.getCoasters(config)).data;
                    setAllCoasters(coasterList)
                }
                if (location.pathname === "/mylist") {
                    const coasterList = (await coasterKingAPI.getUserCoasters(config)).data;
                    setUserCoasters(coasterList)
                }
                setTimeout(() => setLoading(false), 300);
            } catch (error) {
                console.log(error.message);
                setLoading(false);
            }
        }
        loadAPI();
    }, [coasterKingAPI, setAllCoasters, setUserCoasters, setLoading, config, location.pathname]);
    
    function switchRenderedCoasterList() {
        console.log()
        if (location.pathname === "/mylist" && !userCoasters) {
            return <p>Parece que você ainda não selecionou nenhum montanha-russa :(</p>;
        };
        if (location.pathname === "/mylist" && userCoasters) {
            return userCoasters.map((coaster, index) => <CoasterCard key={index} coaster={coaster} />);
        };
        if (location.pathname === "/coasters" && allCoasters) {
            return allCoasters.map((coaster, index) => <CoasterCard key={index} coaster={coaster} />);
        };
    }

    return (
        <Container themeCode={themeCodeObj}>
            <TopBar />
            <Header themeCode={themeCodeObj}>
                {
                    location.pathname === "/coasters" ?
                    "Marque quais você já andou"
                    :
                    "Avalie sua experiência"
                }
            </Header>
            <CoastersList themeCode={themeCodeObj}>
                {switchRenderedCoasterList()}
            </CoastersList>
            <BottomMenu />
        </Container>
    )
}