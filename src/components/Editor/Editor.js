import React from 'react'
import { Switch, Route, Link, useLocation } from 'react-router-dom'

import TabTracks from './TabTracks.js'
import TabTrack from './TabTrack.js'
import TabSettings from './TabSettings.js'

import Button from '../../styles/ui/Button'
import { Panel, TabNav, TabNavLink, EditorOpener } from '../../styles/components/Editor'

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
      <EditorOpener>
        <Button className="open" as={Link} to="/editor" aria-label="Otwórz" iconleft="edit" iconsize={31} />
      </EditorOpener>
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
        <Route path="/editor/tracks/:id?/edit" component={TabTrack} />
        <Route path="/editor/tracks/:id?" component={TabTracks} />
        <Route path="/editor/settings" component={TabSettings} />
      </Switch>
    </Panel>
  )
}

export default Editor
