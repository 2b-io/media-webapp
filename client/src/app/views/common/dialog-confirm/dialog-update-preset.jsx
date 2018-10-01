import React, { Fragment } from 'react'

import { Dialog, Button } from 'ui/elements'
import { DialogContent } from 'ui/compounds'

const DialogUpdatePreset = ({
  updatePreset,
  message,
  isUpdatePresetDialogActive,
  hideUpdatePresetDialog,
  updatePresetError
}) => (
  <Dialog
    isActive={ isUpdatePresetDialogActive }
    onOverlayClick={ hideUpdatePresetDialog }
    content={ () => (
      <DialogContent>
        <DialogContent.Content>
          {
            updatePresetError ?
              updatePresetError.message :
              <Fragment>
                { message }
              </Fragment>
          }
        </DialogContent.Content>
        <DialogContent.Choices>
          <Button.Group>
            <Button
              variant="secondary"
              mostRight
              onClick={ hideUpdatePresetDialog }
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={ updatePreset }
            >
              Update
            </Button>
          </Button.Group>
        </DialogContent.Choices>
      </DialogContent>
    ) }
  />
)

export default DialogUpdatePreset
