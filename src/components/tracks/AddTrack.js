import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import styled, {css} from 'styled-components';

import Icon from '../../styles/ui/Icon';
import textGradient from '../../styles/enhancements/textGradient';

const dragOrHover = css`
  border-color: ${ props => props.theme.color.active75 };
  p {
    ${ textGradient };
  }
  svg {
    opacity: .6;
  }
`

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

  border: 1px dashed ${ props => props.theme.color.brand || 'red' };
  border-radius: 3px;

  cursor: pointer;
  * {
   pointer-events: none;
  }
  position: relative;
  svg {
    position: absolute;
    height: 25px;
    right: 7px;
    bottom: 7px;
    opacity: .3;
    z-index: 1;
  }
  p {
    position: relative;
    z-index: 2;
  }
  strong {
    color: ${ props => props.theme.color.active75 };
  }
  ${props => props.isDragActive && css`
    ${dragOrHover}
  `}
  &:hover {
    ${dragOrHover}
  }
  &:focus {
    outline: none;
    border-color: ${ props => props.theme.color.active75 || 'red' };
  }
  &, * {
    transition: .3s ease-in-out;
  }
`

const TrackList = (props) => {
  const onDrop = useCallback(acceptedFiles => {
    props.onAddFiles([...acceptedFiles]);
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <DropZoneContainer {...getRootProps()} isDragActive={isDragActive} className="track-add" style={{}} >
      <input {...getInputProps()} />
      <Icon name="upload" />
      {isDragActive ? 
        <p>Upuść plik lub pliki z trasami.</p> :
        <p>Przeciągnij i upuść trasy w formacie .tcx lub .gpx lub wybierz pliki klikając <strong>tutaj</strong>.</p>
      }
    </DropZoneContainer>
  ); 
} 

export default TrackList;
