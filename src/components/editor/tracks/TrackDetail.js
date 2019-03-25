import React from 'react';

const TrackDetail = (props) => {
    const track = props.track;
    return (
        <section key={track.id}>
            <h1>{track.title}</h1>
            {/* <button onClick={props.onRemoveTrack.bind(this, track.id)}>Usuń</button> */}
        </section>
    )
}

export default TrackDetail;
