import { combineReducers } from 'redux'

import tracks from './tracks'
import notifications from './notifications'

const rootReducer = combineReducers({
  tracks,
  notifications
})

export default rootReducer