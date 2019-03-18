const initialState = {
    settings: {
        map: {
            range: 'years' 
        }
    }
};

const reducer = ( state = initialState, action ) => {
    const newState = {...state};
 
    switch (action.type) {
        case 'CHANGE_RANGE':
            newState.settings.map = action.range;
            break;
    }

    return newState;
}

export default reducer;