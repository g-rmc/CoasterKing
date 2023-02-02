import React, { useContext, useEffect, useState } from "react";

import { ThemeContext, UserContext, QueryContext } from "../../../contexts";

import { Container, UserContainer } from "./style";

export function Ranking() {
    const { themeCodeObj } = useContext(ThemeContext);
    const { setLoading, config } = useContext(UserContext);
    const { coasterKingAPI } = useContext(QueryContext);
    const [ ranking, setRanking ] = useState([]);

    useEffect(() => {
        async function loadAPI() {
            try {
                const rankingList = (await coasterKingAPI.getUsersRanking(config)).data;
                setRanking(rankingList)
                setTimeout(() => setLoading(false), 300);
            } catch (error) {
                console.log(error.message);
                setLoading(false);
            }
        }
        loadAPI();
    }, [coasterKingAPI, config, setLoading]);

    function RankingPosition({user}) {
        return (
            <UserContainer themeCode={themeCodeObj}>
                <div>
                    <h1>{user.ranking}º</h1>
                    <img src={user.photoURL} alt='profile' onError={({ currentTarget }) => {
                    currentTarget.onerror = null; 
                    currentTarget.src=`https://ui-avatars.com/api/?background=random&name=${user.displayName}`;
                    }}/>
                    <h2>{user.displayName}</h2>
                </div>
                <h3><b>{user.credits}</b> créditos</h3>
            </UserContainer>
        )
    }

    return (
        <Container themeCode={themeCodeObj}>
            {
                ranking.length > 0?
                ranking.map((user, index) => <RankingPosition key={index} user={user}/>)
                :
                <>Carregando Ranking</>
            }
        </Container>
    )
}