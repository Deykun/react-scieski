import {
  ADD_MAP
} from '../constants/actions';

import { v4 } from 'node-uuid';

const initialState = {
  settings: {
    map: {
        range: 'years' 
    }
  },
  maps: []
};

const reducer = ( state = initialState, action ) => {
  let newState = {...state};

  switch (action.type) {
    case ADD_MAP: 
      newState.maps = [ ...newState.maps, { id: v4() } ];
      break;

    case 'CHANGE_RANGE':
      newState.settings.map = action.range;
      break;
    default:
  }

  return newState;
}

export default reducer;