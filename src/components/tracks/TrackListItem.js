import React from 'react';
import { Link } from 'react-router-dom';

import TimeAgo from 'react-timeago';
import timeAgoTranslation  from 'react-timeago/lib/language-strings/pl';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

import styled, {css} from 'styled-components';
import tooltip from '../../styles/ui/tooltip';
import Icon from '../../styles/ui/Icon';
import Button from '../../styles/ui/Button';
import textGradient from '../../styles/enhancements/textGradient';

const TrackItemContainer = styled.li`
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${ props => props.theme.colorBorder };
  ${ props => props.status === 'loading' && css`
    opacity: .4;
  `}
  h2 {
    margin-bottom: 4px;
    font-size: 15px;
    a {
      &:hover {
        ${textGradient};
      }
    }
  }
  time {
    font-size: 10px;
  }
  transition: .2s ease-in-out;
`;

const TimeAgoContainer = styled.span`
  ${props => props['aria-label'] && css`
    ${tooltip};
  `};
`;

const DistanceContainer = styled.span`
  font-size: 12px;
  ${props => props['aria-label'] && css`
    ${tooltip};
  `};
`

const timeAgoFormatter = buildFormatter(timeAgoTranslation);

const TrackListItem = (props) => {
  const { id, status, title, date, distance } = props.track;
  return (
    <TrackItemContainer status={status}>  
      <h2>
        <Link to={`/editor/tracks/${id}`}>
          <Icon name="flag" />
          {title}
        </Link>
      </h2>
      {status === 'loading' && <strong>Ładowanie</strong>}
      {date && <TimeAgoContainer aria-label="Data"><Icon name="clock" /> <TimeAgo date={date.start} formatter={timeAgoFormatter} /></TimeAgoContainer>}
      {distance && <DistanceContainer aria-label="Dystans"><Icon name="ruler" /> {distance.toFixed(2)} km</DistanceContainer>}
      <Button iconleft="block" aria-label="Usuń" onClick={props.onRemoveTrack.bind(this, id)}></Button>
    </TrackItemContainer> 
  )
}

export default TrackListItem;