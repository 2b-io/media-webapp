import { reducer as form } from 'redux-form'
import slugify from 'slugify'

function normalizeSlug(value) {
  return slugify(value, {
    replacement: '-',
    remove: null,
    lower: true
  })
}

export default form.plugin({
  project: (state, action) => {
    if (state && state.values && state.values._id) return state

    if (action.type === '@@redux-form/CHANGE') {
      switch (action.meta.field) {
        case 'name':
        case 'slug':
          return {
            ...state,
            values: {
              ...state.values,
              slug: normalizeSlug(action.payload)
            }
          }
      }
    }

    return state
  }
})
