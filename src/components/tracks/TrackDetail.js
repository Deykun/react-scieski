import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import moment from 'moment';

import styled, {css} from 'styled-components';
import tooltip from '../../styles/ui/tooltip';
import Icon from '../../styles/ui/Icon';

const TrackDetailWrapper = styled.section`
  margin: 0 -15px;
  padding: 15px;
  background-color: ${ props => props.theme.color.brand || 'green' };
`;

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

const TrackDataCells = styled.ul`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;
`

const TrackDataCell = styled.li`
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

  render() {
    const { id, track } = this.props;
    if ( track ) {
      const { title, activity, date, duration, speed, distance } = track;
      return (
        <TrackDetailWrapper key={id}>
          <EditableTitle placeholder="Nazwa" autoFocus name="title" onChange={this.onChange.bind(this)}>
            {title}
          </EditableTitle>
          <TrackDataCells>
            {date && 
            <TrackDataCell aria-label="Data">
              <Icon name="calendar" size={18} /> {moment(date.end).fromNow()}
            </TrackDataCell>}
            {activity && 
            <TrackDataCell aria-label="Dyscyplina">
              <Icon name="man" size={18} /> {activity}
            </TrackDataCell>}
            {duration && 
            <TrackDataCell aria-label="Czas trwania">
              <Icon name="clock" size={18} /> {duration}
            </TrackDataCell>} 
            {speed && 
            <TrackDataCell aria-label="Średnia prędkość">
              <Icon name="gauge" size={18} /> {speed.toFixed(2)} km/h 
            </TrackDataCell>} 
            {distance && 
            <TrackDataCell aria-label="Dystans">
              <Icon name="ruler" size={18} /> { distance > 0.8 ? `${distance.toFixed(2)} km` : `${(distance*1000).toFixed(1)} m` }
            </TrackDataCell>}
          </TrackDataCells>
          <button onClick={this.props.onRemoveTrack.bind(this, track.id)}>Usuń</button> 
        </TrackDetailWrapper>
      )
    } else {
      return (
        <Redirect to="/editor/tracks" />
      )
    }

  }
}


const mapStateToProps = (store, props) => {
  const track = store.rTracks.tracks.find( (track) => { return props.id === track.id } ); 
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
