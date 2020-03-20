import styled from 'styled-components'

export const defaultTitlte = styled.h3`
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
export default defaultTitlte