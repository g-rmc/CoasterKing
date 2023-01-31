import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 100%;
    min-height: 100vh;
    flex-direction: column;
    justify-content: center;
    ${props => `background: var(${props.themeCode.background});`}
`

export {
    Container,
}