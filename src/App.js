import React, { Component } from 'react';

import UniqueId from 'react-html-id';  
import { BrowserRouter as Router, Link, NavLink, Redirect, Prompt } from 'react-router-dom';
import Route from 'react-router-dom/Route';

class App extends Component {

  constructor() {
    super();

    UniqueId.enableUniqueIds(this);

    this.state = {
      routes: [
        { id: this.nextUniqueId() },
        { id: this.nextUniqueId() },
      ]
    }
  }

  render() {
    return (
      
      <Router>
        <div className="App">
          <h1><NavLink to="/editor/" activeClassName="active">Scieski</NavLink></h1>

          <aside id="scieski-editor">
            <nav>
              <NavLink to="/editor/routes/" exact activeClassName="active">Trasy</NavLink>
              <NavLink to="/editor/settings/" activeClassName="active">Ustawienia</NavLink>
            </nav>
            <div>
              <Route path="/routes/"
                  render={
                    () => {
                      return( <div>Trasy</div> );
                    }
                  }
              />

            <Route path="/routes/:routename" exact strict render={ 
              ( {match} ) => {

                const indexOfRoute = this.state.tracks.findIndex( (route) => { return match.params.routename.toLowerCase() === route.routename.toLowerCase() ? true : false } ); 
                return indexOfRoute >= 0 ? <div user={this.state.users[indexOfRoute]}>Trasa.</div> : <div>Brak trasy.</div>;
              }
            } 
            /> 
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
