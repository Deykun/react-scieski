import { v4 } from 'node-uuid'

import { 
  ADD_NOTIFICATION, 
  REMOVE_NOTIFICATION, 
  REMOVE_ALL_NOTIFICATIONS
} from '../reducers/notifications'

export const addNotification = ( { data={} } ) => ({
  type: ADD_NOTIFICATION,
  notification: { ...data, id: data.id ? data.id : v4()}
})

export const removeNotification = ( { id, data={} } ) => ({
  type: REMOVE_NOTIFICATION,
  id: id ? id : data.id
})

export const removeAllNotifications = ( ) => ({
  type: REMOVE_ALL_NOTIFICATIONS,
})

