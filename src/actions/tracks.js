import { 
  ADD_TRACK, 
  UPDATE_TRACK, 
  // REMOVE_TRACK, 
  SORT_TRACKS 
} from '../reducers/tracks'

export const addTrack = ( { data={} } ) => ({
  type: ADD_TRACK,
  track: data
})

export const updateTrack = ( { data={} } ) => ({
  type: UPDATE_TRACK,
  track: data
})

export const sortTracks = ( { by, data={} } ) => ({
  type: SORT_TRACKS,
  by: by ? by : data.by
})