import React from 'react';

class App extends React.Component {
  render() {
    let props = this.props;

    return (
      <div {...props}>
        <span>Hello world</span>
      </div>
    );
  }
}

export default App;
