import {css} from 'styled-components';

export const card = css`
  color: ${ props => props.theme.color.card || 'white' };
  background-color: ${ props => props.theme.background.card || 'black' };
`;