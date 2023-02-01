import { createContext, useState } from "react";

const CoastersContext = createContext();

function CoastersContextProvider ({ children }) {
    const [coasters, setCoasters] = useState();
    const [userCoasters, setUserCoasters] = useState();

    return (
        <CoastersContext.Provider value={{coasters, setCoasters, userCoasters, setUserCoasters}}>
            {children}
        </CoastersContext.Provider>
    )
}

export { CoastersContext, CoastersContextProvider, };
