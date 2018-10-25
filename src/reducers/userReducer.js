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
      return {
        ...state,
        errors: [...state.errors, payload]
      }
    case types.CLEAR_USER_FAILURE:
      return {
        ...state,
        errors: []
      }
    default:
      return state;
  }
}
