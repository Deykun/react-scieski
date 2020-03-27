import React from 'react'
import PropTypes from 'prop-types'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from '../../reducers/index'

const store = createStore( rootReducer, applyMiddleware(thunk) )

const StoreProvider = ({children}) => (
  <Provider store={store}>
    {children}
  </Provider>
)

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default StoreProvider