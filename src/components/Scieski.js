import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import Editor from './Editor'

import GlobalStyle from '../styles/globalStyle'
import Theme from '../styles/theme'

const App = () => {
  return (
    <Router>
      
      <Theme>  
        <>
          <GlobalStyle />
          <Editor />
        </>
        {/* <Notifications></Notifications>
        <Editor />
        <Maps /> */}
        
      </Theme>
    </Router>
  );
}

export default App;
