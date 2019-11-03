import moment from 'moment'
import { updateTrack } from '../actions/tracks.js'

export const readFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onabort = () => {
      console.log('FIAL ABORT')
      return resolve()
    }
    reader.onerror = () => {
      console.log('FIAL ERROR')
      return resolve()
    }

    reader.readAsBinaryString(file)

    reader.onloadend = () => {
      const fileContent = reader.result
      const track = dataFromFile( fileContent, file.format )
      track.status = 'success'
      track.id = file.id
      return resolve( updateTrack( { data: track } )  )
    }
  })
}

const dataFromFile = (fileContent, fileFormat) => {
  var points = []
  const fragments = []

  const xmlParser = new DOMParser()
  const xmlFileContent = xmlParser.parseFromString( fileContent , 'text/xml')

  let activity = 'other'
  let distanceFromFile = 0

  switch ( fileFormat ) {
    case 'gpx': {
      let rawFragmentsGPS = [...xmlFileContent.querySelectorAll('trkseg')] // [...] to change NodeList to Array

      rawFragmentsGPS.forEach( rawFragment => {
        let rawPointsGPX = [...rawFragment.querySelectorAll('trkpt')] // [...] to change NodeList to Array
    
        rawPointsGPX.forEach( rawPoint => {
          let latitude = rawPoint.getAttribute('lat') !== null ? rawPoint.getAttribute('lat') : null
          let longitude = rawPoint.getAttribute('lon') !== null ? rawPoint.getAttribute('lon') : null
          let time = rawPoint.querySelector('time') !== null ? rawPoint.querySelector('time').textContent : null
          let altitude = rawPoint.querySelector('ele') !== null ? rawPoint.querySelector('ele').textContent : 0

          if ( latitude !== null && longitude !== null) {
            let newPoint = createPoint( latitude, longitude, time, altitude )
            points.push( newPoint )
          }
        })

        if ( points.length > 0 ) {
          fragments.push( points )
          points = []
        }
      })            

      if ( xmlFileContent.querySelector('type') !== null ) {
        activity = xmlFileContent.querySelector('type').textContent.toLowerCase()
      }

      distanceFromFile = 0
      break
    }
    case 'tcx': {
      let rawPointsTCX = [...xmlFileContent.querySelectorAll('Trackpoint')] // [...] to change NodeList to Array

      rawPointsTCX.forEach( rawPoint => {
        let latitude = rawPoint.querySelector('LatitudeDegrees') !== null ? rawPoint.querySelector('LatitudeDegrees').textContent : null
        let longitude = rawPoint.querySelector('LongitudeDegrees') !== null ? rawPoint.querySelector('LongitudeDegrees').textContent : null
        let time = rawPoint.querySelector('Time') !== null ? rawPoint.querySelector('Time').textContent : null
        let altitude = rawPoint.querySelector('AltitudeMeters') !== null ? rawPoint.querySelector('AltitudeMeters').textContent : 0

        /* In tcx pause is marked with lack of Altitude before and after */
        if ( rawPoint.querySelector('AltitudeMeters') === null && points.length !== 0 && fragments.length > 0 ) {
          fragments.push( points )
          points = []
        }

        if ( latitude !== null && longitude !== null) {
          let newPoint = createPoint( latitude, longitude, time, altitude )
          points.push( newPoint )
        }
      })

      if ( points.length > 0 ) {
        fragments.push( points )
      }

      if ( xmlFileContent.querySelector('Activity') !== null ) {
        activity = xmlFileContent.querySelector('Activity').getAttribute('Sport').toLowerCase()
      }

      if ( xmlFileContent.querySelector('DistanceMeters') !== null ) {
        distanceFromFile = Number( xmlFileContent.querySelector('DistanceMeters').textContent / 1000 )
      }
      break
    }
    default:
  }
  let calculatedDistance = 0
  fragments.forEach( fragment => {
    calculatedDistance += calculateDistance( fragment )
  } )

  let firstPoint = fragments[0][0];
  let lastPoint = fragments[ fragments.length - 1 ][ fragments[ fragments.length - 1 ].length - 1 ]
  let calculatedTimeDifference = calculateTimeDifference( firstPoint.time, lastPoint.time )
  let calculatedSpeed = calculateSpeed( firstPoint.time, lastPoint.time, calculatedDistance )

  if ( typeof lastPoint === 'undefined') {
    console.log(fileContent)
    console.log(fragments)
  }
  const trackData = {
    date: {
      start: firstPoint.time,
      end: lastPoint.time,
    },
    activity: activity,
    distance: calculatedDistance,
    distanceFromFile: distanceFromFile,
    duration: calculatedTimeDifference,
    speed: calculatedSpeed,
    fragments: fragments
  }
  return trackData
}

const createPoint = (latitude, longitude, time, altitude = 0) =>  {				
  return { lat: Number(latitude), lng: Number(longitude), time: time, alt: Number(altitude) };
}

/* Track distance in km,  altitude is being ignored */
const calculateDistance = (points) => {
  if (points.length < 2) {
    return 0
  }

  let totalDistance = 0
  const earthRadius = 6371 // mean in km

  for (var i = 1, imax = points.length ; i < imax ; i++) {
    if (points[i].lat === 0 && points[i].lng === 0) {
      points[i].lat = points[i-1].lat
      points[i].lng = points[i-1].lng
      continue
    }

    var dLat = ( ( points[i].lat - points[(i-1)].lat ) * Math.PI / 180 ) // toRad
    var dLng = ( ( points[i].lng - points[(i-1)].lng ) * Math.PI / 180 ) // toRad

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos( (points[(i-1)].lat * Math.PI / 180 )) * Math.cos( ( points[i].lat * Math.PI / 180 ) ) * 
            Math.sin(dLng/2) * Math.sin(dLng/2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    var pointsDistance = earthRadius * c // in km
    totalDistance += pointsDistance
  }
  return totalDistance
}

const calculateSpeed = ( start, end, distanceInKm ) => { 
  const timeInMs = moment(end).diff(moment(start))
  const speedKmH = distanceInKm / ( timeInMs / 1000 / 60 / 60 )
  return speedKmH
}

const calculateTimeDifference = ( start, end ) => { 
  const differenceInMs = moment(end).diff(moment(start))

  const difference = moment.duration(differenceInMs)
  const formatedDifference = Math.floor(difference.asHours()) > 0 ? Math.floor(difference.asHours()) + moment.utc(differenceInMs).format(':mm:ss') : moment.utc(differenceInMs).format('mm:ss')

  return formatedDifference
}