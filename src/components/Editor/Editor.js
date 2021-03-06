import React from 'react'
import { Switch, Route, Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import TabTracks from './TabTracks.js'
import TabTrack from './TabTrack.js'
import TabSettings from './TabSettings.js'

import Button from '../../styles/ui/Button'
import { Panel, TabNav, TabNavLink, EditorOpener } from '../../styles/components/Editor/Editor'

const Editor = () => {
  const location = useLocation()
  const { t } = useTranslation() 

  const tabs = [
    {
      title: t('editor.tabs.routes'),
      path: '/editor/tracks'
    },
    {
      title: t('editor.tabs.settings'),
      path: '/editor/settings'
    }
  ]

  return (
    <Panel className={location.pathname.startsWith('/editor') ? 'open' : ''}>
      <EditorOpener>
        <Button 
          className="open" 
          as={Link} 
          to="/editor" 
          aria-label={t('common.open')} 
          iconleft="edit" 
          iconsize={31} 
        />
      </EditorOpener>
      <TabNav>
        <Button 
          className="close" 
          as={Link} 
          to="/" 
          negative={1} 
          aria-label={t('common.close')} 
          iconleft="cross" 
          iconsize={31} 
        />
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
