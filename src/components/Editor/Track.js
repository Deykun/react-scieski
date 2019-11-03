import React from 'react'
import moment from 'moment'

import Icon from '../../styles/ui/Icon'

import { TrackItem, TrackTitle, TrackSubtitle, TrackContent } from '../../styles/components/Editor/Track.js'

const Track = ({id, status, title, activity, date, distance}) => {

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
      <TrackContent>{title}</TrackContent>
    </>
  )

  return <TrackItem tabIndex="0">
    { status === 'loading' && renderLoading() }
    { status === 'success' && renderSuccess() }
  </TrackItem>
}

export default Track
