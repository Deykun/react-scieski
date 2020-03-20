import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { removeAllNotifications } from '../../actions/notifications'

import Notification from './Notification.js'

import Button from '../../styles/ui/Button'
import { NotificationsList, NotificationsGlobalNav } from '../../styles/components/Notifications/Notifications'

const Notifications = () => {
  const notifications = useSelector(state => state.notifications)
  const dispatch = useDispatch()
  const { t } = useTranslation()
  return (
    <NotificationsList aria-label={t('notifications.title')}>
      {notifications.items.map( (notification) => <Notification key={notification.id} {...notification} /> )}
      <NotificationsGlobalNav hide={notifications.items.length < 5}>
        <Button className="close-all" negativeActive iconleft="cross" iconsize={20} aria-label={t('common.closeAll')} onClick={ () => dispatch( removeAllNotifications() )} />
      </NotificationsGlobalNav>
    </NotificationsList>
  )
}

export default Notifications