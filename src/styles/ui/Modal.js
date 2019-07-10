import React from 'react';

import { Link } from 'react-router-dom';

import styled, { keyframes } from 'styled-components';
import Button from './Button';

const ModalOverlayPopup = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
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
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(255,255,255,.8);
    z-index: 1;
  }
  animation: ${ModalOverlayPopup} .5s; 
`;

const ModalWindow = styled.div`
  position: relative;
  z-index: 10;
  top: 0;
  right: 0;
  left: 0;
  height: auto;
  overflow: auto;
  margin: auto;
  padding: 12px;
  max-width: 550px;
  max-height: 80vh;
  max-height: calc(100vh - 20px);
  /* margin-top: 20px; */
  background-color: ${ props => props.theme.background.component || 'white' };
  border: 1px solid ${ props => props.theme.color.border || 'gray' };
  border-radius: ${ props => props.theme.other.borderRadius || '2px' };
  box-shadow: 0 8px 4px -8px rgba(0,0,0,.2), 0 12px 8px -12px rgba(0,0,0,.4);
`;

const ModalHeader = styled.header`
  color: grey;
`;

const Modal = props => {
  const { title, closePath } = props;
  return (
    <ModalOverlay {...props} >
      <ModalWindow>
        <ModalHeader>
          {title ? title : 'Scieski'}
          {closePath && <Button className="close" danger iconleft="cross" aria-label="Zamknij" as={Link} to={closePath} />}
        </ModalHeader>
        {props.children}
      </ModalWindow>
    </ModalOverlay>
  )  
};

export default Modal;