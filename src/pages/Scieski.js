import React, { Component } from 'react';

import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import Route from 'react-router-dom/Route';

import styled from 'styled-components';
import GlobalStyle from '../styles/globalStyle';
import Theme from '../styles/theme';

import textGradient from '../styles/enhancements/textGradient';

import Logo from '../logo.svg';
import Notifications from '../components/notifications/Notifications'; 
import Tracks from '../components/tracks/Tracks'; 

import Icon from '../styles/ui/Icon';
import Button from '../styles/ui/Button';

const AppWrapper = styled.div`
`

const MainEditor = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  transform: ${ props => props.open ? 'translateX(0)' : 'translateX(-100%)' };
  width: 100%;
  max-width: 400px;
  height: 100%;
  z-index: 50;
  overflow: auto;
  padding: 15px;
  color: ${ props => props.theme.colorText || 'black' };
  background-color: ${ props => props.theme.backgroundComponent || 'white' };
  box-shadow: 0 0 40px -35px rgba(0,0,0,.5);
  transition: .3s;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const activeClassName = 'active';
const TabNavLink = styled(NavLink).attrs({
  activeClassName: activeClassName,
})`
  text-shadow: none;
  &:hover, &.${activeClassName} {
    color: ${ props => props.theme.colorActive || 'red' };
    ${ textGradient };
  }
`
const TabNavLinkExternal = styled.a`
  text-shadow: none;
  color: ${ props => props.theme.colorActive || 'red' };
  &:hover {
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
            <NavLink to="/editor/tracks/" activeClassName="active">scieski <img src={Logo} style={{height:100}} alt="logo"/></NavLink>
            <Route path="*" render={
              ({match}) => {
                return (
                  <MainEditor open={ match.url.startsWith('/editor/') }>
                    <nav>
                      <Button as={NavLink} iconleft="cross" aria-label="Zamknij" to="/">
                      </Button>
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
                    
                    </nav>
                    <Route path='/editor/tracks' component={Tracks} />
                    <Route path='/editor/settings' render={
                      () => {
                        return (
                          <p>Ustawienia</p>
                        )
                      }
                    } />
                  </MainEditor>
                )
              }
            } /> 
          </AppWrapper> 
        </Theme>
      </Router>
    );
  }
}

export default App;
