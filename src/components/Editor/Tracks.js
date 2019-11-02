import React from 'react'
import { useSelector } from 'react-redux'

import TracksAdd from './TracksAdd.js'

const Tracks = () => {
  const tracks = useSelector(state => state.tracks)
  return (
    <>
      <TracksAdd />
      <ul>
        {tracks.items.map( (track) => 
          <li key={track.id}>{track.title} - {track.status}</li>
        )}
      </ul>
    </>
  )
}

export default Tracks
