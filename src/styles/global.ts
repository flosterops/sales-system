import { createGlobalStyle } from 'styled-components';

export const globalStyles = {
  global: {
    borderRadius: 0,
    componentHeight: 50,
  },
  fonts: {
    default: "font-family: 'Open Sans', sans-serif;",
    bree: "font-family: 'Bree Serif', serif;",
  },

  jc: {
    flexStart: 'justify-content: flex-start;',
    center: 'justify-content: center;',
    stretch: 'justify-content: stretch;',
    flexEnd: 'justify-content: flex-end;',
    spaceBetween: 'justify-content: space-between;',
    spaceAround: 'justify-content: space-around;',
    default: 'justify-content: flex-start;',
  },

  ai: {
    flexStart: 'align-items: flex-start;',
    center: 'align-items: center;',
    stretch: 'align-items: stretch;',
    flexEnd: 'align-items: flex-end;',
    spaceBetween: 'align-items: space-between;',
    spaceAround: 'align-items: space-around;',
    default: 'align-items: flex-start;',
  },

  textAlign: {
    center: 'text-align: center;',
    left: 'text-align: left;',
    right: 'text-align: right;',
    default: 'text-align: left;',
  },

  direction: {
    row: 'flex-direction: row;',
    column: 'flex-direction: column;',
    default: 'flex-direction: column;',
  },

  position: {
    left: 'justify-content: left;',
    right: 'justify-content: right;',
    center: 'justify-content: center;',
    default: 'justify-content: left;',
  },

  componentSizes: {
    s: 'width: 120px;',
    m: 'width: 240px;',
    l: 'width: 320px;',
    xl: 'width: 420px;',
    full: 'width: 100%;',
    auto: 'width: auto;',
    default: 'width: 180px;',
  },

  weight: {
    300: 'font-weight: 300;',
    400: 'font-weight: 400;',
    500: 'font-weight: 500;',
    600: 'font-weight: 600;',
    700: 'font-weight: 700;',
    800: 'font-weight: 800;',
    default: 'font-weight: 400;',
  },

  fontSizes: {
    xxs: 'font-size: 10px;',
    xs: 'font-size: 12px;',
    s: 'font-size: 14px;',
    m: 'font-size: 16px;',
    xm: 'font-size: 18px;',
    xxm: 'font-size: 22px;',
    l: 'font-size: 24px;',
    xl: 'font-size: 36px;',
    xxl: 'font-size: 48px;',
    default: 'font-size: 16px;',
  },
};

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    width: 100%;
    position: relative;
    padding: 0;
    height: 100%;
    ${globalStyles.fonts.default};
    ${globalStyles.weight.default};
    letter-spacing: 1px;
    
    div {
      display: flex;
    }
  }
  h1,h2,h3,h4,h5,h6,p,ol,ul {
    padding: 0;
    margin: 0;
  }
  a {
    text-decoration: none;
    cursor: pointer;
  }
`;
