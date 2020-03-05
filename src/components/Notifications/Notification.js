import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { removeNotification } from '../../actions/notifications'

import Icon from '../../styles/ui/Icon'
import Button from '../../styles/ui/Button'
import ProgressBar from '../../styles/ui/ProgressBar'
import { NotificationItem, NotificationTitle, NotificationSubtitle, NotificationContent } from '../../styles/components/Notifications/Notification.js'

const Notification = ({type, id, title, subtitle, message, percent}) => {
  const dispatch = useDispatch()
  return (
    <NotificationItem key={id} tabIndex="0">
      <Button className="close" negativeActive iconleft="cross" iconsize={16} aria-label="Zamknij" tooltiptop onClick={() => dispatch( removeNotification({ id }) ) } />
      <NotificationTitle>
        {type === 'loading' && <Icon rotate={1} name="circular-graph" size={13} />}{' '}
        {type === 'success' && <Icon positive name="check" size={13} />}{' '}
        {title ? title : 'Powiadomienie'}
        {subtitle && <NotificationSubtitle> - {subtitle}</NotificationSubtitle>}
      </NotificationTitle>
      {type === 'loading' && percent && <ProgressBar value={percent} />}
      <NotificationContent>
        {message}
      </NotificationContent>
    </NotificationItem>
  )
}

Notification.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  message: PropTypes.string,
  percent: PropTypes.number
}

export default Notification
