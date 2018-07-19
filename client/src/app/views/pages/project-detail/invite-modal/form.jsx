import React from 'react'
import { Field } from 'redux-form'

import { Form } from 'ui/compounds'
import { TextBox } from 'views/common/form'

const InviteForm = ({ handleSubmit, searchAccount }) => (
  <Form handleSubmit={ handleSubmit }>
    <Form.Header>Invite Collaborator</Form.Header>
    <Form.Description>Enter Email and click to { 'Invite' } button</Form.Description>
    <Form.Line>
      <Field name='email' component={ ({ meta: { error, valid, touched } }) => (
        <div>
          <TextBox
            type="Email"
            placeholder="Email"
            onChange={ (e) => { searchAccount(e.target.value) } }
            name="email"
            error={ !valid }
            valid={ valid }
            touched={ touched }
          />
          { error && touched && <span>{ error }</span> }
        </div>
      ) }
    />
    </Form.Line>
  </Form>
)

export default InviteForm
