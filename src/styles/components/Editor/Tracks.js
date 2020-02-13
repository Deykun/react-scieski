import styled from 'styled-components'

export const TracksList = styled.ul`
  flex-basis: 100%;
  overflow-y: scroll;
  margin: 0;
  margin-left: -3px;
  list-style: none;
  perspective: 500px;
  padding: 20px 3px 0;
  &::after {
    content: '';
    display: block;
    height: 20px;
  }
`

export const TracksNav = styled.p`
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 0;
  > * {
    margin: 0 8px;
    font-size: 10px;
    font-weight: 300;
  }
  .active {
    color: ${ props => props.theme.color.cardStrong || 'white' };
  }
`
