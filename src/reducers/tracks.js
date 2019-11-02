import { v4 } from 'node-uuid'

export const ADD_TRACK = 'ADD_TRACK'
export const UPDATE_TRACK = 'UPDATE_TRACK'
export const REMOVE_TRACK = 'UPDATE_TRACK'
export const SORT_TRACKS = 'SORT_TRACKS'

const initialState = {
  items: [],
  sort: 'date'
}

const applyAction = (state, action) => {
  switch (action.type) {
    case ADD_TRACK: 
      state.items = [ ...state.items, action.track ]
      break

    case UPDATE_TRACK:
      state.items = state.items.map( track => {
        if (track.id === action.id) {
          return { ...track, ...action.track }
        } else {
          return track
        }
      })
      break

    case REMOVE_TRACK:
      state.items = state.items.filter( track => track.id !== action.id )
      state.notifications = [ ...state.notifications, { id: v4(), content: 'Trasa została usunięta.'} ]
      break

    case SORT_TRACKS:
      
      switch(action.by) {
        case 'date':
          state.items = state.items.sort( (a, b) => ( a.date && b.date && (new Date( a.date.start ) < new Date( b.date.start ) ) ) )
          break

        default: 
          state.items = state.items.sort( (a, b) => ( a.distance && b.distance && ( a.distance < b.distance ) ) ).map( track => track )
      }
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