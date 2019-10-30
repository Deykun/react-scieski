import { NavLink } from 'react-router-dom'

import styled from 'styled-components'
import { card } from '../../shared/panel'

export const Panel = styled.section`
  ${card}
  position: fixed;
  bottom: 50px;
  left: 16px;
  width: 270px;
  height: 65vh;
  padding: 3px;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  transform: translate( -286px );
  transition: .6s ${ props => props.theme.other.transitionBounceFunction || 'ease-in-out'};
  &.active {
    transform: translate( 0 );
  }
`

export const TabNav = styled.nav`
  flex-shrink: 0;
  ul {
    list-style: none;
  }
  li {
    display: inline-block;
  }
  .close {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 12px;
  }
`

const activeClassName = 'active'
export const TabNavLink = styled(NavLink).attrs({ activeClassName: activeClassName })`
  font-size: 12px;
  font-weight: 300;
  transition: .3s ${ props => props.theme.other.transitionBounceFunction || 'ease-in-out'};
  :hover, &.${activeClassName} {
    color: ${ props => props.theme.color.positve || 'black' };
  }
`