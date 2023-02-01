import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    min-width: 350px;
    max-width: 600px;
    height: 60px;
    padding: 0 55px 0 20px;

    align-items: center;
    justify-content: space-between;
    z-index: 5;

    position: fixed;
    top: 0;
    margin: 0 auto;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    
    ${props => `background: var(${props.themeCode.headerBackground});`}

    img {
        width: 35px;
        height: 35px;
        object-fit: cover;
        border-radius: 50%;
        border: 1px solid black;
        cursor: pointer;
        :hover {
            filter: brightness(0.6)
        }
    };

    div {
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    h1 {
        font-family: 'Style Script', serif;
        font-size: 35px;       
    };

    h2 {
        font-family: 'Titan One', sans-serif;
        font-size: 16px;
        margin-top: -5px;
    };

    h1, h2 {
        ${props => `color: var(${props.themeCode.headerText});`}
    }
`;

export {
    Container
};