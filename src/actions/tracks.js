import { 
  ADD_TRACK, 
  UPDATE_TRACK, 
  REMOVE_TRACK,
  REMOVE_ALL_TRACKS, 
  SORT_TRACKS,
  SAVE_TRACKS,
  REFRESH_SUMMARY
} from '../reducers/tracks'

import moment from 'moment'
import pLimit from 'p-limit'
import { v4 } from 'node-uuid'

import { multipleActions } from './index'
import { addNotification, updateNotification } from './notifications'
import { checkFileMetadata, checkResponseMetadata } from '../utils/helpers'
import { readFile, readFileFromURL } from '../utils/tracks.js'

export const addTrack = ( { data={} } ) => ({
  type: ADD_TRACK,
  track: data
})

export const updateTrack = ( { id, data={} } ) => ({
  type: UPDATE_TRACK,
  id: id ? id : data.id,
  track: data
})

export const removeTrack = ( { id, data={} } ) => ({
  type: REMOVE_TRACK,
  id: id ? id : data.id
})

export const removeAllTracks = () => ({
  type: REMOVE_ALL_TRACKS
})

export const sortTracks = ( { by, data={} } ) => ({
  type: SORT_TRACKS,
  by: by ? by : data.by
})

export const refreshTracksSummary = () => ({
  type: REFRESH_SUMMARY,
})

export const saveTracks = () => ({
  type: SAVE_TRACKS,
})


export const addTracks = ( { dispatch, files, urls } ) => {
  if ( !files && !urls ) {
    console.error('Missing files or urls.')
    return
  }
  const from = {
    files: 'files',
    urls: 'urls'
  }
  const fetchFrom = files ? from.files : from.urls
  let tracks = files ? files : urls
  if ( !Array.isArray( tracks ) ) { tracks = [tracks] }

  const progressNotificationId = v4()
  dispatch( addNotification({ data: {
    type: 'loading',
    percent: 0,
    id: progressNotificationId,
    title: 'notifications.uploading.title',
    subtitle: {
      text: 'notifications.uploading.subtitle',
      count: tracks.length
    },
    message: 'notifications.uploading.message'
  }}) )

  const limit = pLimit(30)
  const startTime = new Date()
    
  let processed = 0
  const updateProgress = () => {
    processed = processed + 1
    const progress = Math.round( (processed / tracks.length ) * 100)
  
    return updateNotification({ id: progressNotificationId, data: {
      title: {
        text: 'notifications.uploading.progress.title',
        count: progress
      },
      subtitle: {
        text: 'notifications.uploading.progress.subtitle',
        count: tracks.length
      },
      percent: progress,
      message: {
        text: 'notifications.uploading.progress.message',
        count: processed
      },
    }})
  }

  let actions = []

  if ( fetchFrom === from.files ) {
    let promises = tracks.map( file => {
      return limit(() => new Promise( resolve => {
        const processFile = async (file) => {
          const fileMetadata = checkFileMetadata( file )
          if ( !(fileMetadata.isFormatAllowed) ) {
            actions.push( addNotification({ id: v4(), 
              code: 'FILE_FORMAT_REJECTED',
              data: {
                title: 'notifications.rejeced_format.title',
                subtitle: {
                  text: 'notifications.rejeced_format.subtitle',
                  value: fileMetadata.data.format
                },
                message: {
                  text: 'notifications.rejeced_format.message',
                  value: fileMetadata.data.name
                }
              }
            }))
          } else {
            file.id = v4()
            file.format = fileMetadata.data.format
            const addTrack = await readFile( file )
            actions.push({ 
              id: file.id, 
              ...addTrack, 
              track: { 
                id: file.id, 
                ...fileMetadata.data, 
                ...addTrack.track 
              } 
            })
          }
          actions.push( updateProgress() )
          if ( actions.length > 12 ) {
            await dispatch( multipleActions( actions ) )
            actions = []
          }
          resolve()
        }
        processFile( file )
      }))
    })
    
    Promise.all(promises).then( async () => {
      await dispatch( multipleActions( actions ) )
    
      const endTime = new Date()
      const performenceInMs = moment(endTime).diff(moment(startTime))
      const performenceInMin = Math.floor( performenceInMs / 1000 / 60 )
      const performenceInSec = Math.floor( performenceInMs / 1000 )
    
      dispatch( updateNotification({ id: progressNotificationId, data: {
        title: {
          text: 'notifications.completed.title',
          count: tracks.length
        },
        type: 'success',
        subtitle: '',
        message: performenceInMin > 2 ? {
          text: 'notifications.completed.messageMin',
          count: performenceInMin
        } : {
          text: 'notifications.completed.messageSec',
          count: performenceInSec
        }
      }}) )
      dispatch( refreshTracksSummary() )
      dispatch( saveTracks() )
    })
  }

  if ( fetchFrom === from.urls ) {
    let promises = tracks.map( url => {
      return limit(() => fetch(url).then( response => new Promise( resolve => {
        const processResponse = async ( response ) => {
          const fileMetadata = checkResponseMetadata( response )
          if ( !(fileMetadata.isFormatAllowed) ) {
            actions.push( addNotification({ id: v4(), 
              code: 'FILE_FORMAT_REJECTED',
              data: {
                title: 'notifications.rejeced_format.title',
                subtitle: {
                  text: 'notifications.rejeced_format.subtitle',
                  value: fileMetadata.data.format
                },
                message: {
                  text: 'notifications.rejeced_format.message',
                  value: fileMetadata.data.name
                }
              }
            }))
          } else {
            const file = {
              id: v4(),
              format: fileMetadata.data.format
            }
            const addTrack = await readFileFromURL( file, response )
            actions.push({ 
              id: file.id, 
              ...addTrack, 
              track: { 
                id: file.id, 
                ...fileMetadata.data, 
                ...addTrack.track 
              } 
            })
          }
          actions.push( updateProgress() )
          if ( actions.length > 12 ) {
            await dispatch( multipleActions( actions ) )
            actions = []
          }
          resolve()
        }
        processResponse( response )

      })))
    })
    
    Promise.all(promises).then( async () => {
      await dispatch( multipleActions( actions ) )
    
      const endTime = new Date()
      const performenceInMs = moment(endTime).diff(moment(startTime))
      const performenceInMin = Math.floor( performenceInMs / 1000 / 60 )
      const performenceInSec = Math.floor( performenceInMs / 1000 )
    
      dispatch( updateNotification({ id: progressNotificationId, data: {
        title: {
          text: 'notifications.completed.title',
          count: tracks.length
        },
        type: 'success',
        subtitle: '',
        message: performenceInMin > 2 ? {
          text: 'notifications.completed.messageMin',
          count: performenceInMin
        } : {
          text: 'notifications.completed.messageSec',
          count: performenceInSec
        }
      }}) )
      dispatch( refreshTracksSummary() )
      dispatch( saveTracks() )
    })
  }
}

export const addDemoTracks = (dispatch) => {
  const fetchDemoTracks = async () => {
    const tracksIndex = await fetch('/demo-tracks.json')
    const tracksToFetch = await tracksIndex.json()
    await addTracks( { dispatch: dispatch, urls: tracksToFetch.map( file => file.path )} )
  }
  fetchDemoTracks()
}

