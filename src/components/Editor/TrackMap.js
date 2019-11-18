import React from 'react'

import GMap from '../Maps/GMap.js'

import { TrackMapPreview } from '../../styles/components/Editor/Track.js'

const TrackMap = ({track}) => {

  return <TrackMapPreview>
    <GMap tracks={[track]} style={{ minHeight: 300 }} centerBounds={true} force={{ pathColor: '#db4436' }} />
  </TrackMapPreview>
}

export default TrackMap
