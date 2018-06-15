
import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components'

class modal extends React.Component {

  render() {
    return (
      <Overlay>
        <Modal>
          {this.props.children}
        </Modal>
      </Overlay>
    )
  }
}
const Modal = styled.div `
    background-color: #fff;
    box-shadow: 3px 3px 3px rgba(0,0,0,0.2);
    padding: 40px 50px;
    width: 60%;
    margin: 20px auto;
    border-radius: 2px;
  .center {
    position: absolute;
    top: 50%;
    left: 55%;
    transform: translate(-50%, -50%);
    transition: all 0.5s ease;
    }
  .top {
    align-self: flex-start;
    transition: all 0.5s ease;
  }

`
const Overlay = styled.div `
  transition: all 0.3s ease;
  width: 50%;
  position: absolute;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  transform: scale(1);
  background-color: rgba(0,0,0,0.7);
`


export default modal
