import React, { Component } from 'react';

import Route from 'react-router-dom/Route';
 
import { connect } from 'react-redux';
import * as actionCreator from './../../store/actions/actions';

import AddTrack from './AddTrack'; 
import TrackPreview from './TrackPreview';

import styled from 'styled-components';

const TrackTab = styled.section`
  max-height: calc( 100vh - 50px );
  flex-basis: 100%;
  display: flex;
  flex-flow: column;
  h3 {
    margin-bottom: 12px;
  }
  .number {
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    height: 30px;
    min-width: 30px;
    font-size: 13px;
    line-height: 30px;
    padding: 0 5px;
    color: ${ props => props.theme.color.text || 'white' };
    background-color: ${ props => props.theme.color.brand || 'black' };
    border-radius: 30px;
  }
`
const TracksContainer = styled.ul`
  flex-basis: 100%;
  list-style: none;
  overflow-y: scroll;
  margin: 0 -15px;
  background-color: ${ props => props.theme.background.component || 'white' };
  position: relative;
  &::before {
    content: '';
    position: sticky;
    top: 0;
    left: 0;
    display: block;
    pointer-events: none;
    z-index: 1;
    background-image: linear-gradient( to bottom, rgba(0,0,0,.8) 0%, rgba(0,0,0,.6) 12%, rgba(0,0,0,0) 100%);
    width: 100%;
    height: 7px;
    opacity: .1;
  }
`

class Tracks extends Component {
  render() {
    const { tracks } = this.props;
    return(
      <TrackTab>
        <h3>Trasy <span className='number'>{tracks.length}</span></h3>
        <AddTrack onAddFiles={this.props.onAddFiles}></AddTrack>
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
    onRemoveTrack: (id) => dispach( { type: 'REMOVE_TRACK', id }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)( Tracks );
