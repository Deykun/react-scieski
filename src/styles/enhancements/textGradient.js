import {css} from 'styled-components';

export default css`
    background: linear-gradient( -45deg , 
      ${ props => props.theme.colorActive || '#f6a500' },
      ${ props => props.theme.colorActive75 || '#b11c0a' }
    );
    background-clip: border-box;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-box-decoration-break: clone; 
    box-decoration-break: clone;
`;