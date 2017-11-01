import React from 'react';
import { renderRoutes } from 'react-router-config';

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
