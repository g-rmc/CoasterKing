import styled from "styled-components";

const Container = styled.div`
    ${props => `background: var(${props.themeCode.menuBase});`}
    ${props => `color: var(${props.themeCode.title});`}

    height: 40px;
    width: 30px;
    border-radius: 0 0 10px 10px;
    box-shadow: inset -2px -2px 4px rgba(0, 0, 0, 0.25);
    align-items: flex-end;
    justify-content: center;
    padding-bottom: 10px;
    z-index: 10;
    cursor: pointer;

    position: fixed;
    top: 0;
    right: calc(100vw/2 - 260px);
    @media screen and (max-width: 600px) {
        right: 20px;
    }

    svg {
        height: 18px;
        width: 18px;
    }
    
    :hover {
        filter: brightness(0.6)
    }
`

export { Container }