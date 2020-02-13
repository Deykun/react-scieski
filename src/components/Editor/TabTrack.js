import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import moment from 'moment'

import { useSelector, useDispatch } from 'react-redux'
import { updateTrack, removeTrack } from '../../actions/tracks.js'

import Button from '../../styles/ui/Button'
import Input from '../../styles/ui/Input'

import { TrackFooter } from '../../styles/components/Editor/Track.js'


import TrackComparison from './TrackComparison.js'
import TrackMap from './TrackMap.js'

const TabTrack = ( {match} ) => {
  const id = match.params.id
  const track = useSelector(state => state.tracks.items.filter( track => track.id === id )[0] )
  const dispatch = useDispatch()
  
  if ( !track ) {
    return ( <Redirect to="/editor/tracks" />) 
  }

  const handleRemove = () => {
    if ( window.confirm(`Usunąć trasę "${track.title}"?`) ) {
      dispatch( removeTrack( { id: id } ) )
    }
  }

  return (
    <>
      <TrackComparison track={track} />
      <Input 
        id="update-track-title"
        value={track.title}
        label='Nazwa trasy'
        placeholder='Spacer'
        onChange={(newTitle) => dispatch( updateTrack( { id: id, data: { title: newTitle } } ) )} 
      />
      <Input 
        id="update-track-activity"
        value={track.activity}
        maxLength={20}
        label='Rodzaj aktywności'
        placeholder='walking'
        onChange={(newActivity) => dispatch( updateTrack( { id: id, data: { activity: newActivity } } ) )} 
      />
      <TrackFooter>
        <span><strong>{moment(track.date.end).format('LL')}</strong> - {moment(track.date.end).fromNow()}</span>
        <Button onClick={handleRemove} iconleft="bucket" iconsize={21} negative={1}>usuń</Button>
      </TrackFooter>
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
