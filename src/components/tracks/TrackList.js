import React, { Component } from 'react';
import styled from 'styled-components';
import TrackListItem from './TrackListItem';

const TracksContainer = styled.ul`
  list-style: none;
`

class TrackList extends Component {
  render() {
    return (
      <TracksContainer>
        {this.props.tracks.map( (track) => { return ( <TrackListItem key={track.id} track={track} /> ) } )}
      </TracksContainer>
    );
  }
}

export default TrackList;
