import React from 'react';
import { render } from 'react-dom';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';

import './global.styl';
import routes from './routes';

render(
  <BrowserRouter>
    {renderRoutes(routes)}
  </BrowserRouter>,
  document.getElementById('root'),
  () => console.log('Render completed')
);
