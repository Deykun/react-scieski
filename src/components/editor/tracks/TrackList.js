import React from 'react';

const TrackList = (props) => {
    return (
        <ul className="track-list">
            {props.tracks.map( (track) => {
            return (
                <li key={track.id}>
                    <h2>{track.title}</h2>
                    <button onClick={props.onRemoveTrack.bind(this, track.id)} >Usuń</button>
                </li>
            )
            })}
      </ul>
    );
}

export default TrackList;
