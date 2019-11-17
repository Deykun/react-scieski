import styled from 'styled-components'
import { card } from '../../shared/panel'
import { tooltip } from '../../ui/tooltip'

export const Card = styled.div`
  ${card}
  padding: 8px;
  text-align: center;
  font-size: 11px;
  box-shadow: 0 0 15px -5px rgba(0,0,0,0.9), 0 14px 9px -5px rgba(0,0,0,.04);
  margin-bottom: 30px;

  [aria-label] {
    cursor: help;
    ${tooltip}
  }
`

export const CardTitle = styled.h2`
  ${card}
  font-size: 12px;
  margin-bottom: 12px;
  color: ${ props => props.theme.color.cardStrong || 'white' };
`

export const StatsList = styled.ul`
  list-style: none;
`

export const StatsListItem = styled.li`
  display: flex;
  flex-flow: row nowrap;
  align-content: center;
  justify-content: space-around;
  > * {
    width: 25%;
  }
  line-height: 22px;
  margin-bottom: 8px;
  :last-child {
    margin-bottom: 0;
  }
`

export const TrackValue = styled.strong`
  font-size: 12px;
  color: ${ props => props.theme.color.cardStrong || 'white' };
`

export const AvgValue = styled.span`
  font-size: 9px;
`

export const Unit = styled.span`
  font-size: 9px;
`