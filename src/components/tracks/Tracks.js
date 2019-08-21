import React, { Component } from 'react';
 
import { connect } from 'react-redux';
import * as actionCreator from './../../store/actions/actions';

import AddTrack from './AddTrack'; 
import TrackPreview from './TrackPreview';

import Dropdown from '../../styles/ui/Dropdown';
import Button from '../../styles/ui/Button';
import { TrackTab, TracksNav, TrackNavButton, TracksContainer } from '../../styles/components/tracks/Tracks';

class Tracks extends Component {
  render() {
    const { tracks } = this.props;
    return(
      <TrackTab>
        <h3>Trasy <span className='number'>{tracks.length}</span></h3>
        <AddTrack onAddFiles={this.props.onAddFiles}></AddTrack>
        <TracksNav>
          <TrackNavButton iconleft="map" aria-label="Dodaj mapę" onClick={this.props.onAddMap} />
          <Dropdown>
            <Button iconleft="ruler" onClick={ () => this.props.onSortTracks('distance') }> Dystans</Button>
            <Button iconleft="calendar" onClick={ () => this.props.onSortTracks('date') }> Data</Button>
          </Dropdown>
        </TracksNav>
        <TracksContainer>
          {tracks.map( (track) => { return ( <TrackPreview key={track.id} track={track} /> ) })}
        </TracksContainer>
      </TrackTab>
    ) 
  }
}

const mapStateToProps = (store) => {
  return {
    tracks: store.rEditor.tracks
  }
}

const mapDispatchToProps = (dispach) => {
  return {
    onAddFiles: (files) => dispach( actionCreator.addTracksFromFiles(files) ),
    onSortTracks: (by) => dispach( { type: 'SORT_TRACKS', by }),
    onAddMap: () => dispach( { type: 'ADD_MAP' })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)( Tracks );
