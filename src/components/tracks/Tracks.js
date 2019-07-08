import React, { Component } from 'react';

import Route from 'react-router-dom/Route';
 
import { connect } from 'react-redux';
import * as actionCreator from './../../store/actions/actions';

import TrackDetail from './TrackDetail';
import AddTrack from './AddTrack'; 
import TrackList from './TrackList';

import styled from 'styled-components';

const TrackTab = styled.section`
  .number {
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    height: 30px;
    min-width: 30px;
    font-size: 13px;
    line-height: 30px;
    padding: 0 5px;
    color: ${ props => props.theme.color.text|| 'white' };
    background-color: ${ props => props.theme.color.brand || 'black' };
    border-radius: 30px;
  }
`

class Tracks extends Component {
  render() {
    const { tracks } = this.props;
    return(
      <TrackTab>
        <h3>Trasy <span className='number'>{tracks.length}</span></h3>
        <AddTrack onAddFiles={this.props.onAddFiles}></AddTrack>
        <Route path="/editor/tracks/:trackid" render={ 
          ( {match} ) => {
            return (
              <TrackDetail id={match.params.trackid} /> 
            )
          }
        } 
        />
        <TrackList tracks={tracks} />
      </TrackTab>
    ) 
  }
}


const mapStateToProps = (store) => {
  return {
    tracks: store.rTracks.tracks
  }
}

const mapDispatchToProps = (dispach) => {
  return {
    onAddFiles: (files) => dispach( actionCreator.addTracksFromFiles(files) ),
    onRemoveTrack: (id) => dispach( { type: 'REMOVE_TRACK', id }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)( Tracks );
