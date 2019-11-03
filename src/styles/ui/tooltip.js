import {css} from 'styled-components'

export const tooltip = css`
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

    color: ${ props => props.theme.background.card || 'black' };
    background-color: ${ props => props.theme.color.card || 'gray' };    

    ${ props => props.negative && css`
      color: ${ props => props.theme.background.negative || 'white' };
      background-color: ${ props => props.theme.color.negative || 'red' }; 
    `}; 

    ${ props => props.positive && css`
      color: ${ props => props.theme.background.positive || 'white' };
      background-color: ${ props => props.theme.color.positive || 'green' };
    `}; 

    pointer-events: none;
    
    transition: .1s ease-in-out;
  }
  :hover {
    ::after {
      transform: translate(-50%, 0) scale(1);
      opacity: 1;
    }
  }
`

export const tooltipTop = css`
  &::after {
    top: auto;
    bottom: calc( 100% + 3px);
  }
`
