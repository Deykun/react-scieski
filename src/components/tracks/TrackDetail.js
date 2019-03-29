import React from 'react';

const TrackDetail = (props) => {
    const track = props.track;
    return (
        <section key={track.id}>
            <h1>{track.title}</h1>
            <p>{track.distance ? ( track.distance > 0.8 ? <strong>{track.distance.toFixed(2)} km</strong> : <strong>{(track.distance*1000).toFixed(1)} m</strong>)  : `brak danych`}</p>
            <button onClick={props.onRemoveTrack.bind(this, track.id)}>Usuń</button>
        </section>
    )
}

export default TrackDetail;
