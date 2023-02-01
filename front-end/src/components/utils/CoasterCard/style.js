import styled from "styled-components";

const Container = styled.div`
    min-height: 100px;
    height: 100px;
    align-items: center;
    justify-content: space-between;

    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    ${props => `background: var(${props.themeCode.box});`}

    img {
        height: 80px;
        width: 80px;
        border-radius: 5px;
        border: 1px solid ${props => `var(${props.themeCode.title})`};
        object-fit: cover;

        cursor: pointer;
        :hover {
            filter: brightness(0.6)
        }
    }
`

const CoasterInfoContainer = styled.div`
    height: 80px;
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
    padding: 5px 15px;
    font-family: 'Raleway', sans-serif;

    div {
        justify-content: space-between;
    }

    span {
        height: 40px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    h1 {
        font-weight: 700;
        font-size: 15px;
        ${props => `color: var(${props.themeCode.text});`}
    }

    h2 {
        font-weight: 400;
        font-size: 13px;
        ${props => `color: var(${props.themeCode.text});`}
    }

    h3 {
        font-weight: 300;
        font-size: 13px;
        ${props => `color: var(${props.themeCode.counterText});`}
    b {
        font-weight: 700;
    }
    }
`

const StyledEvaluation = styled.div`
    font-weight: 600;
    font-size: 13px;
    align-items: center;
    justify-content: center;

    @media screen and (min-width: 500px) {
        margin-right: 60px;
    }

    h1 {
        ${props => `color: var(${props.themeCode.counterText});`}
    }

    svg {
        margin-right: 5px;
        ${props => {
            if (props.icon === "star") return "color: #FFD42E;"
            return "color: #FF2121;"
        }}
    }
`

const StyledCheckBox = styled.div`
    height: 30px;
    min-width: 30px;
    width: 30px;
    align-items: center;
    justify-content: center;
    font-size: 23px;
    ${props => `color: var(${props.themeCode.headerBackground});`}

    ${props => `background: var(${props.themeCode.background});`}
    border: 1px solid ${props => `var(${props.themeCode.title})`};
    border-radius: 5px;

    cursor: pointer;
    :hover {
        filter: brightness(0.6);
    }
`

export {
    Container, CoasterInfoContainer, StyledEvaluation, StyledCheckBox
}