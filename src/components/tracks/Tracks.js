import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import Route from 'react-router-dom/Route';
 
import { connect } from 'react-redux';

import * as actionCreator from './../../store/actions/actions';

import TrackDetail from './TrackDetail';
import AddTrack from './AddTrack'; 
import TrackList from './TrackList';

class Tracks extends Component {
  render() {
    return(
      <section id="scieski-tracks">
        <div>Trasy {this.props.tracks.length}</div>

        <Route path="/editor/tracks/:trackid" exact strict render={ 
          ( {match} ) => {
            const indexOfTrack = this.props.tracks.findIndex( (track) => { return match.params.trackid === track.id } ); 
            return indexOfTrack >= 0 ? <TrackDetail track={this.props.tracks[indexOfTrack]} onRemoveTrack={this.props.onRemoveTrack} /> : <Redirect to="/editor/tracks" />;
          }
        } 
        />
        <AddTrack onAddFiles={this.props.onAddFiles}></AddTrack>
        <TrackList tracks={this.props.tracks} onRemoveTrack={this.props.onRemoveTrack}></TrackList>
      </section>
    ) 
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

export default connect(mapStateToProps, mapDispacToProps)( Tracks );
