const initialState = {
    routes: [],
};

const reducer = ( state = initialState, action ) => {
    const newState = {...state};

    switch (action.type) {
        case 'ADD_NEW_TRACKS':
            console.info('Adding... tracks.');
            newState.routes = [ ...newState.routes, { id: this.nextUniqueId() } ];
            // newState.routes = [ ...newState.routes, { id: 'dsdssd' } ];
            console.log(newState.routes);
            break;

        case 'REMOVE_TRACK':
            console.info('Adding... track.');
            break;
    }

    return newState;
}

export default reducer;