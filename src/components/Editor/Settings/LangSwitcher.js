import React from 'react'
import { useTranslation } from 'react-i18next'
import { LANGS as languages } from '../../../i18n'

import Button from '../../../styles/ui/Button'
import Title from '../../../styles/ui/Title'

import { SettingsCard } from '../../../styles/components/Editor/TabSettings'

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation()

  return (
    <SettingsCard>
      <Title>
        {t('settings.language.title')} 
      </Title>
      {languages.map( lang => 
        <Button 
          key={lang}
          positive={i18n.language === lang}
          onClick={() => i18n.changeLanguage( lang )}
        >
          {t(`language.${lang}`)} 
        </Button>
      )}
    </SettingsCard>
  )
}

export default LanguageSwitcher
