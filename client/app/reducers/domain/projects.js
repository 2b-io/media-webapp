
import { PRESET } from 'actions/preset'
import { PROJECT } from 'actions/project'

const initialState = {
}

const restructPresets = (presets = []) => {
  return presets.reduce((combine, preset) => {
    combine[preset.hash] = preset

    return combine
  }, {})
}

export default function(state = initialState, action) {
  switch (action.type) {
    case PROJECT.FETCH_ALL_SUCCESS:
      return action.payload.reduce((nextState, project) => {
        nextState[project.slug] = {
          ...project,
          presets: restructPresets(project.presets)
        }

        return nextState
      }, {})

    case PROJECT.FETCH_SUCCESS:
    case PROJECT.CREATE_SUCCESS:
    case PROJECT.UPDATE_SUCCESS:
      return {
        ...state,
        [action.payload.slug]: {
          ...action.payload,
          presets: restructPresets(action.payload.presets)
        }
      }

    case PROJECT.REMOVE_SUCCESS: {
      let { [action.payload.slug]:removedProject, ...nextState } = state

      return nextState
    }

    case PRESET.CREATE_SUCCESS:
    case PRESET.UPDATE_SUCCESS:
      return {
        ...state,
        [action.payload.project.slug]: {
          ...state[action.payload.project.slug],
          presets: {
            ...state[action.payload.project.slug].presets,
            [action.payload.preset.hash]: action.payload.preset
          }
        }
      }

    case PRESET.REMOVE_SUCCESS: {
      let { [action.payload.hash]:removedPreset, ...presets } = state[action.payload.project.slug].presets

      return {
        ...state,
        [action.payload.project.slug]: {
          ...state[action.payload.project.slug],
          presets: presets
        }
      }
    }
  }

  return state
}
