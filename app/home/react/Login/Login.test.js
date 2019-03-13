import React from 'react';
import ReactDOM from 'react-dom';
import Component from './Login';

it('renders without crashing', () => {
  window.initialState = {
    login_link: "https://google.com"
  };
  const div = document.createElement('div');
  ReactDOM.render(<Component />, div);
  ReactDOM.unmountComponentAtNode(div);
});
