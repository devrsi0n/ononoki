import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Common from '../../components/Common';
import App from './containers/App';
import reducers from './reducers';
import clients from './clients';

if (chrome && chrome.runtime && chrome.runtime.getManifest) {
  const { version } = chrome.runtime.getManifest();
  console.log(`Ononoki version: ${version}`);
}

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function render(
  anchor,
  btnStyle = {},
  video = document.querySelector('video')
) {
  anchor.setAttribute('id', 'ononoki');

  ReactDOM.render(
    <Provider store={store}>
      <Common>
        <App btnStyle={btnStyle} video={video} />
      </Common>
    </Provider>,
    anchor
  );
}

if (process.env.NODE_ENV === 'development') {
  const anchor = document.getElementById('root');
  render(anchor);
} else {
  for (const client of clients) {
    client(render);
  }
}
