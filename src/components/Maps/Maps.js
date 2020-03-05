import React from 'react'
import { useSelector } from 'react-redux'
import GMap from './GMap.js'

import { MapsList } from '../../styles/components/Maps/Maps'

const Maps = () => {
  const tracks = useSelector(state => state.tracks.items)
  const maps = useSelector(state => state.maps)

  return( 
    <MapsList>
      {maps.items.map( (map) => { return ( <GMap key={map.id} tracks={tracks} /> ) })}
    </MapsList>
  )
}

export default Maps