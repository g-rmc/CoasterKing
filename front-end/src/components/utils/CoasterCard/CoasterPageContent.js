import React, { useContext, useState, useEffect } from "react";
import { AiFillStar, AiFillHeart, AiOutlineCheck } from "react-icons/ai";

import { ThemeContext, UserContext, QueryContext } from "../../../contexts";
import { CoasterInfoContainer, StyledCheckBox, StyledEvaluation } from "./style";


export function CoasterPageContent({coaster}) {
    const { themeCodeObj } = useContext(ThemeContext);
    const { setLoading, config } = useContext(UserContext);
    const { coasterKingAPI } = useContext(QueryContext);
    const [ ridedCoaster, setRidedCoaster ] = useState(false);

    useEffect(() => {
        async function loadAPI() {
            try {
                const { rideStatus } = (await coasterKingAPI.getRideStatusByCoaster(config, coaster.id)).data;
                setRidedCoaster(rideStatus);
            } catch (error) {
                console.log(error.message);
            }
        }
        loadAPI();
    });

    async function handleChangeStatus() {
        setLoading(true);
        try {
            if(ridedCoaster) {
                await coasterKingAPI.deleteRideStatusByCoaster(config, coaster.id);
            } else {
                await coasterKingAPI.postRideStatusByCoaster(config, coaster.id);
            }
        } catch (error) {
            console.log(error.message);
        }
        setLoading(false);
    }

    return (
        <>
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
                            <h1>{coaster._avg.grade.toFixed(1)}</h1>
                        </StyledEvaluation>
                        <StyledEvaluation themeCode={themeCodeObj} icon={"heart"}>
                            <AiFillHeart />
                            <h1>{coaster._count.favorites}</h1>
                        </StyledEvaluation>
                    </span>
                </div>
            </CoasterInfoContainer>
            <StyledCheckBox themeCode={themeCodeObj} onClick={handleChangeStatus}>
                { ridedCoaster? <AiOutlineCheck /> : <></>}
            </StyledCheckBox>
        </>
    )
}