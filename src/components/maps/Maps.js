import React, { Component } from 'react';
import GoogleMap from './GoogleMap';

import { connect } from 'react-redux';
import * as actionCreator from './../../store/actions/actions';

class Maps extends Component {
  render() {
    const { maps, tracks } = this.props;
    return(
      <section>
        {maps.map( (map) => { return ( <GoogleMap key={map.id} map={map} tracks={tracks} /> ) })}
      </section>
    ) 
  }
}


const mapStateToProps = (store) => {
  return {
    maps: store.rMap.maps,
    tracks: store.rEditor.tracks,
  }
}

const mapDispatchToProps = (dispach) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)( Maps );