import * as types from '../types';

const initialState = {
  loading: false,
  users: [],
  errors: [],
  selectedUser: null,
  avatar: ''
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FETCH_AVATAR_URL:
      return {
        ...state,
        avatar: payload
      }
    case types.USER_LOADING:
      return {
        ...state,
        loading: payload
      }
    case types.FETCH_ALL_USERS:
      return {
        ...state,
        users: payload,
        loading: false
      }
    case types.FETCH_ONE_USER:
      return {
        ...state,
        selectedUser: payload,
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
