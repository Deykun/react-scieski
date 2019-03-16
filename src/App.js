import React, { Component } from 'react';

import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';
import Route from 'react-router-dom/Route';

import { connect } from 'react-redux';

import AddTrack from './components/editor/tracks/AddTrack';
import TrackList from './components/editor/tracks/TrackList';

class App extends Component {

  constructor() {
    super();
  }

  render() {

    console.log(window.location.pathname);
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
              <section id="scieski-tracks" className={ window.location.pathname.includes('/editor/tracks/') ? 'active' : '' }>
                <div>
                  <div>Trasy {this.props.tracks.length}</div> 
                  <button onClick={this.props.onAddTracks}>Dodaj trase</button>

                  {/* <input type="file" onChange={ (e) => this.handleChange(e.target.files) } /> */}
                  <AddTrack></AddTrack>
                  <TrackList tracks={this.props.tracks} onRemove={this.props.onRemoveTrack}></TrackList>

                </div>
              </section>

              
 
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
    tracks: state.tracks
  }
}

const mapDispacToProps = (dispach) => {
  return {
    onAddTracks: () => dispach( { type: 'ADD_NEW_TRACKS' }),
    onRemoveTrack: (id) => dispach( { type: 'REMOVE_TRACK', id: id })
  }
}

export default connect(mapStateToProps, mapDispacToProps)( App );
