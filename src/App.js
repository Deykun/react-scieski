import React, { Component } from 'react';

import UniqueId from 'react-html-id';  
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';
import Route from 'react-router-dom/Route';

import { connect } from 'react-redux';

class App extends Component {

  constructor() {
    super();

    UniqueId.enableUniqueIds(this);

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
              <Route path="/editor/routes/"
                  render={
                    () => {
                      return( 
                        <div>
                          <div>Trasy {this.props.routes.length}</div> 
                          <button onClick={this.props.onAddTracks}>Dodaj trase</button>

                          {/* <input type="file" onChange={ (e) => this.handleChange(e.target.files) } /> */}
                        </div>
                      );
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

const mapStateToProps = (state) => {
  return {
    routes: state.routes
  }
}

const mapDispacToProps = (dispach) => {
  return {
    onAddTracks: () => dispach( { type: 'ADD_NEW_TRACKS' }),
    removeTrack: () => dispach( { type: 'REMOVE_TRACK' })
  }
}

export default connect(mapStateToProps, mapDispacToProps)( App );
