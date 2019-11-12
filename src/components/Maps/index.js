import React from 'react'
import { useSelector } from 'react-redux'
import GoogleMap from './GoogleMap'

import { MapsList } from '../../styles/components/Maps'

const Maps = () => {
  const tracks = useSelector(state => state.tracks)
  const maps = useSelector(state => state.maps)

  return( 
    <MapsList>
      {maps.items.map( (map) => { return ( <GoogleMap key={map.id} tracks={tracks} style={maps.style} /> ) })}
    </MapsList>
  )
}

export default Maps