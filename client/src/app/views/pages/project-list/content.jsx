import React, {Component} from 'react'
import {mapDispatch} from 'services/redux-helpers'
import {connect} from 'react-redux'
import {actions} from 'state/interface'
import {GridView} from 'ui/compounds'
import {Modal} from 'ui/elements'

class ProjectList extends React.Component {
  componentDidMount() {
      // to do
    this.props.getListProject()
  }
  state = {
    open:false
  }
  displayProjects() {
    let {projects} = this.props
    if (projects && projects.length) {
      return (
        <GridView
          dataHeader={['ID', 'Name', 'Slug']}
          dataBody={projects}
        />
      )
    } else {
      return <h2>No data ....</h2>
    }
  }

  render() {
    return (
      <main>
        {this.displayProjects()}
        <Modal
          open={this.state.open}
          onClickOutside={(e)=>{
           this.setState({open:false})
        }}
          onClose={(e)=>{
           this.setState({open:false})
        }}
        >
          {({open}) => {
            const content =  open ? <div>
            <p>
              Test new modal
            </p>
            <button> New modal </button>
            {this.displayProjects()}
          </div> : ''
          return content
        }}
        </Modal>
        <button onClick={()=> { this.setState({open:true})} }>Open Modal</button>
      </main>
    )
  }
}

const mapStateToProps = ({ project }) => {
  return {projects: project.projects}
}

const mapDispatchToProps = mapDispatch({
  getListProject: () => actions.getListProject()
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList)
