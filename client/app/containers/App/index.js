import React from 'react'

import Message from 'components/Message'

import PersonalDrawer from 'containers/PersonalDrawer'
import SystemDrawer from 'containers/SystemDrawer'
import Header from './Header'
import Footer from './Footer'
import Routes from './Routes'
import style from './style'

class App extends React.Component {
  render() {
    return [
      <PersonalDrawer key="personal-drawer" />,
      <SystemDrawer key="system-drawer" />,
      <div id="page-wrap" style={style.wrapper} key="page-wrap">
        <Header />
        <section style={style.content}>
          <Message type="error">Error Message</Message>
          <Message type="info">Info Message</Message>
          <Routes />
        </section>
        <Footer />
      </div>
    ]
  }
}

export default App
