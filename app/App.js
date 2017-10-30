import React from 'react';

import HomePage from 'containers/HomePage/Loadable';

class App extends React.Component {
  render() {
    let props = this.props;

    return (
      <HomePage {...props} />
    );
  }
}

export default App;
