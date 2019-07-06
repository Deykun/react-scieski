import React, { Component } from 'react';
import Icon from '../../styles/ui/Icon';

// import { connect } from 'react-redux';
// import * as actionCreator from './../../store/actions/actions';


import styled from 'styled-components';

const notificationsList = [
  { title: 'Wrong format...', content: 'Lorem' }, 
  { title: 'Wrong format...', content: 'elo 2' }, 
  { title: 'Wrong format...', content: 'elo 3' }, 
  { title: 'Wrong format...', content: 'Suspendisse aliquam nibh vel lacus convallis' }, 
  { title: 'Wrong format...', content: 'Quisque ante ex, posuere non ante non, bibendum varius sem.' }, 
  { title: 'Wrong format...', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' }, 
]

const NotificationsList = styled.ul`
  position: fixed;
  top: 15px;
  right: 15px;
  width: 360px;
  margin: 0;
  padding: 0;
  border-top: 1px solid gray;
  list-style: none;
  perspective: 500px;
`

const Notification = styled.li`
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 15px;
  margin: 0;
  &:not(:first-child) {
    margin-top: -30px;
  }

  font-size: 15px;
  color: ${ props => props.theme.color.text };
  background-color: ${ props => props.theme.background.component };
  box-shadow: 0 -3px 10px rgba(0,0,0,0.02), 0 14px 9px -5px rgba(0,0,0,.04);
   
  transition: .2s ease-in-out;
  &:hover, &:focus, &:focus-within {
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
`

class Notifications extends Component {
  render() {
    return(
      <NotificationsList>
        {notificationsList.map( notification => {
          return(
            <Notification tabIndex='0'>
              <Icon name="cross" />
              <h3>{notification.title}</h3>
              {notification.content}
              <button>Test</button>
            </Notification>
          )
        })}
      </NotificationsList>
    ) 
  }
}


// const mapStateToProps = (store) => {
//   return {
//       tracks: store.rTracks.tracks
//   }
// }

// const mapDispacToProps = (dispach) => {
// return {
//     onAddFiles: (files) => dispach( actionCreator.addTracksFromFiles(files) ),
//     onRemoveTrack: (id) => dispach( { type: 'REMOVE_TRACK', id }),
// }
// }

// export default connect(mapStateToProps, mapDispacToProps)( Tracks );
export default Notifications;
