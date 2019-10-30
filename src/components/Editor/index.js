import React from 'react'
import { Switch, Route, Link, useLocation } from 'react-router-dom'

import Tracks from './Tracks.js'
import Settings from './Settings.js'

import Button from '../../styles/ui/Button'
import { Panel, TabNav, TabNavLink } from '../../styles/components/Editor'

const Editor = () => {
  const location = useLocation()

  const tabs = [
    {
      title: 'trasy',
      path: '/editor/tracks'
    },
    {
      title: 'ustawienia',
      path: '/editor/settings'
    }
  ]

  return (
    <Panel className={location.pathname.startsWith('/editor') ? 'active' : ''}>
      <TabNav>
        <Button className="close" as={Link} to="/" negative={1} aria-label="Zamknij" iconleft="cross" iconsize={31} />
        <ul>
          {tabs.map( (tab, index) => 
            <li key={index}>
              <TabNavLink to={tab.path}>{tab.title}</TabNavLink>
            </li>
          )}
        </ul>
      </TabNav>
      <Switch>
        <Route path="/editor/tracks" component={Tracks} />
        <Route component={Settings} />
      </Switch>
    </Panel>
  )
}

export default Editor
