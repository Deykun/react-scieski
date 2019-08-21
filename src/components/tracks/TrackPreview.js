import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import moment from 'moment';

import Icon from '../../styles/ui/Icon';
import Button from '../../styles/ui/Button'; 
import { Wrapper, Title, ActionsDropdown, DataCells, DataCell, Footer } from '../../styles/components/tracks/TrackPreview';

class TrackPreview extends PureComponent {
  onRemove = () => {
    if ( window.confirm('Jesteś pewien?') ) {
      this.props.onRemoveTrack(this.props.track.id);
    }
  }

  render() {
    const { id, status, title, activity, date, distance } = this.props.track;
    return (
      <Wrapper key={id} status={status} tabIndex="0" >  
        <Title to={`/editor/tracks/${id}`}>
          {title}
        </Title>
        <ActionsDropdown>
          <Button main={1} iconleft="edit" as={Link} to={`/editor/tracks/${id}`}> Edytuj </Button>
          <Button danger iconleft="block" onClick={this.onRemove}> Usuń </Button>
        </ActionsDropdown>
        <DataCells>
          {status === 'loading' && 
          <DataCell>
            <Icon rotate={1} name="circular-graph" size={18} /> Ładowanie...
          </DataCell>}
          {activity && 
          <DataCell aria-label="Dyscyplina">
            <Icon name="man" size={18} /> {activity}
          </DataCell>}
          {distance && 
          <DataCell aria-label="Dystans">
            <Icon name="ruler" size={18} /> { distance > 0.8 ? `${distance.toFixed(2)} km` : `${(distance*1000).toFixed(1)} m` }
          </DataCell>}
        </DataCells>
        <Footer>
          {status === 'loading' && 
          <span>{moment().fromNow()}</span>}
          {date && 
          <span aria-label={moment(date.end).format('LL')}>
            {moment(date.end).fromNow()}
          </span>}
        </Footer>
      </Wrapper> 
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