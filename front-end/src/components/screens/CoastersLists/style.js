import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 100%;
    min-height: 100vh;
    flex-direction: column;
    justify-content: flex-start;
    ${props => `background: var(${props.themeCode.background});`}
`

const Header = styled.h1`
    margin: 80px 20px 20px 20px;
    font-family: 'Raleway', sans-serif;
    font-weight: 700;
    font-size: 20px;
    ${props => `color: var(${props.themeCode.title});`}
`

const CoastersList = styled.div`
    width: 100%;
    height: calc(100vh - 190px);
    padding: 0 20px 40px 20px;
    flex-direction: column;
    overflow-y: scroll;
`

export {
    Container, Header, CoastersList
}