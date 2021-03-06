import { MULTIPLE } from '../actions/index'

export const ADD_NOTIFICATION = 'ADD_NOTIFICATION'
export const UPDATE_NOTIFICATION = 'UPDATE_NOTIFICATION'
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION'
export const REMOVE_ALL_NOTIFICATIONS = 'REMOVE_ALL_NOTIFICATION'


const demoPromtNotification = {
  id: 'demo-promt',
  title: 'notifications.demoTracks.title',
  message: 'notifications.demoTracks.message',
  action: {
    name: 'addDemoTracks',
    cta: 'notifications.demoTracks.actionCTA',
    icon: 'check'
  }
}

const removeOldTracksNotification = {
  id: 'remove-old-promt',
  title: 'notifications.removeSavedTracks.title',
  message: 'notifications.removeSavedTracks.message',
  action: {
    name: 'removeAllTracks',
    cta: 'notifications.removeSavedTracks.actionCTA',
    icon: 'check'
  }
}

const initialState = {
  items: [localStorage.getItem('trackInitialState') ? removeOldTracksNotification : demoPromtNotification ]
}

const applyAction = (state, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      state.items = [ ...state.items,  { ...action.notification } ]
      break

    case UPDATE_NOTIFICATION:
      
      state.items = state.items.map( notification => {
        if (notification.id === action.id) {
          return { ...notification, ...action.notification }
        } else {
          return notification
        }
      })
      break

    case REMOVE_NOTIFICATION:
      state.items = state.items.filter( notification => notification.id !== action.id )
      break

    case REMOVE_ALL_NOTIFICATIONS:
      state.items = [] 
      break

    default:
  }
  return state
}

const reducer = ( state = initialState, action ) => {
  let newState = {...state}

  if ( action.type === MULTIPLE ) {
    action.actions.forEach( subaction => {
      newState = applyAction(newState, subaction)
    })
  } else {
    newState = applyAction(newState, action)
  }
  
  return newState
}

export default reducer