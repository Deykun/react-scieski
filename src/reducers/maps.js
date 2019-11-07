import { v4 } from 'node-uuid'

export const ADD_MAP = 'ADD_MAP'

const initialState = {
  items: [
    { id: v4() }
  ]
}

const applyAction = (state, action) => {
  switch (action.type) {
    case ADD_MAP:
      state.items = [ ...state.items,  { id: v4() } ]
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