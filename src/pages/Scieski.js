import React, { Component } from 'react';

import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import Route from 'react-router-dom/Route';

import 'moment/locale/pl';

import styled, {css} from 'styled-components';
import GlobalStyle from '../styles/globalStyle';
import Theme from '../styles/theme';

import textGradient from '../styles/enhancements/textGradient';

import Notifications from '../components/notifications/Notifications'; 
import Tracks from '../components/tracks/Tracks'; 
import TrackDetail from '../components/tracks/TrackDetail';

import Maps from '../components/maps/Maps';

import Icon from '../styles/ui/Icon';
import Button from '../styles/ui/Button';

const AppWrapper = styled.div`
`

const AppNameLink = styled.a`
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 50;
  font-weight: 500;
  text-decoration: none;
  color: ${ props => props.theme.color.text || 'black' };
  :hover {
    ${ textGradient };
  }
`;

const MainEditor = styled.aside`
  display: flex;
  flex-flow: column;
  position: fixed;
  top: 0;
  left: 0;
  transform: ${ props => props.open ? 'translateX(0)' : 'translateX(-100%)' };
  width: 100%;
  max-width: 400px;
  height: 100vh;
  z-index: 50;
  padding: 0 15px;
  color: ${ props => props.theme.color.text || 'black' };
  background-color: ${ props => props.theme.background.component || 'white' };
  box-shadow: 0 0 40px -35px rgba(0,0,0,.5);
  transition: .3s;
  a {
    color: inherit;
    text-decoration: none;
  }
`;

const MainNav = styled.nav`
  flex-shrink: 0;
  flex-basis: 50px;
  line-height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  svg {
    margin-right: 5px;
  }
`;

const activeClassName = 'active';
const TabNavLink = styled(NavLink).attrs({
  activeClassName: activeClassName,
})`
  text-shadow: none;
  :hover, &.${activeClassName} {
    color: ${ props => props.theme.color.active || 'red' };
    ${ textGradient };
  }
`
const TabNavLinkExternal = styled.a`
  text-shadow: none;
  color: ${ props => props.theme.color.active || 'red' };
  :hover {
    ${ textGradient };
  }
`

class App extends Component {
  render() {
    return (
      <Router>
        <Theme>
          <AppWrapper className="scieski-app">
            <GlobalStyle />
            <Notifications></Notifications>
            <AppNameLink aria-label="Otwórz edytor" as={NavLink} to="/editor/tracks/">scieski</AppNameLink>
            <Route path="*" render={
              ({match}) => {
                return (
                  <MainEditor open={ match.url.startsWith('/editor/') }>
                    <MainNav>
                      <TabNavLink to="/editor/tracks">
                        <Icon name="flag"/>
                        Trasy
                      </TabNavLink>
                      <TabNavLink to="/editor/settings">
                        <Icon name="cog"/>
                        Ustawienia
                      </TabNavLink>
                      <TabNavLinkExternal href="https://github.com/Deykun/react-scieski" target="_blank" rel="noopener noreferrer">
                        <Icon name="flow-branch" />
                        GitHub
                      </TabNavLinkExternal>
                      <Button danger={1} as={NavLink} iconleft="cross" aria-label="Zamknij" to="/" />
                    </MainNav>
                    <Route path='/editor/tracks' component={Tracks} />
                    <Route path='/editor/settings' render={
                      () => {
                        return (
                          <p>Wkrótce.</p>
                        )
                      }
                    } />
                  </MainEditor>
                )
              }
            } /> 
            <Route path="/editor/tracks/:trackid" render={ 
              ( {match} ) => {
                return (
                  <TrackDetail id={match.params.trackid} /> 
                )
              }
            } 
            />
            <Maps />
          </AppWrapper> 
        </Theme>
      </Router>
    );
  }
}

export default App;
