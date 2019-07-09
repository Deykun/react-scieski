import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import moment from 'moment';

import styled, {css, keyframes} from 'styled-components';
import tooltip from '../../styles/ui/tooltip';
import Icon from '../../styles/ui/Icon';
import Dropdown from '../../styles/ui/Dropdown';
import Button from '../../styles/ui/Button';

const newTrackPreview = keyframes`
  0% {
    transform: translateY(-100px) scale(.7);
    opacity: 0;
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
`;

const TrackPreviewContainer = styled.li`
  position: relative;
  padding: 12px;
  margin: 15px;
  background-color: ${ props => props.theme.background.component || 'white' }; 
  border: 1px solid ${ props => props.theme.color.border || 'gray' };
  border-radius: 2px;
  box-shadow: 0 8px 4px -8px rgba(0,0,0,.2), 0 12px 8px -12px rgba(0,0,0,.4);
  &:focus, &:focus-within {
    outline: none;
    box-shadow: 0 8px 4px -8px rgba(0,0,0,.6), 0 12px 8px -12px rgba(0,0,0,.4);
  }
  animation: ${newTrackPreview} .3s ease-in-out;
  transition: .2s ease-in-out;
`;

const Title = styled(Link)`
  display: block;
  margin-bottom: 12px;
  padding-right: 20px;
  font-size: 12px;
  font-weight: 500;
  &:focus, &:focus-within {
    outline: none;
    opacity: .5 ;
  }
`;

const TrackActions = styled(Dropdown)`
  position: absolute;
  right: 12px;
  top: 8px;
  .dropdown-list {
    right: 0;
    left: auto;
    transform: translateX(0);
  }
`

const DataCells = styled.ul`
`;

const DataCell = styled.span`
  font-size: 12px;
  svg {
    fill: ${ props => props.theme.color.active75 || 'black' };
  }
  ${props => props['aria-label'] && css`
    cursor: help;
    ${tooltip};
  `};
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const PreviewFooter = styled.div`
  text-align: right;
  font-size: 12px;
  font-weight: 400;
  color: ${ props => props.theme.color.textMuted || 'gray' };
  [aria-label] {
    cursor: help;
    ${tooltip};
  }
`;

class TrackPreview extends PureComponent {
  onRemove = () => {
    if ( window.confirm('Jesteś pewien?') ) {
      this.props.onRemoveTrack(this.props.track.id);
    }
  }

  render() {
    const { id, status, title, activity, date, distance } = this.props.track;
    return (
      <TrackPreviewContainer key={id} status={status} tabIndex="0" >  
        <Title to={`/editor/tracks/${id}`}>
          {title}
        </Title>
        <TrackActions>
          <Button main={1} iconleft="edit" as={Link} to={`/editor/tracks/${id}`}> Edytuj </Button>
          <Button danger iconleft="block" onClick={this.onRemove}> Usuń </Button>
        </TrackActions>
        <DataCells>
          {activity && 
          <DataCell aria-label="Dyscyplina">
            <Icon name="man" size={18} /> {activity}
          </DataCell>}
          {distance && 
          <DataCell aria-label="Dystans">
            <Icon name="ruler" size={18} /> { distance > 0.8 ? `${distance.toFixed(2)} km` : `${(distance*1000).toFixed(1)} m` }
          </DataCell>}
        </DataCells>
        <PreviewFooter>
          {status === 'loading' && 
          <span>Ładowanie...</span>}
          {date && 
          <span aria-label={moment(date.end).format('LL')}>
            {moment(date.end).fromNow()}
          </span>}
        </PreviewFooter>
      </TrackPreviewContainer> 
    )
  }
}

const mapStateToProps = (store) => {
  return { };
};

const mapDispatchToProps = (dispach) => {
  return {
    onRemoveTrack: (id) => dispach( { type: 'REMOVE_TRACK', id }),
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)( TrackPreview );