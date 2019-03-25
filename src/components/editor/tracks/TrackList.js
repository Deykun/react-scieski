import React from 'react';
import { Link } from 'react-router-dom';

const TrackList = (props) => {
    return (
        <ul className="track-list">
            {props.tracks.map( (track) => { return ( <Track key={track.id} track={track} onRemoveTrack={props.onRemoveTrack}></Track> ) } )}
        </ul>
    );
}

const Track = (props) => {
    const track = props.track;
    return (
        <li>        
            <h2><Link to={`/editor/tracks/${track.id}`}>{track.title}</Link></h2>
            <p>{track.distance ? <strong>{track.distance.toFixed(2)} km</strong> : `brak danych`}</p>
            <button onClick={props.onRemoveTrack.bind(this, track.id)}>Usuń</button>
        </li>
    )
}

export default TrackList;
