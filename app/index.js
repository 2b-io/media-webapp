import React from 'react';
import { render } from 'react-dom';

import App from 'containers/App';

import './global.styl';

render(
  <App />,
  document.getElementById('root'),
  () => console.log('Render completed')
);
