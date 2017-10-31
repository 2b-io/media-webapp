import createHistory from 'history/createBrowserHistory';
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import HomePage from 'containers/HomePage/Loadable';
import SignIn from 'containers/SignIn';
import createStore from 'store';

const browserHistory = createHistory();
const store = createStore();

window._store = store;

const history = syncHistoryWithStore(browserHistory, store);

class App extends React.Component {
  render() {
    let props = this.props;

    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={HomePage}>
            <Route path="sign.in" component={SignIn} />
          </Route>
        </Router>
      </Provider>
    );
  }
}

export default App;
