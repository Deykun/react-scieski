import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import 'moment/locale/pl'

import Editor from './Editor'
import Notifications from './Notifications'

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
        </>
        {/* 
        <Editor />
        <Maps /> */}
        
      </Theme>
    </Router>
  );
}

export default App;
