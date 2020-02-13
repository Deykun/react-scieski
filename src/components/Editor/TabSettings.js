import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { updateStyle } from '../../actions/maps'

const TabSettings = () => {
  const mapsStyle = useSelector(state => state.maps.style)
  const dispatch = useDispatch()

  return (
    <>
      <h3>Stroke</h3>
      <input 
        type="number" 
        min="0.2" 
        max="5" 
        step="0.1" 
        value={mapsStyle.stroke.width} 
        onChange={ (e) => dispatch( updateStyle( { data:  { stroke: { width: Number( e.target.value ) } } } ) ) } 
      />
    </>
  )
}

export default TabSettings
