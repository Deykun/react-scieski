import React from 'react'
import ReactDOM from 'react-dom'
import Scieski from './components/Scieski'
import StoreProvider from './components/StoreProvider'

ReactDOM.render( 
  <StoreProvider>
    <Scieski />
  </StoreProvider>,
  document.getElementById('root')
)