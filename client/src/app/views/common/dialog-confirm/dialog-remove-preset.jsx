import React, { Fragment } from 'react'

import { Dialog, Button } from 'ui/elements'
import { DialogContent } from 'ui/compounds'

const DialogRemovePreset = ({
  removePreset,
  defaultMessage,
  isRemovePresetDialogActive,
  hideRemovePresetDialog,
  removePresetError
}) => (
  <Dialog
    isActive={ isRemovePresetDialogActive }
    onOverlayClick={ hideRemovePresetDialog }
    content={ () => (
      <DialogContent>
        <DialogContent.Content>
          {
            removePresetError ?
              removePresetError.message :
              <Fragment>
                { defaultMessage }
              </Fragment>
          }
        </DialogContent.Content>
        <DialogContent.Choices>
          <Button.Group>
            <Button
              variant="secondary"
              mostRight
              onClick={ hideRemovePresetDialog }
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={ removePreset }
            >
              Delete
            </Button>
          </Button.Group>
        </DialogContent.Choices>
      </DialogContent>
    ) }
  />
)

export default DialogRemovePreset
