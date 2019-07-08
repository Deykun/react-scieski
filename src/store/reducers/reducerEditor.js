import {
    ADD_TRACK,
    UPDATE_TRACK,
    REMOVE_TRACK,
    ADD_NOTIFICATION,
    REMOVE_NOTIFICATION,
    REMOVE_ALL_NOTIFICATION
} from '../constants/actions';

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