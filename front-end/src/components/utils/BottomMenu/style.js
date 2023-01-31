import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    min-width: 350px;
    max-width: 600px;
    height: 60px;

    align-items: center;
    justify-content: center;
    z-index: 5;

    position: fixed;
    bottom: 0;
    margin: 0 auto;
    
    div {
        cursor: pointer;
        
        ${props => `background: var(${props.themeCode.menuBase});`}

        :hover{
            filter: brightness(0.6)
        }
        :active{
            transform: translateY(2px);
        }
    }


    h1{
        font-family: 'Raleway';
        font-size: 17px;
        text-align: center;
        margin-top: 5px;
        font-weight: 400;

        ${props => `color: var(${props.themeCode.text});`}
    }
`;

const MyListButton = styled.div`
    height: 100%;
    width: 50%;

    align-items: center;
    justify-content: flex-start;
    padding-left: 25px;
    padding-right: 50px;

    ${props => `box-shadow: inset -4px 4px 4px var(${props.themeCode.menuShadowSide});`}

    ${props => { if(props.screenViewed === "/mylist") return `background: var(${props.themeCode.menuSelected}) !important;`}};

    h1{
        ${props => {if(props.screenViewed === "/mylist") return `font-weight: 800;`}};
    }
`

const CoastersButton = styled.div`
    height: 100%;
    width: 50%;

    align-items: center;
    justify-content: flex-end;
    padding-left: 50px;
    padding-right: 25px;

    ${props => `box-shadow: inset 4px 4px 4px var(${props.themeCode.menuShadowSide});`}

    ${props => { if(props.screenViewed === "/coasters") return `background: var(${props.themeCode.menuSelected}) !important;`}};

    h1{
        ${props => {if(props.screenViewed === "/coasters") return `font-weight: 800;`}};
    }
`

const MainButton = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;

    align-items: center;
    justify-content: center;

    position: fixed;
    bottom: 10px;
    margin: 0 auto;
    z-index: 6;

    ${props => `box-shadow: inset 0px 0px 10px var(${props.themeCode.menuShadowMain});`}

    ${props => { if(props.screenViewed === "/main") return `background: var(${props.themeCode.menuSelected}) !important;`}};

    img {
        height: 60px;
        width: 60px;
    }
`

export {
    Container,
    MyListButton,
    CoastersButton,
    MainButton
};