import styled, { css } from 'styled-components'
import { card } from '../../shared/panel'

export const NotificationsList = styled.ul`
  position: fixed;
  top: 15px;
  right: 15px;
  width: 250px;
  z-index: 50;
  margin: 0;
  padding: 0;
  list-style: none;
  perspective: 500px;
`

export const NotificationsGlobalNav = styled.li`
  position: absolute;
  ${card}

  width: 20px;
  height: 20px;
  top: 5px;
  left: -25px;
  z-index: 5;
  margin: 0 !important;

  transform: scale(1);
  opacity: 1;
  ${ props => props.hide && css`
    transform: scale(.1);
    opacity: 0;
    pointer-events: none;
  `}

  transition: .1s ease-in-out;
`
