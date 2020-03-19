import React from 'react'
import { useTranslation } from 'react-i18next'
import { LANGS as languages } from '../../../i18n'

import Button from '../../../styles/ui/Button'
import Title from '../../../styles/ui/Title'

import { SwitcherCard } from '../../../styles/components/Editor/LangSwitcher'

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation()

  return (
    <SwitcherCard>
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
    </SwitcherCard>
  )
}

export default LanguageSwitcher
