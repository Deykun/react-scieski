import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import 'moment/locale/pl'

import Editor from './Editor/Editor'
import Notifications from './Notifications/Notifications'
import Maps from './Maps/Maps'

import GlobalStyle from '../styles/globalStyle'
import Theme from '../styles/theme'

const App = () => {
  return (
    <Router>
      <Theme>  
        <>
          <GlobalStyle />
          <Notifications />
          <Editor />
          <Maps />
        </>        
      </Theme>
    </Router>
  )
}

export default App
