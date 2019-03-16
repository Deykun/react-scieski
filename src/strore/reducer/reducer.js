import { v4 } from 'node-uuid';


const initialState = {
    tracks: [],
};

const reducer = ( state = initialState, action ) => {
    const newState = {...state};
 
    switch (action.type) {
        case 'ADD_NEW_TRACKS':
            console.info('Adding... tracks.');
            newState.tracks = [ ...newState.tracks, { id: v4() } ];
            console.log(newState.tracks);
            break;

        case 'REMOVE_TRACK':
            console.info('Removing... track.');
            newState.tracks = newState.tracks.filter( track => track.id !== action.id );
            
            break;
    }

    return newState;
}

export default reducer;