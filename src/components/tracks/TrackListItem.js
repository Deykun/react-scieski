import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import TimeAgo from 'react-timeago';
import timeAgoTranslation  from 'react-timeago/lib/language-strings/pl';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

import styled, {css} from 'styled-components';
import tooltip from '../../styles/ui/tooltip';
import Icon from '../../styles/ui/Icon';
import Button from '../../styles/ui/Button';
import textGradient from '../../styles/enhancements/textGradient';

const TrackItemContainer = styled.li`
  position: relative;
  margin-bottom: 8px;
  padding-bottom: 8px;
  /* border-bottom: 1px solid ${ props => props.theme.color.border || 'gray' }; */
  ${ props => props.status === 'loading' && css`
    opacity: .4;
    cursor: wait;
  `}
  h2 {
    margin-bottom: 4px;
    font-size: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
  ${props => props['aria-label'] && css`
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

const timeAgoFormatter = buildFormatter(timeAgoTranslation);

class TrackListItem extends PureComponent {
  render() {
    const { id, status, title, activity, date, distance } = this.props.track;
    return (
      <TrackItemContainer key={id} status={status} >  
        <h2>
          <Link to={`/editor/tracks/${id}`}>
            <Icon name="flag" />
            {title}
          </Link>
        </h2>
        <p>
          {status === 'loading' && <strong>Ładowanie</strong>}
          {activity && <TrackDataCell aria-label="Dyscyplina"><Icon name="man" size={14} /> {activity}</TrackDataCell>}
          {date && <TrackDataCell aria-label="Data"><Icon name="clock" size={14} /> <TimeAgo date={date.start} formatter={timeAgoFormatter} /></TrackDataCell>}
          {distance && <TrackDataCell aria-label="Dystans"><Icon name="ruler" size={14} /> {distance.toFixed(2)} km</TrackDataCell>}
        </p>
        <TrackActions>
          <Button danger iconleft="block" aria-label="Usuń" onClick={this.props.onRemoveTrack.bind(this, id)} />
          <Button main={1} iconleft="edit" aria-label="Edytuj" as={Link} to={`/editor/tracks/${id}`} />
        </TrackActions>
      </TrackItemContainer> 
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
  
export default connect(mapStateToProps, mapDispatchToProps)( TrackListItem );