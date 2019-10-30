import React from 'react'
import { BrowserRouter as Router, Switch, NavLink, Route } from 'react-router-dom'

import Tracks from './Tracks.js'
import Settings from './Settings.js'

import { EditorPanel } from '../../styles/components/Editor'

const Editor = () => {
  return (
    <EditorPanel>
      <ul>
        <li>
          <NavLink to="/editor/tracks">Trasy</NavLink>
        </li>
        <li>
          <NavLink to="/editor/settings">Ustawienia</NavLink>
        </li>
      </ul>
      <Switch>
        <Route path="/editor/tracks" component={Tracks} />
        <Route component={Settings} />
      </Switch>
    </EditorPanel>
  )
}

export default Editor
