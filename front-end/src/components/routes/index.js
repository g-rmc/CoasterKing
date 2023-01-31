import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

export function PrivateRoutes({children}) { 
    const { user } = useContext(UserContext);
    
    return user.id !== ""? children : <Navigate to="/" />
}