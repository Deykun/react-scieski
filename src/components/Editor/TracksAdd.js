import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

import { DropZoneContainer } from '../../styles/components/Editor/TracksAdd.js'

import WebWorker from '../../workers/WebWorker.js'
import filereader from '../../workers/filereader.js'

const TracksAdd = () => {
  const onDrop = useCallback(acceptedFiles => {
    // props.onAddFiles([...acceptedFiles]);
    const FileWorker = new WebWorker(filereader)
    FileWorker.addEventListener('message', (response) => { 
      console.log(response.data) 
    })
    FileWorker.postMessage( acceptedFiles )
  }, [])
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
