import React from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import './index.css';
import configureStore from './store/configureStore';
import { Provider as ReduxProvider } from 'react-redux';

const store = configureStore();

render(
  <ReduxProvider store={ store }>
    <App/>
  </ReduxProvider>,
  document.getElementById('app'));
