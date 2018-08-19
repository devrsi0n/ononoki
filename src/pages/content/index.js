import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Common from '../../components/Common';
import App from './containers/App';
import reducers from './reducers';
import './test.mp4';

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function render(anchor, newPage = false) {
  ReactDOM.render(
    <Provider store={store}>
      <Common>
        <App newPage={newPage} />
      </Common>
    </Provider>,
    anchor
  );
}

if (process.env.NODE_ENV === 'development') {
  const anchor = document.getElementById('root');
  render(anchor);
} else {
  setTimeout(() => {
    const anchor = document.createElement('div');

    let root = document.querySelector(
      '.bilibili-player-video-control-bottom-right'
    );
    if (root) {
      root.appendChild(anchor);
      render(anchor, true);
    } else {
      root = document.querySelector('.bilibili-player-video-time');
      if (root) {
        root.parentNode.insertBefore(anchor, root.nextSibling);
        render(anchor, false);
      } else {
        console.warn('[Meme maker]: Anchor not found');
      }
    }
  }, 5000);
}
