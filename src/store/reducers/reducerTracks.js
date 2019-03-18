const initialState = {
    tracks: [],
};

const reducer = ( state = initialState, action ) => {
    const newState = {...state};
 
    switch (action.type) {
        case 'ADD_NEW_TRACK':
            newState.tracks = [ ...newState.tracks, action.track ];

            console.log(newState)
            break;

        case 'REMOVE_TRACK':
            newState.tracks = newState.tracks.filter( track => track.id !== action.id ); 
            break;
    }

    return newState;
}

export default reducer;