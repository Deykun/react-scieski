import React, { Component } from 'react';

import {Map, Polyline, GoogleApiWrapper} from 'google-maps-react';

class GoogleMap extends Component {

  colorOfTrack(track) {
    /* Color repeat itself after yearBase + colorsLength */
    const yearColors = [ '#9ec83e', '#f4960f', '#db4436', '#4186f0', '#7c3592', '#cc3eb6', '#18b963' ];
    const colorsLength = yearColors.length;
    const colorsOffset = -( 2013 % colorsLength );
    const trackYear = new Date( track.date.start ).getFullYear();
    return yearColors[ ( (trackYear + colorsOffset) % colorsLength ) ];
  }

  renderTracks() {
    const {tracks} = this.props;

    const fragments = tracks.map( track => { 
      if ( track.status === 'success' ) {
        const pathColor = this.colorOfTrack( track );
        return (
          track.fragments.map( fragment => <Polyline
            path={fragment}
            strokeColor={pathColor}
            strokeOpacity={1}
            strokeWeight={1}
            label={track.id}
          /> ) 
        )
      } else {
        return;
      }
    });
  
    return ( fragments );
  }

  render() {
    const mapDefaultStyles = [ { "elementType": "geometry", "stylers": [ { "color": "#f5f5f5" } ] }, { "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] }, { "elementType": "labels.text.fill", "stylers": [ { "color": "#b0b0b0" } ] }, { "elementType": "labels.text.stroke", "stylers": [ { "color": "#f5f5f5" } ] }, { "featureType": "administrative.land_parcel", "stylers": [ { "visibility": "off" } ] }, { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [ { "color": "#bdbdbd" } ] }, { "featureType": "administrative.neighborhood", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi", "elementType": "geometry", "stylers": [ { "color": "#eeeeee" } ] }, { "featureType": "poi", "elementType": "labels.text", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [ { "color": "#757575" } ] }, { "featureType": "poi.business", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [ { "color": "#e5e5e5" } ] }, { "featureType": "poi.park", "elementType": "labels.text", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [ { "color": "#9e9e9e" } ] }, { "featureType": "road", "elementType": "geometry", "stylers": [ { "color": "#ffffff" } ] }, { "featureType": "road", "elementType": "labels", "stylers": [ { "visibility": "off" } ] }, { "featureType": "road.arterial", "elementType": "labels.text.fill", "stylers": [ { "color": "#757575" } ] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [ { "color": "#dadada" } ] }, { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [ { "color": "#616161" } ] }, { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [ { "color": "#9e9e9e" } ] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [ { "color": "#e5e5e5" } ] }, { "featureType": "transit.station", "elementType": "geometry", "stylers": [ { "color": "#eeeeee" } ] }, { "featureType": "water", "elementType": "geometry", "stylers": [ { "color": "#c9c9c9" } ] }, { "featureType": "water", "elementType": "labels.text", "stylers": [ { "visibility": "off" } ] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [ { "color": "#9e9e9e" } ] } ];
    return (
      <Map 
        google={this.props.google}
        zoom={14}
        initialCenter={{
            lat: 50.05316,
            lng: 19.93518
        }}
        styles={mapDefaultStyles}
      >
        {this.renderTracks()}
      </Map>
    )
  }
}
  
export default GoogleApiWrapper({
  apiKey: 'AIzaSyCr9Uvjcrht84ncO5yJYpXgkhlhciDM2ac'
})(GoogleMap);