import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { Link } from 'react-router-dom'

import Icon from '../../../styles/ui/Icon'

import { TrackItem, TrackTitle, TrackSubtitle, TrackContent } from '../../../styles/components/Editor/TracksItem.js'

const TrackPreview = ({active=false, id, status, title, activity, date, distance}) => {

  const renderLoading = () => (
    <>
      <TrackTitle>
        <Icon rotate={1} name="circular-graph" size={13} />{' '}Ładowanie
        <TrackSubtitle>
          {' '}- {title}
        </TrackSubtitle>
      </TrackTitle>
      <TrackContent>Trwa pobieranie danych z pliku.</TrackContent>
    </>
  )

  const renderSuccess = () => (
    <>
      <TrackTitle>
        { distance > 0.8 ? `${distance.toFixed(2)} km` : `${(distance*1000).toFixed(1)} m` }
        
        <TrackSubtitle>
          {' '}- <span aria-label={moment(date.end).format('LL')}>{moment(date.end).fromNow()}</span>
          {' '}- <span>{activity}</span>
        </TrackSubtitle>
      </TrackTitle>
      <TrackContent><Link to={`/editor/tracks/${id}/edit`}>{title}</Link></TrackContent>
    </>
  )

  return <TrackItem active={active} tabIndex="0">
    { status === 'loading' && renderLoading() }
    { status === 'success' && renderSuccess() }
  </TrackItem>
}

TrackPreview.propTypes = {
  active: PropTypes.bool,
  id: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  activity: PropTypes.string,
  distance: PropTypes.number,
  date: PropTypes.shape({
    end: PropTypes.string,
  })
}

export default TrackPreview
