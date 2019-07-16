import React from 'react';

import { Link } from 'react-router-dom';

import styled, { keyframes } from 'styled-components';
import Button from './Button';
import textGradient from '../enhancements/textGradient';

const ModalOverlayPopup = keyframes`
  0% {
    border-radius: 1000px;
    transform: scale(0);
    opacity: 0;
  }
  25% {
    border-radius: 0;
    transform: scale(1);
  }
  100% {
    border-radius: 0;
    transform: scale(1);
    opacity: .7;
  }
`

const ModalOverlay = styled.div`
  position: fixed;
  opacity: 1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 125;
  display: flex;
  flex-flow: column;
  justify-content: center;
  ::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #7e7e7e;
    opacity: .7;
    z-index: 1;
    animation: ${ModalOverlayPopup} .5s; 
  }
`;

const ModalWindowSlideFromTop = keyframes`
  0% { 
    transform: translateY(-300px) scale(.6);
    opacity: 0;
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: .7;
  }
`;

const ModalWindowSlideFromLeft = keyframes`
  0% { 
    transform: translateX(-300px) scale(.6);
    opacity: 0;
  }
  100% {
    transform: translateX(0) scale(1);
    opacity: .7;
  }
`

const ModalWindow = styled.div`
  position: relative;
  z-index: 10;
  top: 0;
  right: 0;
  left: 0;
  height: auto;
  margin: auto;
  padding: 12px 12px 0;
  max-width: 550px;
  max-height: calc(100vh - 40px);
  display: flex;
  flex-flow: column;

  background-color: ${ props => props.theme.background.component || 'white' };
  border: 1px solid ${ props => props.theme.color.border || 'gray' };
  border-radius: ${ props => props.theme.other.borderRadius || '2px' };
  box-shadow: 0 8px 4px -8px rgba(0,0,0,.2), 0 12px 8px -12px rgba(0,0,0,.4);

  animation: ${ props => props.from === 'left' ? ModalWindowSlideFromLeft : ModalWindowSlideFromTop } .3s cubic-bezier(0.68, -0.55, 0.265, 1.30);
`;

const ModalHeader = styled.header`
  flex-shrink: 0;
  padding-right: 30px;
  margin-bottom: 12px;
  position: relative;
  .close {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }
`;

const ModalTitle = styled.h2`
  ${textGradient};
`;

const ModalBody = styled.div`
  overflow: auto;
  margin-right: -12px;
  padding-right: 12px;
  padding-bottom: 12px;
`;

const Modal = props => {
  const { title, closePath, from } = props;
  return (
    <ModalOverlay>
      <ModalWindow from={from} tabIndex="0" >
        <ModalHeader>
          <ModalTitle>
            {title ? title : 'Scieski'}
          </ModalTitle>
          {closePath && <Button className="close" danger={1} iconleft="cross" aria-label="Zamknij" as={Link} to={closePath} />}
        </ModalHeader>
        <ModalBody>
          {props.children}
        </ModalBody>
      </ModalWindow>
    </ModalOverlay>
  )  
};

export default Modal;