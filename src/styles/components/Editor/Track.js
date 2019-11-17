import styled from 'styled-components'

export const TrackMapPreview = styled.div`
  position: relative;
  flex-basis: 100%;
`

export const TrackFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
  padding-right: 10px;
  font-size: 11px;

  strong {
    color: ${ props => props.theme.color.cardStrong || 'white' };
  }
`