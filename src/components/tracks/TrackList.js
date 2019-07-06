import React from 'react';
import styled from 'styled-components';
import TrackListItem from './TrackListItem';

const TracksContainer = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: column-reverse nowrap;
`

const TrackList = (props) => {
  return (
    <TracksContainer>
      {props.tracks.map( (track) => { return ( <TrackListItem key={track.id} track={track} onRemoveTrack={props.onRemoveTrack} /> ) } )}
    </TracksContainer>
  );
}


export default TrackList;
