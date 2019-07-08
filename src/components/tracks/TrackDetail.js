import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

class TrackDetail extends Component {
  onChange(e) {
    const {name, value} = e.target;
    this.props.onUpdateTrack( this.props.id, { [name]: value });
  }

  render() {
    const { id, track } = this.props;
    if ( track ) {
      const { title, distance } = track;
      return (
        <section key={id}>
          <input name="title" value={title} onChange={this.onChange.bind(this)} />
          { distance ? 
            ( distance > 0.8 ? <strong>{track.distance.toFixed(2)} km</strong> : <strong>{(distance*1000).toFixed(1)} m</strong>)
            : `brak danych`}
          <button onClick={this.props.onRemoveTrack.bind(this, track.id)}>Usuń</button> 
        </section>
      )
    } else {
      return (
        <Redirect to="/editor/tracks" />
      )
    }

  }
}


const mapStateToProps = (store, props) => {
  const track = store.rTracks.tracks.find( (track) => { return props.id === track.id } ); 
  return {
    track: track
  }
}
  
const mapDispatchToProps = (dispach) => {
  return {
    onUpdateTrack: (id, track) => dispach( { type: 'UPDATE_TRACK', id, track }),
    onRemoveTrack: (id) => dispach( { type: 'REMOVE_TRACK', id }),
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)( TrackDetail );
