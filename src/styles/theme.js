import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
  importFontFromGoogle: true,
  colorBrand: '#d4db96',
  colorText: '#333333',
  colorInactive: '#c0c0c0',
  colorActive: '#a4b324',
  colorActive75: '#737e10',
  colorBorder: '#f8f8f8',
  backgroundApp: '#e5e5e5',
  backgroundComponent: 'white'
}

const Theme = (props) => {
    return (
      <ThemeProvider theme={theme}>
        {props.children}
      </ThemeProvider>
    )
}

export default Theme;
