import { normalize  } from 'styled-normalize';
import { css, createGlobalStyle } from 'styled-components';

const importFontFromGoogle = css`
  @import url('https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,800&display=swap&subset=latin-ext');
  body {
    font-family: 'Poppins', sans-serif;
    font-weight: 300;
  }
  h1, h2, h3, h4, strong {
    font-weight: 500;
  }
`

export default createGlobalStyle`
  ${ normalize }
  ${ props => props.theme.importFontFromGoogle && importFontFromGoogle }
  body {
    background-color: ${ props => props.theme.background.app ? props.theme.background.app : '#e5e5e5' };
  }
  * {
    box-sizing: border-box;
  }
  .scieski-app * {
    margin: 0;
    padding: 0;
  }
`;