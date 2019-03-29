import React, { Component } from 'react';

import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';
import Route from 'react-router-dom/Route';

import Logo from '../logo.svg';
import Tracks from '../components/tracks/Tracks'; 

class App extends Component {

  render() {
    return (
      
      <Router>
        <div className="App">
          <h1><NavLink to="/editor/" activeClassName="active">scieski <img src={Logo} style={{height:100}}/></NavLink></h1>

          <aside id="scieski-editor">
            <nav>
              <NavLink to="/editor/tracks/" exact activeClassName="active">Trasy</NavLink>
              <NavLink to="/editor/settings/" activeClassName="active">Ustawienia</NavLink>
            </nav>
            <div>
              <Route path="/editor/tracks" component={Tracks} />             
 
              <section id="routes">                
              </section>
            </div>
          </aside>

          
        </div>
      </Router>
    );
  }
}

export default App;
