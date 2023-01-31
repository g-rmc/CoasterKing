import styled from "styled-components";
import RetroHitCounter from "react-retro-hit-counter";

const Container = styled.div`
    width: 100%;
    height: 100%;
    min-height: 100vh;
    flex-direction: column;
    justify-content: flex-start;
    ${props => `background: var(${props.themeCode.background});`}
`

const Header = styled.div`
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding-bottom: 15px;
    height: 180px;
    margin: 80px 20px 20px 20px;

    font-family: 'Raleway', sans-serif;
    font-size: 20px;

    h1 {
        font-weight: 700;
    }

    h2 {
        font-weight: 300;
    }

    ${props => `color: var(${props.themeCode.title});`}
    border-bottom: 3px dotted ${props => `var(${props.themeCode.title})`};
`

function StyledCounter({coasterCount, darkMode}) {
    return (
        <RetroHitCounter 
            hits={coasterCount}
            withBorder={false}
            size={30}
            padding={6}
            digitSpacing={4}
            segmentSpacing={0.8}
            segmentActiveColor={darkMode? "red" : "green"}
            segmentInactiveColor={darkMode? "#363636" : "#dfdfdf"}
            backgroundColor={darkMode? "#262626" : "#f8f8f8"}
            glowStrength={0.3}
        />
    )
}

export { Container, Header, StyledCounter };
