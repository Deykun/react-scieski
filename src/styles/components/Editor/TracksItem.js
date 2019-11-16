import styled, { keyframes, css } from 'styled-components'

import { card } from '../../shared/panel'
import { tooltip, tooltipTop } from '../../ui/tooltip'

const newTrackItem = keyframes`
  0% {
    transform: scale(0) translateY(100px) rotateX(45deg);
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  100% {
    transform: scale(1) translateY(0) rotateX(0deg);
  }
`

export const TrackItem = styled.li`
  ${card}
  padding: 10px;

  position: relative;
  z-index: 1;
  width: 100%;
  margin: 0;
  :not(:first-child) {
    margin-top: -20px;
  }

  word-break: break-word;

  box-shadow: 0 -3px 10px rgba(0,0,0,0.45), 0 14px 9px -5px rgba(0,0,0,.04);
   
  transition: .2s ease-in-out;
  transform-origin: 50% 0;
  animation: ${newTrackItem} .4s ease-in-out;
  :focus, :focus-within {
    outline: none;
    box-shadow: 0 0 15px -5px rgba(0,0,0,0.9), 0 14px 9px -5px rgba(0,0,0,.04);
    z-index: 2;
    + * {
      margin-top: 5px;
    }
    ~ * {
      transition: .5s cubic-bezier(0.68, -0.55, 0.265, 1.30);
      transition: .2s ease-in-out;
    }
  }

  ${props => props.pined && css`
    position: sticky;
    margin-top: -20px;
    top: -20px;
    z-index: 5;
    margin-bottom: 30px;
    box-shadow: 0 0 15px -5px rgba(#c4d33e,0.9), 0 14px 9px -5px rgba(0,0,0,.04);
    background-color: ${ props => props.theme.color.cardStrong || 'white' };
    
    .close {
      position: absolute;
      top: 50%;
      right: 7px;
      transform: translateY( -50% );
    }

    ${TrackTitle},
    ${TrackSubtitle} {
      color: ${ props => props.theme.background.card || 'red' };
    }
  `}

  ${props => !props.pined && css`[aria-label] {
    cursor: help;
    ${tooltip}
    ${tooltipTop}
  }`}

`

export const TrackTitle = styled.h3`
  display: block;
  color: ${ props => props.theme.color.cardStrong || 'white' };
  font-size: 11px;
  font-weight: 400;
  padding-right: 10px;
  padding-bottom: 8px;
  &:last-child {
    padding-bottom: 0;
  }
`

export const TrackSubtitle = styled.span`
  color: ${ props => props.theme.color.card || 'gray' };
  font-size: 9px;
`

export const TrackContent = styled.p`
  font-size: 8px;
  font-weight: 400;
  text-align: justify;
  hyphens: auto;
`