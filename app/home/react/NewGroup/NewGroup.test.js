import React from 'react';
import ReactDOM from 'react-dom';
import Component from './NewGroup';

it('renders without crashing', () => {
  window.initialState = {
    foo: "bar"
  };
  const div = document.createElement('div');
  ReactDOM.render(<Component />, div);
  ReactDOM.unmountComponentAtNode(div);
});
