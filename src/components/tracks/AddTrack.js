import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import styled, {css} from 'styled-components';

import textGradient from '../../styles/textGradient';

const DropZoneContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  margin-bottom: 15px;
  padding: 25px 10px;

  text-align: center;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;

  border: 1px dashed ${ props => props.theme.color.brand };
  border-radius: 3px;
  
  &, * {
    transition: .1s;
  }
  p {
    pointer-events: none;
  }
  strong {
    color: ${ props => props.theme.color.active75 };
  }
  ${props => (props.isDragActive) && css`
    border-color: ${ props => props.theme.color.active75 };
    p {
      ${ textGradient };
    }
  `}
`

const TrackList = (props) => {
  const onDrop = useCallback(acceptedFiles => {
    props.onAddFiles([...acceptedFiles]);
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <DropZoneContainer {...getRootProps()} isDragActive={isDragActive} className="track-add" style={{}} >
      <input {...getInputProps()} />
      {isDragActive ? 
        <p>Upuść plik lub pliki z trasami.</p> :
        <p>Przeciągni i upuść trasy w formacie .tcx lub .gpx lub wybierz pliki klikając <strong>tutaj</strong>.</p>
      }
    </DropZoneContainer>
  ); 
} 

export default TrackList;
