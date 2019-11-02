import React, {useCallback} from 'react'

import { useDispatch } from 'react-redux'
import { multipleActions } from '../../actions/'
import { addTrack } from '../../actions/tracks'
import { addNotification } from '../../actions/notifications'

import { v4 } from 'node-uuid'
import { useDropzone } from 'react-dropzone'

import { DropZoneContainer } from '../../styles/components/Editor/TracksAdd.js'

import { divideIntoSmallerArrays, checkFileMetadata } from '../../utils/helpers'

import WebWorker from '../../workers/WebWorker.js'
import FileToTrack from '../../workers/FileToTrack.js'

const TracksAdd = () => {
  const dispatch = useDispatch()

  const onDrop = useCallback(files => {
    if ( !Array.isArray( files ) ) { files = [files] }
    
    files = divideIntoSmallerArrays(files, 100)

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
            title: `Pominięto plik z rozszerzeniem .${fileMetadata.data.format}`,
            message: `Plik ${fileMetadata.data.name} został pominięty.`
          }}) )
        }
        return fileMetadata.isFormatAllowed
      })
      dispatch( multipleActions( actions ) )
      
      return newFileArr
    })
    const xmlParser = new DOMParser()

    files = files.flat(1)

    const FileWorker = new WebWorker(FileToTrack)
    FileWorker.addEventListener('message', (response) => { 
      // console.log(response.data) 
      // response.data.forEach( ( response) => console.log(response) )
    })
    FileWorker.postMessage( files )
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
