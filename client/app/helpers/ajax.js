import { KEYWORDS, SUFFIXS } from 'actions/ajax'

export function ajax(action) {
  return {
    [`${action}_${SUFFIXS.REQUEST}`]: `${action}_${SUFFIXS.REQUEST}`,
    [`${action}_${SUFFIXS.SUCCESS}`]: `${action}_${SUFFIXS.SUCCESS}`,
    [`${action}_${SUFFIXS.FAILURE}`]: `${action}_${SUFFIXS.FAILURE}`
  }
}

export function ignore(action) {
  return {
    type: action,
    [KEYWORDS.IGNORE]: true
  }
}
