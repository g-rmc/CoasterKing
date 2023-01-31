import { createGlobalStyle } from "styled-components";

const ThemeStyle = createGlobalStyle`
  :root {
    --light-background: #F8F8F8;
    --dark-background: #262626;

    --light-title: #00265B;
    --dark-title: #D9BA41;

    --light-text: #00265B;
    --light-counter-text: #262626;
    --dark-text: #D9BA41;
    --dark-counter-text: #d9d9d9;

    --light-box: #FFFFFF;
    --dark-box: #000000;

    --light-header-background: #0045A4;
    --light-header-text: #FFFFFF;
    --dark-header-background: #FFD42E;
    --dark-header-text: #000000;

    --light-menu-base: #D9D9D9;
    --light-menu-selected: #8FB1DF;
    --light-menu-shadow-main: #00265B;
    --light-menu-shadow-side: #F8F8F8;
    --dark-menu-base: #5F5F5F;
    --dark-menu-selected: #7C6819;
    --dark-menu-shadow-main: #000000;
    --dark-menu-shadow-side: #262626;
  }

  div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, svg, path {
    transition-property: background-color, color, fill, box-shadow, fill, opacity;
    transition-timing-function: ease-in-out;
    transition-duration: 300ms;
    transition-delay: 0;
  }
`;

export { ThemeStyle };