
import React  from 'react'
import ReactDOM  from 'react-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {x} from 'react-icons-kit/feather/x'

class Modal extends React.Component {

  constructor(props) {
     super(props);
     this.containerModal = document.createElement('div');
     document.body.appendChild(this.containerModal);
   }

  PropTypes = {
    position: PropTypes.string,
    dimmer: PropTypes.bool,
    open: PropTypes.bool,
    onClickOutside: PropTypes.func,
    onClose: PropTypes.func,
    height: PropTypes.oneOfType([ PropTypes.string, PropTypes.number]),
    width: PropTypes.oneOfType([ PropTypes.string, PropTypes.number]),
    fullWidth: PropTypes.bool
  }

  componentWillUnmount() {
    document.body.removeChild(this.containerModal)
  }
  render() {
    if (!this.containerModal) { return }
    let {open,dimmer,position,height,width,fullWidth} = this.props
    let styleModal = {
      height: fullWidth? '90%' : height,
      width: fullWidth? '90%' : width,
      left: fullWidth? '51%' : '',
    }
    const modal = open ?  <Overlay
      style = {{backgroundColor: dimmer? 'rgba(0,0,0,0.3)':''}}
      onClick={()=>{
        this.props.onClickOutside? this.props.onClickOutside() : ''
      }}
      >
      <ContentModal
        onClick={(e)=>(e.stopPropagation())}
        className={position}
        style={styleModal}
        >
        <IconClose
          onClick={()=>{
              this.props.onClose? this.props.onClose() : ''
          }}>
          x
        </IconClose>
        {this.props.children({...this.props})}
      </ContentModal>
    </Overlay> : ''

    return  ReactDOM.createPortal(modal, this.containerModal)
  }
}
Modal.defaultProps = {
  position:'center',
  dimmer:true,
  open:false,
  fullWidth:false,
  width:'30%',
  }
const ContentModal = styled.div `
  {
    background-color: #fff;
    box-shadow: 3px 3px 3px rgba(0,0,0,0.2);
    padding: 40px 50px;
    margin: 20px auto;
    border-radius: 2px;
    align-self: flex-start;
  }
  &.center {
    position: absolute;
    top: 50%;
    left: 55%;
    transform: translate(-50%, -50%);
    transition: all 0.5s ease;
    align-self: center;
  }
  &.top {
    top: 0;
    left: 0;
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
  z-index: 1;
`
const IconClose = styled.div `
  cursor: pointer;
  position: absolute;
  right: 0px;
  top: 5px;
  font-size: 20px;
  width: 30px;
  height: 30px;
  color: #282c34;
`
export default Modal
