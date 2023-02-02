import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    flex-direction: column;
    align-items: center;
    padding: 0 20px;
    ${props => `color: var(${props.themeCode.title});`}

    & > h1 {
        font-weight: 400;
        font-size: 16px;
        margin-bottom: 5px;

        b {
            font-weight: 700;
        }
    }
`

const RankingContainer = styled.div`
    width: 100%;
    height: calc(100vh - 440px);
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin: 10px 20px 60px 20px;
    padding: 10px;
    border-radius: 10px;

    overflow-y: scroll;

    ${props => `background-color: var(${props.themeCode.box});`}
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

const UserContainer = styled.div`
    width: 100%;
    height: 30px;
    margin-bottom: 10px;
    padding-bottom: 10px;
    align-items: center;
    justify-content: space-between;
    font-family: 'Raleway', sans-serif;

    ${props => `color: var(${props.themeCode.title});`}
    border-bottom: 1px solid #D9D9D9;

    div {
        align-items: center;
        flex-direction: flex-start;
    }

    h1 {
        width: 30px;
        font-weight: 700;
        font-size: 16px;
    }

    img {
        height: 20px;
        width: 20px;
        border-radius: 50%;
    }

    h2 {
        margin-left: 15px;
        font-weight: 400;
        font-size: 14px;
    }

    h3 {
        font-weight: 400;
        font-size: 12px;
        b {
            font-weight: 700;
        }
    }
`

export { 
    Container,
    RankingContainer,
    UserContainer
};