import React from 'react';
import ReactDOM from 'react-dom';
import Scieski from './Scieski';

it('Renders app without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Scieski />, div);
  ReactDOM.unmountComponentAtNode(div);
});
