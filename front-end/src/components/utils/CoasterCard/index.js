import React, { useContext } from "react";
import { useLocation } from "react-router-dom";

import { ThemeContext } from "../../../contexts";
import { CoasterPageContent } from "./CoasterPageContent";
import { MyListPageContent } from "./MyListPageContent";
import { Container } from "./style";

export function CoasterCard({coaster}) {
    const location = useLocation();
    const { themeCodeObj } = useContext(ThemeContext);

    function goToRcdb() {
        window.open(`https://rcdb.com/${coaster.rcdbId}.htm`);
    }

    return (
        <Container themeCode={themeCodeObj}>
            <img src={coaster.image} alt="coaster" onClick={goToRcdb}/>
            {
                location.pathname === "/coasters"?
                <CoasterPageContent coaster={coaster}/>
                :
                <MyListPageContent coaster={coaster}/>
            }
        </Container>
    )
}