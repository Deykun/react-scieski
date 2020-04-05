import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { removeAllTracks } from '../../../actions/tracks'

import Button from '../../../styles/ui/Button'
import Title from '../../../styles/ui/Title'

import { SettingsCard } from '../../../styles/components/Editor/TabSettings'

const Global = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  return (
    <SettingsCard>
      <Title>
        {t('settings.global.title')} 
      </Title>
      <Button 
        onClick={() => dispatch(removeAllTracks())}
      >
        {t('settings.global.removeAllTracks')} 
      </Button>
    </SettingsCard>
  )
}

export default Global
