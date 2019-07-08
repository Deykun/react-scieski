import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
  importFontFromGoogle: true,
  color: {
    brand: '#d4db96',
    text: '#333333',
    inactive: '#c0c0c0',
    active: '#a4b324',
    active75: '#737e10',
    main: '#0b9c59',
    main75: '#087442',
    danger: '#d53030',
    danger75: '#7e1010',
    border: '#f8f8f8'
  },
  background: {
    app: '#e5e5e5',
    component: 'white',
    main: 'white',
    danger: 'white',
  }
}

const Theme = (props) => {
    return (
      <ThemeProvider theme={theme}>
        {props.children}
      </ThemeProvider>
    )
}

export default Theme;
