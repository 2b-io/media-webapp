import React, { Component } from 'react'
import { mapDispatch } from 'services/redux-helpers'
import { connect } from 'react-redux'
import { actions } from 'state/interface'
import { bindActionCreators } from 'redux';
import  Table from './table';


class ProjectList extends React.Component {
  constructor(props) {
  super(props)

  this.displayProjects = this.displayProjects.bind(this);
  }
  componentDidMount() {
    let {token} = this.props
    if (!token) return
    this.props.actions.getListProject(token)
  }

  // displayProjects() {
  //   if (this.props.data && this.props.data.length) {
  //     const results = this.props.data.map((project) => {
  //       return (
  //
  //       <li key={project._id}>
  //         <h4>{project.name}</h4>
  //         <p>{project.slug}</p>
  //       </li>
  //     )
  //   })
  //     return results;
  //   } else {
  //     return <h2>Loading...</h2>
  //   }
  // }
  displayProjects() {
    if (this.props.data && this.props.data.length) {
      const results = this.props.data.map((project) => {
        return (

        <li key={project._id}>
          <h4>{project.name}</h4>
          <p>{project.slug}</p>
        </li>
      )
    })
      return     <Table dataRows={this.props.data}/>;
    } else {
      return <h2>Loading...</h2>
    }
  }
  render(){
    return (
       <div>
        {this.displayProjects()}
      </div>

    )
  }
}
const mapStateToProps = ({session,project}) => {
  let {info} = session
  if (!info) return
  let {token} = info
    return {
      data:project.projects,
      token
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
          getListProject: actions.getListProject
        }, dispatch)
    }
  }


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectList)
