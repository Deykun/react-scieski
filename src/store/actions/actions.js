import { v4 } from 'node-uuid';

export const addTracksFromFiles = (files) => {
    return (dispach) => {
        console.log(files);

        // Loading files in sequence 
        var sequence = Promise.resolve();

        files.map((file) => {
            sequence = sequence.then( () => { setTimeout( () => dispach( createTrackFromFile(file) ) , 1 ); } );
        });

        return sequence;
    }
}

const createTrackFromFile = (file) => {
    const allowedFormats = ['gpx','tcx'];

    let formatDot = file.name.lastIndexOf(".");
    let fileTitle = file.name.slice(0, formatDot);
    let fileFormat = file.name.substring(formatDot + 1);  

    if ( allowedFormats.includes(fileFormat) ) {

        const newTrack = {
            id: v4(),
            title: fileTitle,
            format: fileFormat
        };

        const reader = new FileReader();

        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.readAsBinaryString(file);

        reader.onloadend = () => {
            const fileContent = reader.result;

            //TO DO - getting data
        }
        
        return addTrackFromFile(newTrack)
    } else {
        return { type: 'WRONG_FILE_FORMAT' };
    }
}

const addTrackFromFile = (track) => {
    return { type: 'ADD_NEW_TRACK', track: track };
}