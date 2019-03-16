import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';

const TrackList = (props) => {
  const onDrop = useCallback(acceptedFiles => {
    const reader = new FileReader()

    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      // Do whatever you want with the file contents
      const binaryStr = reader.result
      console.log(binaryStr)
    }

    acceptedFiles.forEach(file => reader.readAsBinaryString(file))
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
