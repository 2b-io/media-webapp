import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  render() {
    let props = this.props;

    return (
      <div {...props}>Hello world</div>
    );
  }
}

render(
  <App />,
  document.getElementById('root'),
  () => console.log('Render completed')
);
