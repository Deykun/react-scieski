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

export const updateTrack = ( { id, data={} } ) => ({
  type: UPDATE_TRACK,
  id: id ? id : data.id,
  track: data
})

export const sortTracks = ( { by, data={} } ) => ({
  type: SORT_TRACKS,
  by: by ? by : data.by
})