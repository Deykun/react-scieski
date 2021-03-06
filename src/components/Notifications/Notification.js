import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { removeNotification, customActionFromNotification } from '../../actions/notifications'

import Icon from '../../styles/ui/Icon'
import Button from '../../styles/ui/Button'
import ProgressBar from '../../styles/ui/ProgressBar'
import { NotificationItem, NotificationTitle, NotificationSubtitle, NotificationContent, NotificationActions } from '../../styles/components/Notifications/Notification.js'

const Notification = ({type, id, title, subtitle, message, percent, action}) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const tWithValue = (trans) => {
    if ( typeof trans === 'string' ) {
      return t(trans)
    } else {
      const {text, ...values} = trans
      return t(text, values)
    }
  }

  return (
    <NotificationItem key={id} tabIndex="0">
      <Button 
        className="close" 
        negativeActive 
        iconleft="cross" 
        iconsize={16} 
        aria-label={t('common.close')} 
        tooltiptop 
        onClick={() => dispatch( removeNotification({ id }) ) } 
      />
      <NotificationTitle>
        {type === 'loading' && <Icon rotate={1} name="circular-graph" size={13} />}{' '}
        {type === 'success' && <Icon positive name="check" size={13} />}{' '}
        {title ? tWithValue(title) : t('notifications.default.title')}
        {subtitle && <NotificationSubtitle> - {tWithValue(subtitle)}</NotificationSubtitle>}
      </NotificationTitle>
      {type === 'loading' && typeof percent === 'number' && <ProgressBar value={percent} />}
      <NotificationContent>
        {message ? tWithValue(message) : ''}
      </NotificationContent>
      
      {action && action.name && 
        <NotificationActions>
          <Button 
            onClick={() => customActionFromNotification(dispatch, action.name)}
            iconleft={action.icon ? action.icon : null}
            positiveActive
          >
            {t(action.cta)}
          </Button>
        </NotificationActions>
      }
    </NotificationItem>
  )
}

Notification.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      text: PropTypes.string.isRequired
    })
  ]),
  subtitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      text: PropTypes.string.isRequired
    })
  ]),
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      text: PropTypes.string.isRequired
    })
  ]),
  action: PropTypes.shape({
    name: PropTypes.string,
    cta: PropTypes.string,
    icon: PropTypes.string
  }),
  percent: PropTypes.number
}

export default Notification
