import React from 'react'
import PropTypes from 'prop-types'

import StoreProvider from './StoreProvider'
import ThemeWrapper from './ThemeWrapper'
import { BrowserRouter as Router } from 'react-router-dom'

const TestWrapper = ({children}) => (
  <Router>
    <StoreProvider>
      <ThemeWrapper>
        {children}
      </ThemeWrapper>
    </StoreProvider>
  </Router>
)

TestWrapper.propTypes = {
  children: PropTypes.node.isRequired
}

export default TestWrapper