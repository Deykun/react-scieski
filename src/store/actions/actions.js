import {
    ADD_NEW_TRACK,
    UPDATE_TRACK,
    FILE_IMPORT_ERROR,
} from '../constants/actions';

import { v4 } from 'node-uuid';

export const addTracksFromFiles = (files) => {
    return (dispatch) => {
        dispatch( addTracksFromFilesAsync(files) );
    }
}


export const addTracksFromFilesAsync = (files) => {
    return (dispatch) => {

        if ( !Array.isArray( files ) ) { files = [files]; }

        files.map( (file) => {
            setTimeout( () => createTrackFromFile(file, dispatch) , 0 ); // setTimeout prevents frezzing of the app
        });

        return;
    }
}

const createTrackFromFile = (file, dispatch) => {
    const allowedFormats = ['gpx','tcx'];

    let formatDot = file.name.lastIndexOf(".");
    let fileTitle = file.name.slice(0, formatDot);
    let fileFormat = file.name.substring(formatDot + 1).toLowerCase();  

    if ( allowedFormats.includes(fileFormat) ) {

        let newTrack = {
            id: v4(),
            title: fileTitle,
            format: fileFormat
        };
        
        dispatch ( { type: ADD_NEW_TRACK, track: newTrack } );

        const reader = new FileReader();

        reader.onabort = () => { dispatch( { type: FILE_IMPORT_ERROR, id: newTrack.id, msg: 'File reading was aborted' } ) };
        reader.onerror = () => { dispatch( { type: FILE_IMPORT_ERROR, id: newTrack.id, msg: 'File reading has failed' } ) };

        reader.readAsBinaryString(file);


        reader.onloadend = () => {
            const fileContent = reader.result;

            const trackData = dataFromFile( fileContent, fileFormat );

            let trackToSave = { ...newTrack, ...trackData};
            
            dispatch( { type: UPDATE_TRACK, id: newTrack.id, track: trackToSave } );
        }
        return;
    } else {
        return { type: FILE_IMPORT_ERROR, msg: 'Wrong file format.' };
    }
}

const dataFromFile = (fileContent, fileFormat) => {
    
    const points = [];

    const xmlParser = new DOMParser();
    const xmlFileContent = xmlParser.parseFromString( fileContent , 'text/xml');

    switch ( fileFormat ) {
        case 'gpx':
            var rawPoints = [...xmlFileContent.querySelectorAll('trkpt')]; // [...] to change NodeList to Array
            
            rawPoints.map( rawPoint => {
                let latitude = rawPoint.getAttribute('lat') !== null ? rawPoint.getAttribute('lat') : null;
                let longitude = rawPoint.getAttribute('lon') !== null ? rawPoint.getAttribute('lon') : null;
                let time = rawPoint.querySelector('time') !== null ? rawPoint.querySelector('time').textContent : null;
                let altitude = rawPoint.querySelector('ele') !== null ? rawPoint.querySelector('ele').textContent : 0;

                if ( latitude !== null && longitude !== null) {
                    let newPoint = createPoint( latitude, longitude, time, altitude );
                    points.push( newPoint );
                }
            }); 

            var activity = xmlFileContent.querySelector('type') !== null ? xmlFileContent.querySelector('type').textContent.toLowerCase() : '';
            var distanceFromFile = 0;

            break;
 
        case 'tcx':
            var rawPoints = [...xmlFileContent.querySelectorAll('Trackpoint')]; // [...] to change NodeList to Array

            rawPoints.map( rawPoint => {
                let latitude = rawPoint.querySelector('LatitudeDegrees') !== null ? rawPoint.querySelector('LatitudeDegrees').textContent : null;
                let longitude = rawPoint.querySelector('LongitudeDegrees') !== null ? rawPoint.querySelector('LongitudeDegrees').textContent : null;
                let time = rawPoint.querySelector('Time') !== null ? rawPoint.querySelector('Time').textContent : null;
                let altitude = rawPoint.querySelector('AltitudeMeters') !== null ? rawPoint.querySelector('AltitudeMeters').textContent : 0;

                if ( latitude !== null && longitude !== null) {
                    let newPoint = createPoint( latitude, longitude, time, altitude );
                    points.push( newPoint );
                }
            });

            var activity = xmlFileContent.querySelector('Activity') !== null ? xmlFileContent.querySelector('Activity').getAttribute('Sport').toLowerCase() : '';
            var distanceFromFile = xmlFileContent.querySelector('DistanceMeters') !== null ? Number( xmlFileContent.querySelector('DistanceMeters').textContent / 1000 ) : 0;

            break;
    }
    
    const calculatedDistance = calculateDistance(points);

    const trackData = {
        date: {
            start: points[0].time,
            middle: points[ Math.floor(points.length / 2) ].time,
            end: points[ points.length - 1 ].time,
        },
        activity: activity,
        distance: calculatedDistance,
        points: points
    }

    return trackData;
}

const createPoint = (latitude, longitude, time, altitude = 0) =>  {				
    return { lat: Number(latitude), lng: Number(longitude), time: time, alt: Number(altitude) };
}

/* Track distance in km,  altitude is being ignored */
const calculateDistance = (points) => {
    if (points.length < 2) {
        return 0;
    }

    let totalDistance = 0;
    const earthRadius = 6371; // mean in km

    for (var i = 1, imax = points.length ; i < imax ; i++) {
        if (points[i].lat == 0 && points[i].lng == 0) {
            points[i].lat = points[i-1].lat;
            points[i].lng = points[i-1].lng;
            continue;
        }

        var dLat = ( ( points[i].lat - points[(i-1)].lat ) * Math.PI / 180 ); // toRad
        var dLng = ( ( points[i].lng - points[(i-1)].lng ) * Math.PI / 180 ); // toRad

        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos( (points[(i-1)].lat * Math.PI / 180 )) * Math.cos( ( points[i].lat * Math.PI / 180 ) ) * 
                Math.sin(dLng/2) * Math.sin(dLng/2); 

        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var pointsDistance = earthRadius * c; // in km
        totalDistance += pointsDistance;
    }

    return totalDistance;
}