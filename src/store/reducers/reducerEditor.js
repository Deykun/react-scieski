import {
    ADD_TRACK,
    UPDATE_TRACK,
    REMOVE_TRACK,
    SORT_TRACKS,
    ADD_NOTIFICATION,
    REMOVE_NOTIFICATION,
    REMOVE_ALL_NOTIFICATION
} from '../constants/actions';

import { v4 } from 'node-uuid';

const initialState = {
  tracks: [],
  notifications: []
};

const reducer = ( state = initialState, action ) => {
  let newState = {...state};

  switch (action.type) {
    case ADD_TRACK: 
      newState.tracks = [ ...newState.tracks, action.track ];
      break;

    case UPDATE_TRACK:
      newState.tracks = newState.tracks.map( track => {
        if (track.id === action.id) {
          return { ...track, ...action.track }
        } else {
          return track
        }
      })
      break;

    case REMOVE_TRACK:
      newState.tracks = newState.tracks.filter( track => track.id !== action.id ); 
      newState.notifications = [ ...newState.notifications, { id: v4(), content: 'Trasa została usunięta.'} ];
      break;

    case SORT_TRACKS:
      switch(action.by) {
        case 'date':
          newState.tracks = newState.tracks.sort( (a, b) => ( a.date && b.date && (new Date( a.date.start ) < new Date( b.date.start ) ) ) ).map( track => track );
          newState.notifications = [ ...newState.notifications, { id: v4(), title: 'Sortowanie', content: 'Trasy zostały posortowane po dacie.'} ];
          break;

        default: 
          newState.tracks = newState.tracks.sort( (a, b) => ( a.distance && b.distance && ( a.distance < b.distance ) ) ).map( track => track );
          newState.notifications = [ ...newState.notifications, { id: v4(), title: 'Sortowanie', content: 'Trasy zostały posortowane po dystansie.'} ];
      }
      
      break;

    case ADD_NOTIFICATION: 
      newState.notifications = [ ...newState.notifications, action.notification ];
      break;

    case REMOVE_NOTIFICATION:
      newState.notifications = newState.notifications.filter( notification => notification.id !== action.id ); 
      break;

    case REMOVE_ALL_NOTIFICATION:
      newState.notifications = []; 
      break;

    default: 
  }
  return newState;
}

export default reducer;