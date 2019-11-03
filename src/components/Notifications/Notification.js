import React from 'react'
import { useDispatch } from 'react-redux'
import { removeNotification } from '../../actions/notifications'

import Button from '../../styles/ui/Button'
import { NotificationItem, NotificationTitle, NotificationSubtitle, NotificationContent } from '../../styles/components/Notifications/Notification.js'

const Notification = ({id, title, subtitle, message}) => {
  const dispatch = useDispatch()
  return (
    <NotificationItem key={id} tabIndex="0">
      <Button className="close" negativeActive iconleft="cross" iconsize={16} aria-label="Zamknij" onClick={() => dispatch( removeNotification({ id }) ) } />
      <NotificationTitle>{title ? title : 'Powiadomienie'}{subtitle && <NotificationSubtitle> - {subtitle}</NotificationSubtitle>}</NotificationTitle>
      <NotificationContent>{message}</NotificationContent>
    </NotificationItem>
  )
}

export default Notification
