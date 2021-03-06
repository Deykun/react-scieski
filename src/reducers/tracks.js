import { MULTIPLE } from '../actions/index'
export const ADD_TRACK = 'ADD_TRACK'
export const UPDATE_TRACK = 'UPDATE_TRACK'
export const REMOVE_TRACK = 'REMOVE_TRACK'
export const REMOVE_ALL_TRACKS = 'REMOVE_ALL_TRACKS'
export const SORT_TRACKS = 'SORT_TRACKS'
export const SAVE_TRACKS = 'SAVE_TRACKS'
export const REFRESH_SUMMARY = 'REFRESH_SUMMARY'

const defaultInitialState = {
  summary: {
    avg: {
      distance: 0,
      durationMs: 0,
      speed: 0,
    },
    total: {
      distance: 0,
      durationMs: 0
    }
  },
  items: [],
  sorted_by: ''
}

const initialState = localStorage.getItem('trackInitialState') ? JSON.parse(localStorage.getItem('trackInitialState')) : defaultInitialState

const applyAction = (state, action) => {
  switch (action.type) {
    case ADD_TRACK: 
      state.items = [ ...state.items, action.track ]
      state.sorted_by = ''
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
      break

    case REMOVE_ALL_TRACKS: 
      state = { ...defaultInitialState }
      try {
        localStorage.removeItem('trackInitialState')
      } catch (e) {
        console.error(e)
      }
      break

    case SORT_TRACKS:
      switch(action.by) {
        case 'date':
          state.items = state.items.sort( (a, b) => ( a.date && b.date && (new Date( a.date.start ) < new Date( b.date.start ) ) ) ? 1 : -1 )
          state.sorted_by = 'date'
          break

        default: 
          state.items = state.items.sort( (a, b) => ( a.distance && b.distance && ( a.distance < b.distance ) ? 1 : -1 ) )
          state.sorted_by = 'distance'
      }
      break

    case SAVE_TRACKS: 
      try {
        localStorage.setItem('trackInitialState', JSON.stringify(state) )
      } catch (e) {
        console.error(e)
      }
      break

    case REFRESH_SUMMARY: {
      let distance = 0
      let durationMs = 0
      let speed = 0
      let total = 0
      state.items.forEach( track => {
        if ( track.status === 'success' ) {
          distance += track.distance
          durationMs += track.durationMs
          speed += track.speed
          total += 1
        }
      })
      if ( total > 0 ) {
        state.summary.total = {
          distance,
          durationMs
        }
        state.summary.avg = {
          distance: (distance / total),
          durationMs: (durationMs / total),
          speed: (speed / total)
        }
      }
    }
      break
    default: 
  }
  return state
}

const reducer = ( state = initialState, action ) => {
  let newState = {...state, items: [...state.items]}

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