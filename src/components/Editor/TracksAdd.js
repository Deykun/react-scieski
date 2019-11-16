import React, {useCallback} from 'react'
import moment from 'moment'

import { useDispatch } from 'react-redux'
import { multipleActions } from '../../actions/'
import { addTrack, refreshTracksSummary } from '../../actions/tracks'
import { addNotification, updateNotification } from '../../actions/notifications'

import { v4 } from 'node-uuid'
import { useDropzone } from 'react-dropzone'

import { DropZoneContainer } from '../../styles/components/Editor/TracksAdd.js'

import { divideIntoSmallerArrays, checkFileMetadata, forEachPromise } from '../../utils/helpers'
import { readFile } from '../../utils/tracks.js'

const TracksAdd = () => {
  const dispatch = useDispatch()

  const onDrop = useCallback( files => {
    /* One file is treated the same way */
    if ( !Array.isArray( files ) ) { files = [files] }

    const startTime = new Date()

    const progressNotificationId = v4()
    dispatch( addNotification({ data: {
      type: 'loading',
      percent: 0,
      id: progressNotificationId,
      title: 'Importowanie',
      subtitle: `sprawdzanie ${files.length} plików`,
      message: 'Tylko pliki w odpowiednim formacie zostaną dodane.'
    }}) )
    
    files = divideIntoSmallerArrays(files, 500)

    files = files.map( ( fileArr ) => {
      const actions = []
      const newFileArr = fileArr.filter( ( file ) => {
        const fileMetadata = checkFileMetadata( file )
        if ( fileMetadata.isFormatAllowed ) {
          file.id = v4()
          file.format = fileMetadata.data.format
          actions.push( addTrack({ data: { id: file.id, status: 'loading', ...fileMetadata.data } } ) )
        } else {
          actions.push( addNotification({ id: v4(), data: {
            title: `Pominięto plik .${fileMetadata.data.format}`,
            subtitle: 'nieobsługiwane roszerzenie',
            message: `Plik: ${fileMetadata.data.name} został pominięty.`
          }}) )
        }
        return fileMetadata.isFormatAllowed
      })
      dispatch( multipleActions( actions ) )
      
      return newFileArr
    })

    files = files.flat(1)

    dispatch( updateNotification({ id: progressNotificationId, data: {
      title: 'Importowanie',
      subtitle: `${files.length} plików`,
      message: 'Analizowanie plików z trasami plików.'
    }}) )

    let processed = 0
    const updateProgress = ( action ) => {
      processed = processed + 1
      const progress = ( (processed / files.length ) * 100).toFixed(1)
      dispatch( updateNotification({ id: progressNotificationId, data: {
        title: `Importowanie ${progress}%`,
        subtitle: `${files.length} plików`,
        percent: progress,
        message: `Sprawdzono ${processed} pliki.`
      }}) )
      dispatch( action )
    }

    forEachPromise( files, readFile, updateProgress ).then(() => {
      const endTime = new Date()
      const performenceInMs = moment(endTime).diff(moment(startTime))
      const performenceInSec = Math.floor( performenceInMs / 1000 )
      const performenceInMin = Math.floor( performenceInMs / 1000 / 60 )

      dispatch( updateNotification({ id: progressNotificationId, data: {
        title: `Zaimportowano ${files.length} plików`,
        type: 'success',
        subtitle: '',
        message: `Trasy zostały dodane w ${performenceInMin > 0 ? `${performenceInMin} minut` : ''}${performenceInSec} sekund.`
      }}) )
      dispatch( refreshTracksSummary() )
    })

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
