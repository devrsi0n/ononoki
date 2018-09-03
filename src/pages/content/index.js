import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Common from '../../components/Common';
import App from './containers/App';
import reducers from './reducers';
import clients from './clients';

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function render(anchor, btnStyle = {}, video) {
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
