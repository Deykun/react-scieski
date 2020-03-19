import React, {useCallback} from 'react'
import moment from 'moment'
import pLimit from 'p-limit'

import { useDispatch } from 'react-redux'
import { multipleActions } from '../../../actions'
import { refreshTracksSummary, saveTracks } from '../../../actions/tracks'
import { addNotification, updateNotification } from '../../../actions/notifications'

import { v4 } from 'node-uuid'
import { useDropzone } from 'react-dropzone'
import { useTranslation } from 'react-i18next'

import { DropZoneContainer } from '../../../styles/components/Editor/TracksAdd.js'

import { checkFileMetadata } from '../../../utils/helpers'
import { readFile } from '../../../utils/tracks.js'

const processFiles = (dispatch, files) => {
/* One file is treated the same way */
  if ( !Array.isArray( files ) ) { files = [files] }

  const progressNotificationId = v4()
  dispatch( addNotification({ data: {
    type: 'loading',
    percent: 0,
    id: progressNotificationId,
    title: 'notifications.uploading.title',
    subtitle: {
      text: 'notifications.uploading.subtitle',
      count: files.length
    },
    message: 'notifications.uploading.message'
  }}) )

  const limit = pLimit(30)
  
  const startTime = new Date()

  let processed = 0
  const updateProgress = () => {
    processed = processed + 1
    const progress = Math.round( (processed / files.length ) * 100)

    return updateNotification({ id: progressNotificationId, data: {
      title: {
        text: 'notifications.uploading.progress.title',
        count: progress
      },
      subtitle: {
        text: 'notifications.uploading.progress.subtitle',
        count: files.length
      },
      percent: progress,
      message: {
        text: 'notifications.uploading.progress.message',
        count: processed
      },
    }})
  }

  let actions = []
  let promises = files.map( file => {
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
        count: files.length
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


const TracksAdd = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation() 

  const onDrop = useCallback( files => {
    processFiles(dispatch, files) 
  }, [dispatch])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <DropZoneContainer {...getRootProps()} isDragActive={isDragActive} className="track-add" style={{}} >
      <input {...getInputProps()} />
      {isDragActive ? 
        <p>{t('tracks.add.dropHere')}</p> :
        <p>
          {t('tracks.add.hint.drop')} (.<strong>tcx</strong>, .<strong>gpx</strong>)
          <br /> {t('tracks.add.hint.orPick')}
          <strong className="positive"> {t('tracks.add.hint.here')}</strong>.
        </p>
      }
    </DropZoneContainer>
  )
} 

export default TracksAdd
