import styled, { keyframes } from 'styled-components'

import { card } from '../../shared/panel'

const newNotification = keyframes`
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

export const NotificationItem = styled.li`
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
  animation: ${newNotification} .4s ease-in-out;
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

  .close {
    position: absolute;
    top: 8px;
    right: 5px;
  }
`

export const NotificationTitle = styled.h3`
  color: ${ props => props.theme.color.cardStrong || 'white' };
  font-size: 11px;
  font-weight: 400;
  padding-right: 10px;
  padding-bottom: 8px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

export const NotificationSubtitle = styled.span`
  color: ${ props => props.theme.color.card || 'gray' };
  font-size: 9px;
`

export const NotificationContent = styled.p`
  font-size: 9px;
  font-weight: 400;
  text-align: justify;
  hyphens: auto;
`

export const NotificationActions = styled.p`
  text-align: right;
`