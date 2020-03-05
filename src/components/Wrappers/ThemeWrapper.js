import React from 'react'
import PropTypes from 'prop-types'
import GlobalStyle from '../../styles/globalStyle'
import Theme from '../../styles/theme'

const ThemeWrapper = ({children}) => (
  <Theme>  
    <>
      <GlobalStyle />
      {children}
    </>        
  </Theme>
)

ThemeWrapper.propTypes = {
  children: PropTypes.node.isRequired
}

export default ThemeWrapper