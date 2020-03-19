import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

import { Link } from 'react-router-dom'

import Icon from '../../../styles/ui/Icon'
import Button from '../../../styles/ui/Button'

import { TrackItem, TrackTitle, TrackSubtitle } from '../../../styles/components/Editor/TracksItem.js'

const TracksItemPined = ({id, status, title, activity, date, distance}) => {
  const { t } = useTranslation() 

  const renderLoading = () => (
    <TrackTitle>
      <Icon rotate={1} name="circular-graph" size={13} />{' '}{t('common.loading')}
      <TrackSubtitle>
        {' '}- {title}
      </TrackSubtitle>
    </TrackTitle>
  )

  const renderSuccess = () => (
    <TrackTitle as={Link} to={`/editor/tracks/${id}/edit`}>
      { distance > 0.8 ? `${distance.toFixed(2)} km` : `${(distance*1000).toFixed(1)} m` }
      <TrackSubtitle>
        {' '}- <span aria-label={moment(date.end).format('LL')}>{moment(date.end).fromNow()}</span>
        {' '}- <span>{activity}</span>
      </TrackSubtitle>
    </TrackTitle>
  )

  return <TrackItem pined={true}>
    <Button className="close" negative={1} as={Link} to="/editor/tracks" iconleft="cross" iconsize={16} />
    { status === 'loading' && renderLoading() }
    { status === 'success' && renderSuccess() }
    
  </TrackItem>
}

TracksItemPined.propTypes = {
  id: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  activity: PropTypes.string,
  distance: PropTypes.number,
  date: PropTypes.shape({
    end: PropTypes.string,
  })
}

export default TracksItemPined
