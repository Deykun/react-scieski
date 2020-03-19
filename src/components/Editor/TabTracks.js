import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { useSelector, useDispatch } from 'react-redux'
import { sortTracks } from '../../actions/tracks'

import TracksAdd from './Tracks/TracksAdd.js'
import TracksItem from './Tracks/TracksItem.js'
import TracksItemPined from './Tracks/TracksItemPined.js'

import Button from '../../styles/ui/Button'
import Loading from '../../styles/ui/Loading'

import { TracksList, TracksNav } from '../../styles/components/Editor/Tracks.js'

const TabTracks = ( {match} ) => {
  const tracks = useSelector(state => state.tracks)
  const dispatch = useDispatch()
  const pageSize = 45
  const [page, setPage] = useState(1)

  const moreTracksToShow = () => {
    return page * pageSize < tracks.items.length
  }

  const handleScroll = (e) => {
    let list = e.target
    if (list.scrollHeight - list.scrollTop === list.clientHeight) {
      if ( moreTracksToShow() ) {
        setTimeout( () => setPage( page + 1 ), 800 )
      }
    }
  }

  return (
    <>
      <TracksAdd />      
      <TracksList onScroll={e => handleScroll(e)}>
        {match.params.id && tracks.items.filter( (track) => track.id === match.params.id ).map( 
          (track) => <TracksItemPined key={track.id} {...track} />
        )}
        {tracks.items.slice(0, page * pageSize ).map( (track) => 
          <TracksItem key={track.id} {...track} />
        )}
        {moreTracksToShow() && <Loading text="Ładowanie tras" />}
      </TracksList>
      <TracksNav>
        <span>sortuj:</span>
        <Button onClick={ () => dispatch( sortTracks( { by: 'date'} )) } className={tracks.sorted_by === 'date' ? 'active' : ''}>data</Button>
        <Button onClick={ () => dispatch( sortTracks( { by: 'distance'} )) } className={tracks.sorted_by === 'distance' ? 'active' : ''}>dystans</Button>
      </TracksNav>
    </>
  )
}

TabTracks.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  })
}

export default TabTracks
