import { v4 } from 'node-uuid'

export const ADD_NOTIFICATION = 'ADD_NOTIFICATION'
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION'
export const REMOVE_ALL_NOTIFICATION = 'REMOVE_ALL_NOTIFICATION'

const initialState = {
  items: []
}

const applyAction = (state, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION: 
      state.items = [ ...state.items, action.notification ]
      break

    case REMOVE_NOTIFICATION:
      state.items = state.items.filter( notification => notification.id !== action.id )
      break

    case REMOVE_ALL_NOTIFICATION:
      state.items = [] 
      break

    default:
  }
  return state
}

const reducer = ( state = initialState, action ) => {
  let newState = {...state}

  if ( action.type === 'MULTIPLE') {
    action.actions.forEach( subaction => {
      newState = applyAction(newState, subaction)
    })
  } else {
    newState = applyAction(newState, action)
  }
  
  return newState
}

export default reducer