import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import Scieski from './components/Scieski'
import StoreProvider from './components/Wrappers/StoreProvider'
import './i18n'

ReactDOM.render( 
  <Suspense fallback={'Loading...'}>
    <StoreProvider>
      <Scieski />
    </StoreProvider>
  </Suspense>,
  document.getElementById('root')
)