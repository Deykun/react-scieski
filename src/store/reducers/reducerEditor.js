import {
    ADD_NEW_TRACK,
    UPDATE_TRACK,
    REMOVE_TRACK
} from '../constants/actions';

const initialState = {
  tracks: [],
};

const reducer = ( state = initialState, action ) => {
  let newState = {...state};

  switch (action.type) {
    case ADD_NEW_TRACK: 
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

    default: 
      console.warn( `Unknow action type: ${action.type}`);
  }
  return newState;
}

export default reducer;