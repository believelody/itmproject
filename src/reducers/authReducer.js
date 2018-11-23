import * as types from '../types';

const initialState = {
  loading: false,
  user: null,
  errors: [],
  isAuthenticated: false
}

export default (state = initialState, { type, payload}) => {
  switch (type) {
    case types.AUTH_CHECK:
      return {
        ...state,
        isAuthenticated: payload,
        loading: false
      }
    case types.CLEAR_AUTH_FAILURE:
      return {
        ...state,
        errors: []
      }
    case types.AUTH_FAILED:
      return {
        ...state,
        errors: [...state.errors, payload]
      }
    case types.AUTH_LOADING:
      return {
        ...state,
        loading: payload
      };
    case types.AUTHENTICATED:
      return {
        ...state,
        user: payload,
        loading: false
      };
    default:
      return state;
  }
}
