import Radium from 'radium';
import React from 'react';

import styles from './styles';

@Radium
class HomePage extends React.Component {
  render() {
    return (
      <div style={styles.container}>
        <h1>HomePage</h1>
      </div>
    );
  }
}

export default HomePage;
