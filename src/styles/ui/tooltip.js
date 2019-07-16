import {css} from 'styled-components';

const tooltip = css`
  position: relative;
  ::after {
    content: attr(aria-label);
    position: absolute;
    top: calc( 100% + 3px);
    left: 50%;
    z-index: 10;
    transform: translate(-50%, -3px) scale(0.7);
    opacity: 0;

    padding: 7px 10px;
    border-radius: 3px;
    
    font-size: 11px;
    line-height: 11px;
    font-weight: 500;
    white-space: nowrap;

    color: ${ props => props.theme.color.text || 'black' };
    background-color: ${ props => props.theme.color.active || 'gray' };    

    ${ props => props.danger && css`
      color: ${ props => props.theme.background.danger || 'white' };
      background-color: ${ props => props.theme.color.danger75 || 'red' }; 
    `}; 

    ${ props => props.main && css`
      color: ${ props => props.theme.background.main || 'white' };
      background-color: ${ props => props.theme.color.main75 || 'green' };
    `}; 

    pointer-events: none;
    
    transition: .1s ease-in-out;
  }
  :hover, :focus {
    ::after {
      transform: translate(-50%, 0) scale(1);
      opacity: 1;
    }
  }
`;

export default tooltip;