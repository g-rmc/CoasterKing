import React, { useContext, useState, useEffect } from "react";


import { QueryContext, ThemeContext } from "../../../contexts";
import { CoasterInfoContainer, StyledCheckBox, StyledStarRating } from "./style";


export function MyListPageContent({coaster}) {
    const { themeCodeObj } = useContext(ThemeContext);
    const { coasterKingAPI } = useContext(QueryContext);
    const [ grade, setGrade ] = useState(null);

    useEffect(() => {
        async function loadAPI() {
            try {
                //const { grade } = (await coasterKingAPI.getRideStatusByCoaster(config, coaster.id)).data;
                //console.log(grade);
            } catch (error) {
                console.log(error.message);
            }
        }
        loadAPI();
    });

    function handleEvent(event, newGrade) {
        console.log(newGrade)
        setGrade(newGrade);
    };

    return (
        <>
            <CoasterInfoContainer themeCode={themeCodeObj}>
                <h1>{coaster.name}</h1>
                <div>
                    <span>
                        <h2>{coaster.parkName}</h2>
                        <StyledStarRating grade={grade} handleEvent={handleEvent} />
                    </span>
                    <span>

                    </span>
                </div>
            </CoasterInfoContainer>
            <StyledCheckBox themeCode={themeCodeObj}>
                
            </StyledCheckBox>
        </>
    )
}