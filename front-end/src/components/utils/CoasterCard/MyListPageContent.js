import React, { useContext, useState, useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";


import { QueryContext, ThemeContext, UserContext } from "../../../contexts";
import { CoasterInfoContainer, StyledHeartCheck, StyledStarRating } from "./style";


export function MyListPageContent({coaster}) {
    const { config, loading, setLoading } = useContext(UserContext);
    const { themeCodeObj } = useContext(ThemeContext);
    const { coasterKingAPI } = useContext(QueryContext);
    const [ grade, setGrade ] = useState(null);
    const [ favorite, setFavorite ] = useState(false);

    useEffect(() => {
        async function loadAPI() {
            try {
                const { grade } = (await coasterKingAPI.getRatingByCoaster(config, coaster.id)).data;
                const { favoriteStatus } = (await coasterKingAPI.getFavoriteStatusByCoaster(config, coaster.id)).data;
                setGrade(grade);
                setFavorite(favoriteStatus);
            } catch (error) {
                console.log(error.message);
            }
        }
        loadAPI();
    }, [loading, coasterKingAPI, coaster.id, config]);

    async function handleRatingEvent(_event, newGrade) {
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

    async function handleChangeFavoriteStatus() {
        setLoading(true);
        try {
            if(favorite) {
                await coasterKingAPI.deleteFavoriteStatusByCoaster(config, coaster.id);
            } else {
                await coasterKingAPI.postFavoriteStatusByCoaster(config, coaster.id);
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
                        <StyledStarRating grade={grade} handleEvent={handleRatingEvent} />
                    </span>
                    <span>

                    </span>
                </div>
            </CoasterInfoContainer>
            <StyledHeartCheck onClick={handleChangeFavoriteStatus}>
                {
                    favorite?
                    <AiFillHeart />
                    :
                    <AiOutlineHeart />
                }
            </StyledHeartCheck>
        </>
    )
}