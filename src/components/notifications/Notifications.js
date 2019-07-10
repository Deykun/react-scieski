import React, { Component } from 'react';

import { connect } from 'react-redux';

import styled, { keyframes } from 'styled-components';
import Button from '../../styles/ui/Button';

const NotificationsList = styled.ul`
  position: fixed;
  top: 15px;
  right: 15px;
  width: 360px;
  margin: 0;
  padding: 0;
  list-style: none;
  perspective: 500px;
`

const newNotification = keyframes`
  0% {
    transform: scale(0) translateY(100px) rotateX(45deg);
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  100% {
    transform: scale(1) translateY(0) rotateX(0deg);
  }
`;

const Notification = styled.li`
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 15px;
  margin: 0;
  &:not(:first-child) {
    margin-top: -30px;
  }

  word-break: break-word;

  background-color: ${ props => props.theme.background.component || 'white' };
  box-shadow: 0 -3px 10px rgba(0,0,0,0.02), 0 14px 9px -5px rgba(0,0,0,.04);
   
  transition: .2s ease-in-out;
  transform-origin: 50% 0;
  animation: ${newNotification} .4s ease-in-out;
  &:hover, &:focus, &:focus-within {
    outline: none;
    box-shadow: 0 -5px 3px -3px rgba(0,0,0,0.1), 0 14px 9px -5px rgba(0,0,0,.04);
    z-index: 2;
    + * {
      margin-top: 5px;
    }
    ~ * {
      transition: .5s cubic-bezier(0.68, -0.55, 0.265, 1.30);
      transition: .2s ease-in-out;
    }
  }

  .close {
    position: absolute;
    top: 5px;
    right: 5px;
  }
`

const NotificationTitle = styled.h3`
  color: ${ props => props.theme.color.text || 'black' };
  font-size: 12px;
  font-weight: 600;
  padding-right: 30px;
  margin-bottom: 8px;
`;

const NotificationContent = styled.p`
  color: ${ props => props.theme.color.textMuted || 'black' };
  font-size: 12px;
  font-weight: 400;
  text-align: justify;
  hyphens: auto;
`;

const NotificationsGlobalNav = styled.li`
  position: absolute;
  top: -5px;
  left: -5px;
  z-index: 5;
  margin: 0 !important;
  .close-all {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${ props => props.theme.color.danger || 'Red' };
    &:hover {
      background-color: ${ props => props.theme.color.danger75 || 'Red' };
    }
    svg {
      width: 20px;
      height: 18px;
      fill: white;
    }
  }
`

class Notifications extends Component {
  render() {
    return(
      <NotificationsList>
        {this.props.notifications.map( (notification) => {
          const {id, title, content} = notification;
          return(
            <Notification key={id} tabIndex="0">
              <Button className="close" danger iconleft="cross" aria-label="Zamknij" onClick={this.props.onRemoveNotification.bind(this, id)} />
              <NotificationTitle>{title ? title : 'Powiadomienie'}</NotificationTitle>
              <NotificationContent>{content}</NotificationContent>
            </Notification>
          )
        })}
        {this.props.notifications.length > 5 &&
          <NotificationsGlobalNav>
            <Button className="close-all" danger iconleft="cross" aria-label="Zamknij wszystkie" onClick={this.props.onRemoveNotifications.bind(this)} />
          </NotificationsGlobalNav>
        }
      </NotificationsList>
    ) 
  }
}


const mapStateToProps = (store) => {
  return {
    notifications: store.rEditor.notifications
  }
}

const mapDispacToProps = (dispach) => {
  return {
    onRemoveNotification: (id) => dispach( { type: 'REMOVE_NOTIFICATION', id }),
    onRemoveNotifications: () => dispach( { type: 'REMOVE_ALL_NOTIFICATION' }),
  }
}

export default connect(mapStateToProps, mapDispacToProps)( Notifications );
