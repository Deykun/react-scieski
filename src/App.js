import React, { Component } from 'react';

import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';
import Route from 'react-router-dom/Route';

import { connect } from 'react-redux';

import * as actionCreator from './store/actions/actions';
import { addTracksFromFiles } from './store/actions/actions';


import AddTrack from './components/editor/tracks/AddTrack';
import TrackList from './components/editor/tracks/TrackList';

class App extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      
      <Router>
        <div className="App">
          <h1><NavLink to="/editor/" activeClassName="active">Scieski</NavLink></h1>

          <aside id="scieski-editor">
            <nav>
              <NavLink to="/editor/tracks/" exact activeClassName="active">Trasy</NavLink>
              <NavLink to="/editor/settings/" activeClassName="active">Ustawienia</NavLink>
            </nav>
            <div>
              <Route path="/editor/tracks/" render={
                    () => {
                      return (
                      <section id="scieski-tracks">
                        <div>
                          <div>Trasy {this.props.tracks.length}</div> 
                          <button onClick={this.props.onAddTrack}>Dodaj trase</button>
                          <button onClick={this.props.onAddFiles}>Dodaj plik</button>
                          <AddTrack></AddTrack>
                          <TrackList tracks={this.props.tracks} onRemove={this.props.onRemoveTrack}></TrackList>
        
                        </div>
                      </section>
                      )
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

const mapStateToProps = (store) => {
  return {
    tracks: store.rTracks.tracks
  }
}

const mapDispacToProps = (dispach) => {
  return {
    onAddTrack: () => dispach( { type: 'ADD_NEW_TRACK' }), 
    onAddFiles: () => dispach( actionCreator.addTracksFromFiles(1) ),
    onRemoveTrack: (id) => dispach( { type: 'REMOVE_TRACK', id }),

  }
}

export default connect(mapStateToProps, mapDispacToProps)( App );
