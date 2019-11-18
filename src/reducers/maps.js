import _ from 'lodash'
import { v4 } from 'node-uuid'

export const ADD_MAP = 'ADD_MAP'
export const MAP_STYLE_UPDATE = 'MAP_STYLE_UPDATE'

const initialState = {
  style: {
    stroke: {
      width: 1,
      opacity: 1
    }
  },
  items: [
    { 
      id: v4(),
      filters: []
    }
  ]
}

const applyAction = (state, action) => {
  switch (action.type) {
    case MAP_STYLE_UPDATE:
      state.style = { ...state.style }
      state.style = _.merge( state.style, action.style )
      break
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