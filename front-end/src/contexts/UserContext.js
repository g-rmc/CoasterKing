import { createContext, useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import fireBaseConfig from "../services/firebaseConfig";
import { coasterKingAPI } from "../services/coasterkingAPI";

const provider = new GoogleAuthProvider();

const userObjType = {
    id: '',
    email: '',
    displayName: '',
    accessToken: '',
    photoURL: '',
    uid: '',
}

const UserContext = createContext();

function UserContextProvider({ children }) {
    const [user, setUser] = useState(userObjType);
    const [loading, setLoading] = useState(false);
    const config = {headers: {Authorization: `Bearer ${user.accessToken}`}};
    
    const auth = getAuth(fireBaseConfig);
    
    async function signInGoogle() {
        try {
            const result = await signInWithPopup(auth, provider);
            const APIuserObj = {
                email: result.user.email,
                displayName: result.user.displayName,
                accessToken: result.user.accessToken,
                photoURL: result.user.photoURL,
                uid: result.user.uid,
            }
            const { userId } = await coasterKingAPI.createUpdateUser(APIuserObj);
            setUser({...APIuserObj, userId});
            window.localStorage.setItem("CoasterKING_access", JSON.stringify({token: result.user.accessToken}));
        } catch (error) {
            alert('Erro no login com Google, tente novamente!');
        };
    };

    function signOutGoogle() {
        setUser(userObjType);
        window.localStorage.removeItem("CoasterKING_access");
    };

    return (
        <UserContext.Provider
            value={{user, setUser, loading, setLoading, signInGoogle, signOutGoogle, config}}
        >
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserContextProvider };
