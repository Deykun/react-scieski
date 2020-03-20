import React, { Suspense } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import 'moment/locale/pl'

import ThemeWrapper from './Wrappers/ThemeWrapper'
import LoadingApp from '../styles/ui/LoadingApp'

import Editor from './Editor/Editor'
import Notifications from './Notifications/Notifications'
import Maps from './Maps/Maps'

const App = () => {
  return (
    <Router>
      <ThemeWrapper>
        <Suspense fallback={<LoadingApp />}>
          <Notifications />
          <Editor />
          <Maps /> 
        </Suspense>
      </ThemeWrapper>
    </Router>
  )
}

export default App
