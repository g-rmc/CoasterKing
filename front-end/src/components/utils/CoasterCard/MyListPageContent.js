import React, { useContext, useState, useEffect } from "react";


import { QueryContext, ThemeContext, UserContext } from "../../../contexts";
import { CoasterInfoContainer, StyledCheckBox, StyledStarRating } from "./style";


export function MyListPageContent({coaster}) {
    const { config, loading, setLoading } = useContext(UserContext);
    const { themeCodeObj } = useContext(ThemeContext);
    const { coasterKingAPI } = useContext(QueryContext);
    const [ grade, setGrade ] = useState(null);

    useEffect(() => {
        async function loadAPI() {
            try {
                const { grade } = (await coasterKingAPI.getRatingByCoaster(config, coaster.id)).data;
                setGrade(grade);
            } catch (error) {
                console.log(error.message);
            }
        }
        loadAPI();
    }, [loading, coasterKingAPI, coaster.id, config]);

    async function handleEvent(_event, newGrade) {
        setLoading(true);
        try {
            if(!newGrade) {
                await coasterKingAPI.deleteRatingByCoaster(config, coaster.id);
            };
            if(newGrade) {
                await coasterKingAPI.postRatingByCoaster(config, coaster.id, newGrade);
            }
            setGrade(newGrade);
        } catch (error) {
            console.log(error.message);
        }
        setLoading(false);
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