import React, { Component } from 'react';

import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';
import Route from 'react-router-dom/Route';

import { connect } from 'react-redux';

import * as actionCreator from './store/actions/actions';
import { addTracksFromFiles } from './store/actions/actions';


import TrackDetail from './components/editor/tracks/TrackDetail';
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

                          <Route path="/editor/tracks/:trackid" exact strict render={ 
                            ( {match} ) => {
                              const indexOfTrack = this.props.tracks.findIndex( (track) => { return match.params.trackid === track.id } ); 
                              return indexOfTrack >= 0 ? <TrackDetail track={this.props.tracks[indexOfTrack]} /> : '';
                            }
                          } 
                          /> 

                          <AddTrack onAddFiles={this.props.onAddFiles}></AddTrack>
                          <TrackList tracks={this.props.tracks} onRemoveTrack={this.props.onRemoveTrack}></TrackList>
        
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
    onAddFiles: (files) => dispach( actionCreator.addTracksFromFiles(files) ),
    onRemoveTrack: (id) => dispach( { type: 'REMOVE_TRACK', id }),
  }
}

export default connect(mapStateToProps, mapDispacToProps)( App );
