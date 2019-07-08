import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import moment from 'moment';

import styled, {css} from 'styled-components';
import tooltip from '../../styles/ui/tooltip';
import Icon from '../../styles/ui/Icon';
import Button from '../../styles/ui/Button';
import textGradient from '../../styles/enhancements/textGradient';

const TrackPreviewContainer = styled.li`
  position: relative;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${ props => props.theme.color.border || 'gray' }; 
  ${ props => props.status === 'loading' && css`
    opacity: .4;
    cursor: wait;
  `}
  h2 {
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 12px;
    a {
      &:hover {
        ${textGradient};
      }
    }
  }
  transition: .2s ease-in-out;
`;

const TrackDataCell = styled.span`
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

const TrackActions = styled.nav`
  position: absolute;
  right: 0;
  bottom: 0;
  > * {
    &:not(:last-child) {
      margin-right: 5px;
    }
  }
`

class TrackPreview extends PureComponent {
  render() {
    const { id, status, title, activity, date, distance } = this.props.track;
    return (
      <TrackPreviewContainer key={id} status={status} >  
        <h2>
          <Link to={`/editor/tracks/${id}`}>
            <Icon name="flag" />
            {title}
          </Link>
        </h2>
        <p>
          {status === 'loading' && <strong>Ładowanie</strong>}
          {date && 
          <TrackDataCell aria-label="Data">
            <Icon name="calendar" size={18} /> {moment(date.end).fromNow()}
          </TrackDataCell>}
          {activity && 
          <TrackDataCell aria-label="Dyscyplina">
            <Icon name="man" size={18} /> {activity}
          </TrackDataCell>}
          {distance && 
          <TrackDataCell aria-label="Dystans">
            <Icon name="ruler" size={18} /> { distance > 0.8 ? `${distance.toFixed(2)} km` : `${(distance*1000).toFixed(1)} m` }
          </TrackDataCell>}
        </p>
        <TrackActions>
          <Button danger iconleft="block" aria-label="Usuń" onClick={this.props.onRemoveTrack.bind(this, id)} />
          <Button main={1} iconleft="edit" aria-label="Edytuj" as={Link} to={`/editor/tracks/${id}`} />
        </TrackActions>
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