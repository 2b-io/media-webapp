import React from 'react'
import { connect } from 'react-redux'

export default function(didMount, shouldRender = () => true, mapStateToProps, LoadingComponent) {
  return function(Component) {

    console.log(mapStateToProps)

    @connect(mapStateToProps)
    class ConditionalRenderer extends React.Component {
      constructor(props) {
        super(props)
      }

      componentDidMount() {
        console.log(`ConditionalRenderer:${Component.displayName}:componentDidMount`)

        if (didMount) {
          didMount.call(this, this.props)
        }
      }

      render() {
        console.log(`ConditionalRenderer:${Component.displayName}:render`)

        return (
          shouldRender(this.props) ?
            <Component {...this.props} {...this.state} /> :
            (
              LoadingComponent ?
                <LoadingComponent /> :
                <h1>Loading</h1>
            )
        )
      }
    }

    return ConditionalRenderer
  }
}
