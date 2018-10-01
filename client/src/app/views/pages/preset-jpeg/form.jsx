import React from 'react'

import { Form } from 'ui/compounds'
import { Break, Button, TextButton } from 'ui/elements'
import { DescriptionText } from 'ui/typo'
import { CheckBox, SlideBar, TextBox } from 'views/common/form'

const PresetForm = ({ handleSubmit, isActive, showRemovePresetDialog }) => (
  <Form handleSubmit={ handleSubmit }>
    <TextBox
      label="Content Type"
      name="contentType"
      placeholder="Content Type"
      readOnly
    />
    <Break />
    <CheckBox
      name="isActive"
      label="Enable"
    />
    <Break />
    <SlideBar
      label="Quality"
      name="quality"
      min="0"
      max="100"
    />
    <DescriptionText mostLeft mostRight>
      Set maximum image quality factor (0-100)
    </DescriptionText>
    <CheckBox
      name="progressive"
      label="Progressive"
    />
    <DescriptionText mostLeft mostRight>
      Lossless conversion to progressive
    </DescriptionText>
    <Break double />
    <Button
      type="submit"
    >
      Save
    </Button>
    {
      isActive ?
        null :
        <TextButton onClick={ showRemovePresetDialog }>
          Permanently delete
        </TextButton>
    }
  </Form>
)

export default PresetForm
