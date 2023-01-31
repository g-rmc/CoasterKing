import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 100%;
    min-height: 100vh;
    flex-direction: column;
    justify-content: center;
    ${props => `background: var(${props.themeCode.background});`}
`

const Header = styled.div`
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto 60px auto;

    h1, h2 {
        ${props => `color: var(${props.themeCode.title});`}
    }

    img {
        height: 130px;
        width: 130px;
    }
    h1 {
        font-family: 'Style Script', serif;
        font-size: 50px;
        text-align: center;
    }
    h2 {
        font-family: 'Titan One';
        font-size: 22px;
        text-align: center;
    }
`

const StyledButton = styled.div`
    height: 50px;
    width: 300px;
    margin: 10px auto;
    border-radius: 5px;
    padding-left: 30px;
    align-items: center;
    justify-content: flex-start;
    box-shadow: inset 0px 4px 4px rgba(255, 255, 255, 0.5);
    cursor: pointer;

    ${props => `background: var(${props.themeCode.headerBackground});`}

    h1 {
        margin-left: 30px;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        b {
            font-weight: 700;
        }
    }

    h1, svg {
        ${props => `color: var(${props.themeCode.headerText});`}
    }

    hover {
        filter: brightness(0.6)
    }

    &:active {
        transform: translateY(2px);
    }
`

export { Container, Header, StyledButton };