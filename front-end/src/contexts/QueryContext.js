import { createContext } from "react";
import { coasterKingAPI } from "../services/coasterkingAPI";

export const QueryContext = createContext();

export function QueryContextProvider ({ children }) {
    function setConfig(token) {
        return {headers: {Authorization: `Bearer ${token}`}}
    }

    return (
        <QueryContext.Provider value={{coasterKingAPI, setConfig}}>
            {children}
        </QueryContext.Provider>
    )
}