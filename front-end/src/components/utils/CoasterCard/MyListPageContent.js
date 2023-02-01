import React, { useContext } from "react";

import { ThemeContext } from "../../../contexts";
import { CoasterInfoContainer, StyledCheckBox } from "./style";


export function MyListPageContent({coaster}) {
    const { themeCodeObj } = useContext(ThemeContext);

    return (
        <>
            <CoasterInfoContainer themeCode={themeCodeObj}>
                <h1>{coaster.name}</h1>
                <div>
                    <span>
                        <h2>{coaster.parkName}</h2>
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