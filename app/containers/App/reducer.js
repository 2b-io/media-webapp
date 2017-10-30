import { fromJS } from 'immutable';

const initialState = fromJS({
  currentUser: false
});

function appReducer(state = initialState, action) {
  return initialState;
}

export default appReducer;
