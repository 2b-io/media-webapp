import React from 'react'
import { connect } from 'react-redux'

import { selectors } from 'state/interface'
import { Form } from 'ui/compounds'
import { Button, TextBox, TextArea } from 'ui/elements'
import { withParams } from 'views/router'

const ProjectDetail = ({ project, handleSubmit }) => (

  <main>
    { project && project.name &&
      <Form handleSubmit={ handleSubmit }>
        <label>Name</label>
        <Form.Line>
          <TextBox
            type="text"
            name="name"
            defaultValue={ project.name }
            placeholder="Name"
          />
        </Form.Line>
        <Form.Line>
          <label>Slug</label>
          <TextBox
            type="text"
            name="slug"
            defaultValue={ project.slug }
            placeholder="Slug"
          />
        </Form.Line>
        <Form.Line>
          <span>Pretty origin</span>
          <TextArea
            rows="3"
            type="text"
            name="prettyOrigin"
            placeholder="Pretty origin"
          />
        </Form.Line>
        <Form.Line>
          <span>Origins</span>
          <TextBox
            type="text"
            name="origins"
            placeholder="Origins"
          />
        </Form.Line>
        <Form.Line>
          <Form.Align center>
            <Button>Save</Button>
          </Form.Align>
        </Form.Line>
        <Form.Line>
          <span>Presets</span>
          <TextBox
            type="text"
            name="presets"
            placeholder="Presets"
          />
        </Form.Line>
        <Form.Line>
          <span>Collaborators</span>
          <TextBox
            type="text"
            name="collaborators"
            placeholder="collaborators"
          />
        </Form.Line>
        <Form.Line>
          <Form.Align center>
            <Button>Disabled</Button>
          </Form.Align>
        </Form.Line>
      </Form>
    }
  </main>
)

export default withParams(
  connect(
    (state, { params: { slug } }) => ({
      project: selectors.findProjectBySlug(state, slug)
    })
  )(ProjectDetail)
)
