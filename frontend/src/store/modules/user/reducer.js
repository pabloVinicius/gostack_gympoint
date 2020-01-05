import produce from 'immer';

const INITIAL_STATE = {
  user: null,
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case '@auth/SIGN_IN_SUCCESS':
      return produce(state, draft => {
        draft.user = action.payload.user;
      });
    default:
      return state;
  }
};

export default user;
