import { v4 } from 'node-uuid'

const ADD_NOTIFICATION = 'ADD_NOTIFICATION'
const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION'
const REMOVE_ALL_NOTIFICATION = 'REMOVE_ALL_NOTIFICATION'

const initialState = []

const reducer = ( state = initialState, action ) => {
  let newState = {...state}

  switch (action.type) {
    case ADD_NOTIFICATION: 
      newState.notifications = [ ...newState.notifications, action.notification ]
      break

    case REMOVE_NOTIFICATION:
      newState.notifications = newState.notifications.filter( notification => notification.id !== action.id )
      break

    case REMOVE_ALL_NOTIFICATION:
      newState.notifications = [] 
      break

    default: 
  }
  return newState
}

export default reducer