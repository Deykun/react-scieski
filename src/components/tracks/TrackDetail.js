import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import moment from 'moment';

import styled, {css} from 'styled-components';
import tooltip from '../../styles/ui/tooltip';
import Icon from '../../styles/ui/Icon';
import Button from '../../styles/ui/Button';
import Modal from '../../styles/ui/Modal';

const EditableTitle = styled.textarea`
  display: block;
  min-height: 22px;
  height: 25px;
  margin-bottom: 15px;
  width: 100%;
  resize: none;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid transparent;
  &:hover, &:focus {
    resize: vertical;
  }
  &:focus {
    border-bottom-color: ${ props => props.theme.background.active || 'white' };
  }
`;

const DataCells = styled.ul`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;
`

const DataCell = styled.li`
  display: inline-block;
  margin-bottom: 8px;
  font-size: 14px;
  ${props => props['aria-label'] && css`
    ${tooltip};
  `};
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

class TrackDetail extends Component {  
  onChange(e) {
    const {name, value} = e.target;
    this.props.onUpdateTrack( this.props.id, { [name]: value });
  }

  onRemove = () => {
    if ( window.confirm('Jesteś pewien?') ) {
      this.props.onRemoveTrack(this.props.track.id);
    }
  }

  render() {
    const { id, track } = this.props;
    if ( track ) {
      const { title, activity, date, duration, speed, distance } = track;
      return (
        <Modal
          key={id}
          title="Edycja trasy"
          closePath="/editor/tracks/"
          from="left"
        >
          <EditableTitle autoFocus placeholder="Nazwa" name="title" onChange={this.onChange.bind(this)} defaultValue={title} />
          <DataCells>
            {date && 
            <DataCell aria-label="Data">
              <Icon name="calendar" size={18} /> {moment(date.end).fromNow()}
            </DataCell>}
            {activity && 
            <DataCell aria-label="Dyscyplina">
              <Icon name="man" size={18} /> {activity}
            </DataCell>}
            {duration && 
            <DataCell aria-label="Czas trwania">
              <Icon name="clock" size={18} /> {duration}
            </DataCell>} 
            {speed && 
            <DataCell aria-label="Średnia prędkość">
              <Icon name="gauge" size={18} /> {speed.toFixed(2)} km/h 
            </DataCell>} 
            {distance && 
            <DataCell aria-label="Dystans">
              <Icon name="ruler" size={18} /> { distance > 0.8 ? `${distance.toFixed(2)} km` : `${(distance*1000).toFixed(1)} m` }
            </DataCell>}
          </DataCells>
          <Button danger iconleft="block" onClick={this.onRemove}>Usuń</Button> 
        </Modal>
      )
    } else {
      return (
        <Redirect to="/editor/tracks" />
      )
    }

  }
}


const mapStateToProps = (store, props) => {
  const track = store.rEditor.tracks.find( (track) => { return props.id === track.id } ); 
  return {
    track: track
  }
}
  
const mapDispatchToProps = (dispach) => {
  return {
    onUpdateTrack: (id, track) => dispach( { type: 'UPDATE_TRACK', id, track }),
    onRemoveTrack: (id) => dispach( { type: 'REMOVE_TRACK', id }),
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)( TrackDetail );
