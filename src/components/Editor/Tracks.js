import React from 'react'
import { useSelector } from 'react-redux'

import TracksAdd from './TracksAdd.js'
import Track from './Track.js'

const Tracks = () => {
  const tracks = useSelector(state => state.tracks)
  return (
    <>
      <TracksAdd />
      <ul style={{overflow: 'auto'}}>
        {tracks.items.map( (track) => 
          <Track key={track.id} {...track} />
        )}
      </ul>
    </>
  )
}

export default Tracks
