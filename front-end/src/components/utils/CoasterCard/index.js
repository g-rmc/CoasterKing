import React, { useContext } from "react";
import { AiFillStar, AiFillHeart } from "react-icons/ai";

import { ThemeContext } from "../../../contexts";
import { CoasterInfoContainer, Container, StyledEvaluation } from "./style";

export function CoasterCard({coaster}) {
    const { themeCodeObj } = useContext(ThemeContext);

    function goToRcdb() {
        window.open(`https://rcdb.com/${coaster.rcdbId}.htm`);
    }

    return (
        <Container themeCode={themeCodeObj}>
            <img src={coaster.image} alt="coaster" onClick={goToRcdb}/>
            <CoasterInfoContainer themeCode={themeCodeObj}>
                <h1>{coaster.name}</h1>
                <div>
                    <span>
                        <h2>{coaster.parkName}</h2>
                        <h3><b>{coaster._count.riders} </b> já andaram</h3>  
                    </span>
                    <span>
                        <StyledEvaluation themeCode={themeCodeObj} icon={"star"}>
                            <AiFillStar />
                            <h1>{coaster._avg.grade/10}</h1>
                        </StyledEvaluation>
                        <StyledEvaluation themeCode={themeCodeObj} icon={"heart"}>
                            <AiFillHeart />
                            <h1>{coaster._count.favorites}</h1>
                        </StyledEvaluation>
                    </span>
                </div>
            </CoasterInfoContainer>
            <input type='checkbox' />
        </Container>
    )
}