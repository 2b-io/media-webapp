import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import styled from 'styled-components'

import { mapDispatch } from 'services/redux-helpers'
import { selectors, actions } from 'state/interface'
import { Form } from 'ui/compounds'
import { Button, TextBox, TextArea } from 'ui/elements'
import { withParams } from 'views/router'


const Layout = styled.div`
   padding: 0;
   margin: 0;
   font-weight: bold;
   list-style: none;
   display: -webkit-box;
   display: -moz-box;
   display: -ms-flexbox;
   display: -webkit-flex;
   display: flex;
   -webkit-flex-flow: row wrap;
   justify-content: space-around;
`
const PanelLeft = styled.div`
   width: 60%;
   margin-top: 10px;
   min-width: 60%;
   @media (min-width: 230px) {
     width: auto;
   }
`
const PanelRight = styled.div`
   width: 30%;
   height: auto;
   margin-top: 10px;
   min-width: 230px;
   @media (max-width: 650px) {
     width: auto;
   }

`

const ProjectForm = ({ project, handleSubmit }) => (
  <main>
    { project && project.name &&
      <Form handleSubmit={ handleSubmit }>
        <Layout>
          <PanelLeft>
            <span>Name</span>
            <Form.Line>
              <TextBox
                type="text"
                name="name"
                defaultValue={ project.name }
                placeholder="Name"
              />
            </Form.Line>
            <Form.Line>
              <span>Slug</span>
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
                defaultValue={ project.prettyOrigin }
                placeholder="Pretty origin"
              />
            </Form.Line>
            <Form.Line>
              <span>Origins</span>
              <TextBox
                type="text"
                name="origins"
                defaultValue={ project.origin }
                placeholder="Origins"
              />
            </Form.Line>
            <Form.Line>
              <Form.Align>
                <Button type="submit">Save</Button>
              </Form.Align>
            </Form.Line>
          </PanelLeft>
          <PanelRight>
            <Form.Line>
              <span>Presets</span>
              <TextBox
                type="text"
                name="presets"
                defaultValue={ project.preset? project.preset.name : '' }
                placeholder="Presets"
              />
            </Form.Line>
            <Form.Line>
              <span>Collaborators</span>
              <TextBox
                type="text"
                name="collaborators"
                defaultValue={ project.permission? project.permission.privilege : '' }
                placeholder="collaborators"
              />
            </Form.Line>
            <Form.Line>
              <Button>{ !project.disabled?'disabled':'enabled' }</Button>
            </Form.Line>
          </PanelRight>
        </Layout>
      </Form>
    }
  </main>
)
const ProjectDetail = reduxForm({
  form: 'project',
  enableReinitialize: true
})(ProjectForm)

export default withParams(
  connect(
    (state, { params: { slug } }) => ({
      project: selectors.findProjectBySlug(state, slug),
    }),
    mapDispatch({
      handleSubmit: ({ name, slug, prettyOrigin, origins }) =>  actions.updateProject(name, slug, prettyOrigin, origins)
    })
  )
  (ProjectDetail)
)
