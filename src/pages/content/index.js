import React from 'react';
import ReactDOM from 'react-dom';
import Common from '../../components/Common';
import './index.css';
import App from './containers/App';

let anchor = document.getElementById('root');
if (!anchor) {
  // For chrome content environment
  anchor = document.createElement('div');
  document.body.appendChild(anchor);
}

ReactDOM.render(
  <Common>
    <App />
  </Common>,
  anchor
);
