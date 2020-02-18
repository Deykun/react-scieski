import React from 'react'
import PropTypes from 'prop-types'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import rootReducer from '../reducers/index'

const store = createStore( rootReducer )

const StoreProvider = ({children}) => (
  <Provider store={store}>
    {children}
  </Provider>
)

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default StoreProvider