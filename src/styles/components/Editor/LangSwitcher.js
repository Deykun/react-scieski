import styled from 'styled-components'

import { card } from '../../shared/panel'

export const SwitcherCard = styled.div`
  ${card}
  padding: 10px;
  margin: 0;
  box-shadow: 0 -3px 10px rgba(0,0,0,0.45), 0 14px 9px -5px rgba(0,0,0,.04);

  button:not(:last-child) {
    margin-right: 10px;
  }
`