import { reducer as form } from 'redux-form'
import slug from 'slug'

function normalizeSlug(value) {
  return slug(value, {
    lower: true,
    symbols: false
  })
}

export default form.plugin({
  signUp: (state, action) => {
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
