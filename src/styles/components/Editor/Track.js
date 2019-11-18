import styled from 'styled-components'

export const TrackMapPreview = styled.div`
  position: relative;
  flex-basis: 100%;

  > div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: ${ props => props.theme.other.borderRadius || '2px' };
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
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