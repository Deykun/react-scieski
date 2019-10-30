import { v4 } from 'node-uuid'

const ADD_TRACK = 'ADD_TRACK'
const UPDATE_TRACK = 'UPDATE_TRACK'
const REMOVE_TRACK = 'UPDATE_TRACK'
const SORT_TRACKS = 'SORT_TRACKS'

const initialState = {
  tracks: [],
  sort: 'date'
}

const reducer = ( state = initialState, action ) => {
  let newState = {...state}

  switch (action.type) {
    case ADD_TRACK: 
      newState.tracks = [ ...newState.tracks, action.track ];
      break

    case UPDATE_TRACK:
      newState.tracks = newState.tracks.map( track => {
        if (track.id === action.id) {
          return { ...track, ...action.track }
        } else {
          return track
        }
      })
      break

    case REMOVE_TRACK:
      newState.tracks = newState.tracks.filter( track => track.id !== action.id ); 
      newState.notifications = [ ...newState.notifications, { id: v4(), content: 'Trasa została usunięta.'} ];
      break

    case SORT_TRACKS:
      
      switch(action.by) {
        case 'date':
          newState.tracks = newState.tracks.sort( (a, b) => ( a.date && b.date && (new Date( a.date.start ) < new Date( b.date.start ) ) ) )
          // newState.notifications = [ ...newState.notifications, { id: v4(), title: 'Sortowanie', content: 'Trasy zostały posortowane po dacie.'} ]
          break

        default: 
          newState.tracks = newState.tracks.sort( (a, b) => ( a.distance && b.distance && ( a.distance < b.distance ) ) ).map( track => track )
          // newState.notifications = [ ...newState.notifications, { id: v4(), title: 'Sortowanie', content: 'Trasy zostały posortowane po dystansie.'} ]
      }
      break

    default: 

  }
  return newState
}

export default reducer