import PropTypes from 'prop-types'
import React from 'react'
import { ThemeProvider } from 'styled-components'

const theme = {
  importFontFromGoogle: true,
  color: {
    card: '#9f9f9f',
    cardStrong: 'white',
    positve: '#c4d33e',
    negative: '#f4960f',
  },
  background: {
    app: '#e5e5e5',
    card: '#2d2d2d'
  },
  other: {
    borderRadius: '3px'
  }
}

const Theme = ({children}) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}

Theme.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Theme
