import React, {useCallback} from 'react'
import { useDispatch } from 'react-redux'
import { addTracks } from '../../../actions/tracks'
import { useDropzone } from 'react-dropzone'
import { useTranslation } from 'react-i18next'

import { DropZoneContainer } from '../../../styles/components/Editor/TracksAdd.js'

const TracksAdd = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation() 

  const onDrop = useCallback( files => {
    addTracks( { dispatch, files } ) 
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
