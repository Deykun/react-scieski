import { 
  ADD_NOTIFICATION, 
  // REMOVE_NOTIFICATION, 
  // REMOVE_ALL_NOTIFICATION
} from '../reducers/notifications'

export const addNotification = ( { data={} } ) => ({
  type: ADD_NOTIFICATION,
  notification: data
})