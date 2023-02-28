import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { GAME_ROUTE } from './utils/constants';
import { Provider } from 'react-redux';
import { store } from './app/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>
);

window.onbeforeunload = function(evt) {
  if (window.location.href.includes(GAME_ROUTE)) {
    localStorage.setItem('game_store', JSON.stringify(store.getState().game))
  }
};