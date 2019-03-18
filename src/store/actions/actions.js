import { v4 } from 'node-uuid';

export const addTracksFromFiles = (files) => {
    return (dispach) => {
        console.log(files);

        const allowedFormats = ['gpx','tcx'];

        files.map( 
            (file) => {
                const reader = new FileReader();
                reader.onabort = () => console.log('file reading was aborted')
                reader.onerror = () => console.log('file reading has failed')
                reader.readAsBinaryString(file)
                
                let formatDot = file.name.lastIndexOf(".");
                const fileTitle = file.name.slice(0, formatDot);
                const fileFormat = file.name.substring(formatDot + 1);              
                
                if ( allowedFormats.includes(fileFormat) ) {

                    const newTrack = {
                        id: v4(),
                        title: fileTitle,
                        format: fileFormat
                    };
    

                    reader.onloadend = () => {
                        const fileContent = reader.result;

                        //TO DO - getting data
                    }
                    
                    dispach( addTrackFromFile(newTrack) );
                }
            }
        );
    }
}

const addTrackFromFile = (track) => {
    return { type: 'ADD_NEW_TRACK', track: track };
}