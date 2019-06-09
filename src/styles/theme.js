import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
  color: {
    brand: '#d4db96',
    text: '#333333',
    inactive: '#c0c0c0',
    active: '#d4db96'
  },
  background: {
    editor: 'white' 
  }
}

const Theme = (props) => {
    const track = props.track;
    return (
      <ThemeProvider theme={theme}>
        {props.children}
      </ThemeProvider>
    )
}

export default Theme;
