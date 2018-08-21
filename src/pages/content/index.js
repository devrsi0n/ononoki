import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Common from '../../components/Common';
import App from './containers/App';
import reducers from './reducers';

if (process.env.NODE_ENV === 'development') {
  require('./test.mp4');
}

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
  const anchor = document.createElement('div');

  const root = document.querySelector(
    '.bilibili-player-video-control-bottom-right'
  );
  if (root) {
    root.appendChild(anchor);
    render(anchor, true);
  } else {
    const OLD_VERSION_CLASS = '.bilibili-player-video-time';

    const observer = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        if (!mutation.addedNodes) return;

        const oldRoot = document.querySelector(OLD_VERSION_CLASS);
        if (oldRoot && document.querySelector('video')) {
          oldRoot.parentNode.insertBefore(anchor, oldRoot.nextSibling);
          render(anchor, false);
          // stop watching
          observer.disconnect();
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false,
    });
  }
}
