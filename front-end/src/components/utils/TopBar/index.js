import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { ThemeContext } from "../../../contexts/ThemeContext";
import { UserContext } from "../../../contexts/UserContext";
import { Container } from "./style";

export function TopBar() {
    const { signOutGoogle, user } = useContext(UserContext);
    const { themeCodeObj } = useContext(ThemeContext);

    const navigate = useNavigate();

    async function handleLogout() {
        // eslint-disable-next-line no-restricted-globals
        const logout = confirm('Você realmente deseja fazer logout?');
        if(logout){
            await signOutGoogle();
            navigate("/");
        };
    }

    function stringDisplayName() {
        let name = user.displayName;
        name = name.split(" ");
        name = name[0] + "+" + name[1];
        return name
    }

    return (
        <Container themeCode={themeCodeObj}>
            <img src={user.photoURL} alt='profile' onClick={handleLogout} onError={({ currentTarget }) => {
            currentTarget.onerror = null; 
            currentTarget.src=`https://ui-avatars.com/api/?background=random&name=${stringDisplayName()}`;
          }}/>
            <div>
                <h1>Coaster</h1>
                <h2>KING</h2>
            </div>
            <div></div>
        </Container>
    ) 
}