import React from 'react';
import { render } from 'react-dom';
import App from './App';
import configureStore from './store/configureStore';
import { Provider as ReduxProvider } from 'react-redux';

const store = configureStore();

render(
  <ReduxProvider store={ store }>
    <App history={history}/>
  </ReduxProvider>,
  document.getElementById('app'));
