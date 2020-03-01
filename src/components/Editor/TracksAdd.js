import React, {useCallback} from 'react'
import moment from 'moment'
import pLimit from 'p-limit'

import { useDispatch } from 'react-redux'
import { multipleActions } from '../../actions/'
import { refreshTracksSummary, saveTracks } from '../../actions/tracks'
import { addNotification, updateNotification } from '../../actions/notifications'

import { v4 } from 'node-uuid'
import { useDropzone } from 'react-dropzone'

import { DropZoneContainer } from '../../styles/components/Editor/TracksAdd.js'

import { checkFileMetadata } from '../../utils/helpers'
import { readFile } from '../../utils/tracks.js'

const processFiles = (dispatch, files) => {
/* One file is treated the same way */
  if ( !Array.isArray( files ) ) { files = [files] }

  const progressNotificationId = v4()
  dispatch( addNotification({ data: {
    type: 'loading',
    percent: 0,
    id: progressNotificationId,
    title: 'Importowanie',
    subtitle: `sprawdzanie ${files.length} plików`,
    message: 'Tylko pliki w odpowiednim formacie zostaną dodane.'
  }}) )

  const limit = pLimit(30)
  
  const startTime = new Date()

  let processed = 0
  const updateProgress = () => {
    processed = processed + 1
    const progress = Math.round( (processed / files.length ) * 100)

    return updateNotification({ id: progressNotificationId, data: {
      title: `Importowanie ${progress}%`,
      subtitle: `${files.length} plików`,
      percent: progress,
      message: `Sprawdzono ${processed} pliki.`
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
              title: `Pominięto plik .${fileMetadata.data.format}`,
              subtitle: 'nieobsługiwane roszerzenie',
              message: `Plik: ${fileMetadata.data.name} został pominięty.`,
            }
          }))
        } else {
          file.id = v4()
          file.format = fileMetadata.data.format
          const addTrack = await readFile( file )
          actions.push( { id: file.id, ...addTrack, track: { ...fileMetadata.data, ...addTrack.track } } )
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
    const performenceInSec = Math.floor( ( performenceInMs - ( performenceInMin * 1000 * 60 ) ) / 1000 )

    dispatch( updateNotification({ id: progressNotificationId, data: {
      title: `Zaimportowano ${files.length} plików`,
      type: 'success',
      subtitle: '',
      message: `Trasy zostały dodane w ${performenceInMin > 0 ? `${performenceInMin} minut` : ''} ${performenceInSec} sekund.`
    }}) )
    dispatch( refreshTracksSummary() )
    dispatch( saveTracks() )
  })
}


const TracksAdd = () => {
  const dispatch = useDispatch()

  const onDrop = useCallback( files => {
    processFiles(dispatch, files) 
  }, [dispatch])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <DropZoneContainer {...getRootProps()} isDragActive={isDragActive} className="track-add" style={{}} >
      <input {...getInputProps()} />
      {isDragActive ? 
        <p>Upuść plik lub pliki z trasami.</p> :
        <p>Przeciągnij i upuść trasy (.<strong>tcx</strong> lub .<strong>gpx</strong>) <br/>lub wybierz pliki klikając <strong className="positive">tutaj</strong>.</p>
      }
    </DropZoneContainer>
  )
} 

export default TracksAdd
