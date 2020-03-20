import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import moment from 'moment'

import Icon from '../../styles/ui/Icon'

import { Card, CardTitle, StatsList, StatsListItem, TrackValue, Unit, AvgValue } from '../../styles/components/Editor/TrackComparison.js'

const TrackComparison = ({track}) => {
  const { t } = useTranslation()
  const {distance, speed, durationMs } = track
  const tracksAvg = useSelector(state => state.tracks.summary.avg)

  return <Card>
    <CardTitle>{t('tracks.detail.statistics')}</CardTitle>
    <StatsList>
      <StatsListItem aria-label={t('common.distance')}>
        <TrackValue>{distance.toFixed(2)} <Unit>km</Unit></TrackValue>
        <Icon positive name="map" size={21} />
        <AvgValue>{tracksAvg.distance.toFixed(2)} <Unit>km</Unit></AvgValue>
      </StatsListItem>
      <StatsListItem aria-label={t('common.speed')}>
        <TrackValue>{speed.toFixed(2)} <Unit><sup>km</sup>/<sub>h</sub></Unit></TrackValue>
        <Icon positive name="gauge" size={21} />
        <AvgValue>{tracksAvg.speed.toFixed(2)} <Unit><sup>km</sup>/<sub>h</sub></Unit></AvgValue>
      </StatsListItem>
      <StatsListItem aria-label={t('common.duration')}>
        <TrackValue>{moment.utc(durationMs).format('HH:mm')}</TrackValue>
        <Icon positive name="clock" size={21} />
        <AvgValue>{moment.utc(tracksAvg.durationMs).format('HH:mm') }</AvgValue>
      </StatsListItem>
    </StatsList>
  </Card>
}

TrackComparison.propTypes = {
  track: PropTypes.shape({
    distance: PropTypes.number.isRequired,
    speed: PropTypes.number.isRequired,
    durationMs: PropTypes.number.isRequired
  }).isRequired
}

export default TrackComparison
