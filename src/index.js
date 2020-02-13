import React from 'react'
import ReactDOM from 'react-dom'
import Scieski from './components/Scieski'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import rootReducer from './reducers/'  

const store = createStore( rootReducer )

ReactDOM.render( 
  <Provider store={store}>
    <Scieski />
  </Provider>,
  document.getElementById('root')
)