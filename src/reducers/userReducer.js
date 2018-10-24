import * as types from '../types';

const initialState = {
  loading: false,
  users: [],
  errors: []
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.USER_LOADING:
      return {
        ...state,
        loading: payload
      }
    case types.FETCH_USER_SUCCESS:
      return {
        ...state,
        users: payload,
        loading: false
      }
    case types.USER_FAIL:
      console.log(state.errors, payload);
      return {
        ...state,
        errors: [...state.errors, payload]
      }
    default:
      return state;
  }
}
