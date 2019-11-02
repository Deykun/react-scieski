import { 
  ADD_TRACK, 
  // UPDATE_TRACK, 
  // REMOVE_TRACK, 
  // SORT_TRACKS 
} from '../reducers/tracks'

export const addTrack = ( { data={} } ) => ({
  type: ADD_TRACK,
  track: data
})