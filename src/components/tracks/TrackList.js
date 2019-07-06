import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import TimeAgo from 'react-timeago';
import timeAgoTranslation  from 'react-timeago/lib/language-strings/pl';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

const TracksContainer = styled.ul`
  list-style: none;
`

const fimeAgoFormatter = buildFormatter(timeAgoTranslation);

const TrackList = (props) => {
  return (
    <TracksContainer>
      {props.tracks.map( (track) => { return ( <Track key={track.id} track={track} onRemoveTrack={props.onRemoveTrack}></Track> ) } )}
    </TracksContainer>
  );
}

const TrackContainer = styled.li`
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${ props => props.theme.color.border };
  h2 {
    margin-bottom: 4px;
    font-size: 15px;
  }
  time {
    font-size: 10px;
  }
`
const DistanceContainer = styled.span`
  font-size: 12px;
`

const Track = (props) => {
  const track = props.track;
  return (
    <TrackContainer>        
      <h2><Link to={`/editor/tracks/${track.id}`}>{track.title}</Link></h2>
      <p>{track.status === 'loading' ? <strong>Ładowanie</strong> : ''}</p>
      <p>{track.date ? <TimeAgo date={track.date.start} formatter={fimeAgoFormatter}></TimeAgo> : ''}</p>
      {track.distance && <DistanceContainer>{track.distance.toFixed(2)} km</DistanceContainer>}
      <button onClick={props.onRemoveTrack.bind(this, track.id)}>Usuń</button>
    </TrackContainer>
  )
}

export default TrackList;
