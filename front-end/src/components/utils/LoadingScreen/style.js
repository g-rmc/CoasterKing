import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    min-width: 300px;
    max-width: 600px;
    height: 100%;
    min-height: 100vh;

    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 4;

    position: fixed;
    top: 0;
    margin: 0 auto;
    transition:none;
    
    ${props => `background: var(${props.themeCode.background});`}


    img {
        width: 200px;
        height: 200px;
        object-fit: cover;
    };

    h1 {
        font-family: 'Style Script', serif;
        font-size: 40px;
        margin-top: 10px;
        ${props => `color: var(${props.themeCode.title});`}
    };
`;

export {
    Container
};