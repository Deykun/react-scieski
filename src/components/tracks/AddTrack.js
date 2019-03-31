import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';

const TrackList = (props) => {
  const onDrop = useCallback(acceptedFiles => {
    props.onAddFiles([...acceptedFiles]);
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})


  return (
      <section {...getRootProps()} className="track-add" >
        <input {...getInputProps()} />
        <p>Przeciągni i upuść trasy w formacie .tcx lub .gpx lub wybierz pliki klikając <strong>tutaj</strong>.</p> 
      </section>
  ); 
} 

export default TrackList;
