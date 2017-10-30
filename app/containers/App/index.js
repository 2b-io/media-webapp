import React from 'react';
import { Provider } from 'react-redux';

import HomePage from 'containers/HomePage/Loadable';
import store from 'store';


class App extends React.Component {
  render() {
    let props = this.props;

    return (
      <Provider store={store}>
        <HomePage {...props} />
      </Provider>
    );
  }
}

export default App;
