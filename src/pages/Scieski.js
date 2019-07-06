import React, { Component } from 'react';

import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import Route from 'react-router-dom/Route';

import styled from 'styled-components';
import GlobalStyle from '../styles/globalStyle';
import Theme from '../styles/theme';

import textGradient from '../styles/textGradient';

import Logo from '../logo.svg';
import Notifications from '../components/notifications/Notifications'; 
import Tracks from '../components/tracks/Tracks'; 

import Icon from '../styles/ui/Icon';

const AppWrapper = styled.div`
`

const MainEditor = styled.aside`
  position: fixed;
  top: 0;
  left: ${ props => props.open ? '0' : '-400px'};
  z-index: 50;
  height: 100%;
  width: 400px;
  overflow: auto;
  padding: 15px;
  color: ${ props => props.theme.color.text };
  background-color: ${ props => props.theme.background.component };
  box-shadow: 0 0 40px -35px rgba(0,0,0,.5);
  transition: .3s;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const activeClassName = 'active'
const TabNavLink = styled(NavLink).attrs({
  activeClassName: activeClassName,
})`
  text-shadow: none;
  &:hover, &.${activeClassName} {
    color: ${ props => props.theme.color.active || 'red' };
    ${ textGradient };
  }
`
const TabNavLinkExternal = styled.a`
  text-shadow: none;
  color: ${ props => props.theme.color.active || 'red' };
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
                      <NavLink to="/">
                        <Icon name="cross" />
                        Close
                      </NavLink>
                      <TabNavLink to="/editor/tracks/">
                        <Icon name="flag"/>
                        Trasy
                      </TabNavLink>
                      <TabNavLink to="/editor/settings/">
                        <Icon name="cog"/>
                        Ustawienia
                      </TabNavLink>
                      <TabNavLinkExternal href="https://github.com/Deykun/react-scieski" target="_blank" rel="noopener noreferrer">
                        <Icon name="flow-branch" />
                        GitHub
                      </TabNavLinkExternal>
                    
                    </nav>
                    <div>
                      <Route path="/editor/tracks" component={Tracks} /> 
                    </div>
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
