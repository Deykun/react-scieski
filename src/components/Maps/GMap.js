import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import {Map, Polyline, GoogleApiWrapper} from 'google-maps-react'

const GMap = ( {tracks, google, mapStyle, style, centerBounds=false} ) => {
  const history = useHistory()
  const mapDefaultStyles = [ { "elementType": "geometry", "stylers": [ { "color": "#f5f5f5" } ] }, { "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] }, { "elementType": "labels.text.fill", "stylers": [ { "color": "#b0b0b0" } ] }, { "elementType": "labels.text.stroke", "stylers": [ { "color": "#f5f5f5" } ] }, { "featureType": "administrative.land_parcel", "stylers": [ { "visibility": "off" } ] }, { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [ { "color": "#bdbdbd" } ] }, { "featureType": "administrative.neighborhood", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi", "elementType": "geometry", "stylers": [ { "color": "#eeeeee" } ] }, { "featureType": "poi", "elementType": "labels.text", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [ { "color": "#757575" } ] }, { "featureType": "poi.business", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [ { "color": "#e5e5e5" } ] }, { "featureType": "poi.park", "elementType": "labels.text", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [ { "color": "#9e9e9e" } ] }, { "featureType": "road", "elementType": "geometry", "stylers": [ { "color": "#ffffff" } ] }, { "featureType": "road", "elementType": "labels", "stylers": [ { "visibility": "off" } ] }, { "featureType": "road.arterial", "elementType": "labels.text.fill", "stylers": [ { "color": "#757575" } ] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [ { "color": "#dadada" } ] }, { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [ { "color": "#616161" } ] }, { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [ { "color": "#9e9e9e" } ] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [ { "color": "#e5e5e5" } ] }, { "featureType": "transit.station", "elementType": "geometry", "stylers": [ { "color": "#eeeeee" } ] }, { "featureType": "water", "elementType": "geometry", "stylers": [ { "color": "#c9c9c9" } ] }, { "featureType": "water", "elementType": "labels.text", "stylers": [ { "visibility": "off" } ] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [ { "color": "#9e9e9e" } ] } ];
  const bounds = new google.maps.LatLngBounds()


  console.log(centerBounds, centerBounds)
  if (centerBounds) {
    console.log('centruje')
    tracks.map( track => { 
      if ( track.status === 'success' ) {
        track.fragments.map( (fragment, index) => fragment.map( point => {
          bounds.extend(point)
        }))
      }
    })
  }

  const colorOfTrack = (track) => {
    /* Color repeat itself after yearBase + colorsLength */
    const yearColors = [ '#9ec83e', '#f4960f', '#db4436', '#4186f0', '#7c3592', '#cc3eb6', '#18b963' ];
    const colorsLength = yearColors.length;
    const colorsOffset = -( 2013 % colorsLength );
    const trackYear = new Date( track.date.start ).getFullYear();
    return yearColors[ ( (trackYear + colorsOffset) % colorsLength ) ];
  }

  const renderTracks = () => {
    const fragments = tracks.map( track => { 
      if ( track.status === 'success' ) {
        const pathColor = colorOfTrack( track )
        return (
          track.fragments.map( (fragment, index) => 
            <Polyline
              key={`${track.id}-f-${index}`}
              onClick={(e) => history.push(`/editor/tracks/${track.id}/edit`)}
              path={fragment}
              strokeColor={pathColor}
              strokeOpacity={mapStyle.stroke.opacity}
              strokeWeight={mapStyle.stroke.width}
              label={track.id}
            /> 
          ) 
        )
      } else {
        return
      }
    })
  
    return ( fragments )
  }
  
  return (
    <Map 
      google={ google }
      zoom={14}
      bounds={centerBounds ? bounds : null}
      initialCenter={{
        lat: 50.05316,
        lng: 19.93518
      }}
      styles={mapDefaultStyles}
    >
      {renderTracks()}
    </Map>
  )
}
  
export default GoogleApiWrapper({
  // apiKey: 'AIzaSyCr9Uvjcrht84ncO5yJYpXgkhlhciDM2ac'
})(GMap)