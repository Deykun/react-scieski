import { v4 } from 'node-uuid'
import { addDemoTracks, removeAllTracks } from './tracks'

import { 
  ADD_NOTIFICATION, 
  UPDATE_NOTIFICATION,
  REMOVE_NOTIFICATION, 
  REMOVE_ALL_NOTIFICATIONS
} from '../reducers/notifications'

export const addNotification = ( { data={} } ) => ({
  type: ADD_NOTIFICATION,
  notification: { ...data, id: data.id ? data.id : v4()}
})

export const updateNotification = ( { id, data={} } ) => ({
  type: UPDATE_NOTIFICATION,
  id: id ? id : data.id,
  notification: data
})

export const removeNotification = ( { id, data={} } ) => ({
  type: REMOVE_NOTIFICATION,
  id: id ? id : data.id
})

export const removeAllNotifications = ( ) => ({
  type: REMOVE_ALL_NOTIFICATIONS,
})

const customAction = {
  addDemoTracks: (dispatch) => {
    dispatch( removeNotification({ id: 'demo-promt' }) )
    addDemoTracks(dispatch)
  },
  removeAllTracks: (dispatch) => {
    dispatch( removeNotification({ id: 'remove-old-promt' }) )
    dispatch( removeAllTracks() )
  }
}

export const customActionFromNotification = ( dispatch, actionname ) => {
  return customAction[actionname](dispatch)
}

