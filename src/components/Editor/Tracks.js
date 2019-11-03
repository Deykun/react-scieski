import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { sortTracks } from '../../actions/tracks'

import TracksAdd from './TracksAdd.js'
import Track from './Track.js'

import Button from '../../styles/ui/Button'

import { TracksList, TracksNav } from '../../styles/components/Editor/Tracks.js'

const Tracks = () => {
  const tracks = useSelector(state => state.tracks)
  const dispatch = useDispatch()
  return (
    <>
      <TracksAdd />
      <TracksList>
        {tracks.items.map( (track) => 
          <Track key={track.id} {...track} />
        )}
      </TracksList>
      <TracksNav>
        <span>sortuj:</span>
        <Button onClick={ () => dispatch( sortTracks( { by: 'date'} )) } className={tracks.sorted_by === 'date' ? 'active' : ''}>data</Button>
        <Button onClick={ () => dispatch( sortTracks( { by: 'distance'} )) } className={tracks.sorted_by === 'distance' ? 'active' : ''}>dystans</Button>
      </TracksNav>
    </>
  )
}

export default Tracks
