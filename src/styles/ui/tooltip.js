import {css} from 'styled-components';

const tooltip = css`
  position: relative;
  &::after {
    content: attr(aria-label);
    position: absolute;
    top: calc( 100% + 3px);
    left: 50%;
    transform: translate(-50%, -3px) scale(0.7);
    opacity: 0;

    padding: 7px 10px;
    border-radius: 3px;
    
    font-size: 11px;
    line-height: 11px;
    font-weight: 500;

    color: ${ props => props.theme.colorText || '#333' };
    background-color: ${ props => props.theme.colorActive || '#f3e977' };    

    pointer-events: none;
    
    transition: .1s ease-in-out;
  }
  &:hover, &:focus {
    &::after {
      transform: translate(-50%, 0) scale(1);
      opacity: 1;
    }
  }
`;

export default tooltip;