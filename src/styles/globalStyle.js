import { normalize  } from 'styled-normalize';
import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  ${normalize}
  body {
    padding: 0;
  }
  * {
    box-sizing: border-box;
  }
`;