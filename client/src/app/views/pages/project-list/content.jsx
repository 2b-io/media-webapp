import React, {Component} from 'react'
import {mapDispatch} from 'services/redux-helpers'
import {connect} from 'react-redux'
import {actions} from 'state/interface'
import {bindActionCreators} from 'redux';
import {GridView} from 'ui/compounds'

class ProjectList extends React.Component {
  componentDidMount() {
    let {token} = this.props
    if (!token)
      return
     this.props.getListProject(token)
  }

  displayProjects() {
    if (this.props.data && this.props.data.length) {
      return <GridView dataRows={this.props.data} dataCols={['ID', 'Name', 'Slug']}/>;
    } else {
      return <h2>Loading...</h2>
    }
  }
  render() {
    return (<div>
      {this.displayProjects()}
    </div>)
  }
}
const mapStateToProps = ({session, project}) => {
  let {info} = session
  if (!info)
    return
  let {token} = info
  return {data: project.projects, token}
}

 const mapDispatchToProps = mapDispatch({
  getListProject: (token) => actions.getListProject(token)
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList)
