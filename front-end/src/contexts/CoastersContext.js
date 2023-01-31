import { createContext, useState } from "react";

const CoastersContext = createContext();

function CoastersContextProvider ({ children }) {
    const [coasters, setCoasters] = useState();

    return (
        <CoastersContext.Provider value={{coasters, setCoasters}}>
            {children}
        </CoastersContext.Provider>
    )
}

export { CoastersContext, CoastersContextProvider };
