import createHistory from 'history/createBrowserHistory';
import React from 'react';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { Router, Route, Switch } from 'react-router-dom';

import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import createStore from 'store';

const browserHistory = createHistory();
const store = createStore();

const history = syncHistoryWithStore(browserHistory, store);

class App extends React.Component {
  render() {
    let { route } = this.props;

    return (
      <div>
        <h1>Hello world!</h1>
        { renderRoutes(route.routes) }
      </div>
    );
  }
}

export default App;
