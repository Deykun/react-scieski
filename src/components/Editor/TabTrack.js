import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { addNotification } from '../../actions/notifications'

import Button from '../../styles/ui/Button'

import TrackMap from './TrackMap.js'

const TabTrack = ( {match} ) => {
  const track = useSelector(state => state.tracks.items.filter( track => track.id === match.params.id )[0] )
  // const track = useSelector(state => state.tracks )
  const dispatch = useDispatch()
  
  if ( !track ) {
    dispatch( addNotification({ data: {
      title: 'Nie znaleziono trasy',
      message: `Trasa z ${match.params.id} nie została znaleziona.`
    }}) )
    return ( <Redirect to="/editor/tracks" />) 
  }

  return (
    <>
      {/* <h1>{track.title}d</h1>   */}
      <TrackMap track={track} />
    </>
  )
}

TabTrack.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    })
  }),
}

export default TabTrack
