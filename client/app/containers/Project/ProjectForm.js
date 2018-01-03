import Radium from 'radium'
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Button from 'components/Button'
import TextBox from 'components/inputs/TextBox'

import { form as style } from './style'

@reduxForm({ form: 'project' })
@Radium
class ProjectForm extends React.Component {
  render() {
    const { handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <div style={style.row}>
          <label style={style.label}>Name</label>
          <Field component={TextBox}
            name="name"
            placeholder="A cool project"
          />
        </div>
        <div style={style.row}>
          <label style={style.label}>Slug</label>
          <Field component={TextBox}
            name="slug"
            placeholder="a-cool-project"
          />
        </div>
        <div style={style.row}>
          <p>Please note that you will not able to change <b>your project's slug</b> afterward. This slug will be used as identifier of your project.</p>
        </div>
        <div style={style.row}>
          <div>
            <Button type="submit">save</Button>
          </div>
        </div>
      </form>
    )
  }
}

export default ProjectForm
