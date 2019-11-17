import React from 'react'
import { useSelector } from 'react-redux'

import GMap from '../Maps/GMap.js'

import { TrackMapPreview } from '../../styles/components/Editor/Track.js'

const TrackMap = ({track}) => {
  const maps = useSelector(state => state.maps)

  return <TrackMapPreview>
    <GMap tracks={[track]} mapStyle={maps.style} style={{ minHeight: 300 }} centerBounds={true} />
  </TrackMapPreview>
}

export default TrackMap
