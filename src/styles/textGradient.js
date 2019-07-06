import {css} from 'styled-components';

export default css`
    background: linear-gradient( -45deg , 
      ${ props => props.theme.color.active || 'blue' },
      ${ props => props.theme.color.active75 || 'darkblue' }
    );
    background-clip: border-box;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-box-decoration-break: clone; 
    box-decoration-break: clone;
`;