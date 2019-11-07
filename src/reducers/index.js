import { combineReducers } from 'redux'

import tracks from './tracks'
import maps from './maps'
import notifications from './notifications'

const rootReducer = combineReducers({
  tracks,
  maps,
  notifications
})

export default rootReducer