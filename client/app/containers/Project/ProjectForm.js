import Radium from 'radium'
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Button from 'components/Button'
import { InternalLink } from 'components/Link'
import TextArea from 'components/inputs/TextArea'
import TextBox from 'components/inputs/TextBox'

import { form as style } from './style'

@reduxForm({ form: 'project', enableReinitialize: true })
@Radium
class ProjectForm extends React.Component {
  render() {
    const { handleSubmit, update } = this.props
    const inputProps = update ? { readOnly: true } : {}

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
            {...inputProps}
          />
          { update ?
            <p style={style.desc}>This slug is used as identifier of your project and cannot be changed. <InternalLink link="/projects/create">Create a new project</InternalLink> if you do not like this slug :)</p> :
            <p style={style.desc}>Please note that you will not able to change <b>your project's slug</b> afterward. This slug will be used as identifier of your project.</p>
          }
        </div>
        <div style={style.row}>
          <label style={style.label}>Origins</label>
          <Field component={TextArea}
            name="origins"
            rows={3}
            placeholder="cdn.cool.com,img.cool.com"
          />
          <p style={style.desc}>Multiple origins allowed. Use commas (,) or line breaks to separate origins.</p>
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
