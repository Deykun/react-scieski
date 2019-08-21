import styled from 'styled-components';
import Button from '../../ui/Button';

export const TrackTab = styled.section`
  max-height: calc( 100vh - 50px );
  flex-basis: 100%;
  display: flex;
  flex-flow: column;
  h3 {
    margin-bottom: 12px;
  }
  .number {
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    height: 30px;
    min-width: 30px;
    font-size: 13px;
    line-height: 30px;
    padding: 0 5px;
    color: ${ props => props.theme.color.text || 'white' };
    background-color: ${ props => props.theme.color.brand || 'black' };
    border-radius: 30px;
  }
`

export const TracksNav = styled.nav`
  margin: 0 -12px;
  padding: 5px 0;
  text-align: right;
  > *:not(:last-child) {
    margin-right: 10px;
  }
`;

export const TrackNavButton = styled(Button)`
`;

export const TracksContainer = styled.ul`
  flex-basis: 100%;
  list-style: none;
  overflow-y: scroll;
  margin: 0 -15px;
  background-color: ${ props => props.theme.background.component || 'white' };
  position: relative;
  ::before {
    content: '';
    position: sticky;
    top: 0;
    left: 0;
    display: block;
    pointer-events: none;
    z-index: 1;
    background-image: linear-gradient( to bottom, rgba(0,0,0,.8) 0%, rgba(0,0,0,.6) 12%, rgba(0,0,0,0) 100%);
    width: 100%;
    height: 7px;
    opacity: .1;
  }
`