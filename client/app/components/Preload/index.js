import React from 'react'
import { connect } from 'react-redux'

export default function(actionCreators, mapStateToProps) {
  return function(Component) {

    @connect(mapStateToProps)
    class Preload extends React.Component {
      constructor(props) {
        super(props)

        this._resolve = this._resolve.bind(this)
        this._isResolved = this._isResolved.bind(this)
      }

      componentDidMount() {
        console.log(`Preload:${Component.displayName}:componentDidMount`)

        let { dispatch } = this.props

        Object.keys(actionCreators).forEach(key => {
          let actionCreator = actionCreators[key]

          dispatch(actionCreator())
        })
      }

      render() {
        console.log(`Preload:${Component.displayName}:render`)

        let resolved = this._isResolved()

        console.log(`resolved: ${resolved}`)

        return (
          resolved ?
            <Component {...this.props} {...this.state}
              resolve={this._resolve}
            /> :
            <h1>Loading</h1>
        )
      }

      _resolve() {
        this.setState({ resolved: true})
      }

      _isResolved() {
        let resolved = true

        Object.keys(actionCreators).forEach(key => {
          let value = this.props[key]

          if (!value) {
            resolved = false
          }
        })

        return resolved
      }
    }

    return Preload
  }
}
